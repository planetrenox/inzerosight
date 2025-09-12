/**
 * ZWUS (Zero Width Unicode Standard)
 */
const zwus = {
    3: {unifier: "\u{00AD}", 0: "\u{180E}", 1: "\u{200B}", 2: "\u{200D}"},
    6: {unifier: "\u{200C}", 0: "\u{200D}", 1: "\u{200F}", 2: "\u{00AD}", 3: "\u{2060}", 4: "\u{200B}", 5: "\u{200E}"},
    8: {unifier: "\u{200C}", 0: "\u{200D}", 1: "\u{200F}", 2: "\u{00AD}", 3: "\u{2060}", 4: "\u{200B}", 5: "\u{200E}", 6: "\u{180E}", 7: "\u{FEFF}"},
    /**
     * Encodes a string into a sequence of zero-width characters.
     * @param {string} text - The input text to encode.
     * @param {number} base - The numerical base for encoding. Options: 3, 6, 8. Larger the base, the smaller the output, but the more likely the zero width will be detectable by sight.
     * @returns {string} The encoded string.
     */
    encodeString: (text, base = 3) => Array.from(text, u => u.codePointAt(0).toString(base).split('').map(x => zwus[base][x]).join('')).join(zwus[base].unifier),
    /**
     * Encodes an array of numbers into a sequence of zero-width characters.
     * @param {Array<number>} arr - The array of numbers to encode.
     * @param {number} base - The numerical base for encoding. Options: 3, 6, 8. Larger the base, the smaller the output, but the more likely the zero width will be detectable by sight.
     * @returns {string} The encoded array.
     */
    encodeNumberArray: (arr, base = 3) => arr.map(n => n.toString(base).split('').map(x => zwus[base][x]).join('')).join(zwus[base].unifier),
    /**
     * Decodes a string of zero-width characters back into the original string.
     * NOTE: Decoding accuracy is contingent upon the original encoding base and alphabet.
     * @param {string} text - The encoded text to decode.
     * @param {number} base - The numerical base for decoding. Must match the base used for encoding.
     * @returns {string} The decoded string.
     */
    decodeToString: (text, base = 3) => text.split(zwus[base].unifier).map(x => String.fromCodePoint(parseInt(Array.from(x).map(z => Object.keys(zwus[base]).find(k => zwus[base][k] === z)).join(''), base))).join(''),
    /**
     * Decodes a string of zero-width characters back into the original array of numbers.
     * NOTE: Decoding accuracy is contingent upon the original encoding base and alphabet.
     * @param {string} text - The encoded text to decode.
     * @param {number} base - The numerical base for decoding. Must match the base used for encoding.
     * @returns {Array<number>} The decoded array of numbers.
     */
    decodeToNumberArray: (text, base = 3) => text.split(zwus[base].unifier).map(x => parseInt(Array.from(x).map(z => Object.keys(zwus[base]).find(k => zwus[base][k] === z)).join(''), base)),
};

const textarea = document.getElementById('textarea');
const encoderDropdown = document.getElementById('encoder');
const cipherDropdown = document.getElementById('cipher');
document.getElementById('encodeButton').addEventListener('click', ACT);
document.getElementById('decodeButton').addEventListener('click', ACT);

function ACT(event) {
    if (textarea.value === '') {
        textarea.value = 'The text box is empty.';
        return;
    }

    const op = event.target.id === 'encodeButton' ? 'NO' : 'YES';
    textarea.value = DESCRY[op]['PLAIN'](textarea.value, encoderDropdown.value.split('-')[1]);

    if (op === 'NO') {
        textarea.select();
        document.execCommand('copy');
        textarea.value = 'Copied to your clipboard.\n A copy has been placed between these brackets [' + textarea.value + ']';
    }
}

var DESCRY = {
    NO: {
        PLAIN: (ptStr, base) => zwus.encodeString(ptStr, base)
    },
    YES: {
        PLAIN: (ptStr, base) => zwus.decodeToString(ptStr, base)
    }
};
