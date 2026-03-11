import zwus from 'zwus';
import { blake2bHex } from 'blakejs';
import speck from 'generic-speck';

const speck32_64 = speck();
const textarea = document.getElementById('textarea');
const encoderDropdown = document.getElementById('encoder');
const cipherDropdown = document.getElementById('cipher');
document.getElementById('encodeButton').addEventListener('click', ACT);
document.getElementById('decodeButton').addEventListener('click', ACT);

function getKey(kStr) {
    const key64bit = blake2bHex(kStr, null, 8);
    return [
        parseInt(key64bit.slice(0, 4), 16),
        parseInt(key64bit.slice(4, 8), 16),
        parseInt(key64bit.slice(8, 12), 16),
        parseInt(key64bit.slice(12, 16), 16)
    ];
}

function deriveNonce(key64arr) {
    return speck32_64.encrypt(0, key64arr) & 0xFFFF;
}

function ctrKeystream(key64arr, index) {
    const nonce = deriveNonce(key64arr);
    const ctrBlock = ((nonce << 16) | (index & 0xFFFF)) >>> 0;
    return speck32_64.encrypt(ctrBlock, key64arr) >>> 0;
}

function ctrEncrypt(ptStr, key64arr) {
    return Array.from(ptStr, (c, i) => {
        const ks = ctrKeystream(key64arr, i);
        return (c.codePointAt(0) ^ ks) >>> 0;
    });
}

function ctrDecrypt(numArr, key64arr) {
    return numArr.map((ct, i) => {
        const ks = ctrKeystream(key64arr, i);
        const cp = (ct ^ ks) >>> 0;
        try { return String.fromCodePoint(cp); }
        catch { return ''; }
    }).join('');
}

function getCipherKey() {
    return cipherDropdown.value;
}

function ACT(event) {
    if (textarea.value === '') {
        textarea.value = 'The text box is empty.';
        return;
    }

    const op = event.target.id === 'encodeButton' ? 'NO' : 'YES';
    const cipher = getCipherKey();
    const base = encoderDropdown.value.split('-')[1];
    const needsKey = cipher !== 'PLAIN';
    const kStr = needsKey && prompt('enter password.');

    if (needsKey && !kStr) return;

    try {
        textarea.value = DESCRY[op][cipher](textarea.value, base, kStr);
    } catch (e) {
        console.log(e);
    }

    if (op === 'NO') {
        textarea.select();
        document.execCommand('copy');
        textarea.value = 'Copied to your clipboard.\n A copy has been placed between these brackets [' + textarea.value + ']';
    }
}

const DESCRY = {
    NO: {
        PLAIN: (ptStr, base) =>
            zwus.encodeString(ptStr, base),
        SPECK32_64CTR: (ptStr, base, kStr) =>
            zwus.encodeNumberArray(ctrEncrypt(ptStr, getKey(kStr)), base),
        'SPECK32_64ECB (insecure)': (ptStr, base, kStr) => {
            const key = getKey(kStr);
            return zwus.encodeNumberArray(
                Array.from(ptStr, c => speck32_64.encrypt(c.codePointAt(0), key)),
                base
            );
        }
    },
    YES: {
        PLAIN: (ptStr, base) =>
            zwus.decodeToString(ptStr, base),
        SPECK32_64CTR: (ptStr, base, kStr) =>
            ctrDecrypt(zwus.decodeToNumberArray(ptStr, base), getKey(kStr)),
        'SPECK32_64ECB (insecure)': (ptStr, base, kStr) => {
            const key = getKey(kStr);
            return zwus.decodeToNumberArray(ptStr, base)
                .map(x => { try { return String.fromCodePoint(speck32_64.decrypt(x, key)); } catch { return ''; } })
                .join('');
        }
    }
};
