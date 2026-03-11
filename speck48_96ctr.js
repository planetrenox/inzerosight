import speck from 'generic-speck';
import { blake2bHex } from 'blakejs';

const speck48_96 = speck({ bits: 24, rounds: 23, rightRotations: 8, leftRotations: 3 });

export function getKey(kStr) {
    const key96bit = blake2bHex(kStr, null, 12);
    return [
        parseInt(key96bit.slice(0, 6), 16),
        parseInt(key96bit.slice(6, 12), 16),
        parseInt(key96bit.slice(12, 18), 16),
        parseInt(key96bit.slice(18, 24), 16)
    ];
}

function deriveNonce(key) {
    return speck48_96.encrypt(0, key) & 0xFFFFFF;
}

function ctrKeystream(key, index) {
    const nonce = deriveNonce(key);
    const ctrBlock = nonce * 16777216 + (index & 0xFFFFFF);
    return speck48_96.encrypt(ctrBlock, key);
}

export function encrypt(ptStr, key) {
    return Array.from(ptStr, (c, i) => {
        const ks = ctrKeystream(key, i);
        return (c.codePointAt(0) ^ ks) >>> 0;
    });
}

export function decrypt(numArr, key) {
    return numArr.map((ct, i) => {
        const ks = ctrKeystream(key, i);
        const cp = (ct ^ ks) >>> 0;
        try { return String.fromCodePoint(cp); }
        catch { return ''; }
    }).join('');
}
