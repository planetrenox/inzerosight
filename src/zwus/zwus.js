/**
 * ZWUS (Zero Width Unicode Standard)
 * Licensed under the WTFPL (see http://www.wtfpl.net/).
 */
const ZWUS = {
    alphabet: {unifier: "\u{200C}", 0: "\u{200D}", 1: "\u{200F}", 2: "\u{00AD}", 3: "\u{2060}", 4: "\u{200B}", 5: "\u{200E}", 6: "\u{180E}", 7: "\u{FEFF}"},
    /**
     * Encodes a string into a sequence of zero-width characters.
     * WARNING: Adjusting the base beyond the alphabet size may result in encoding failure.
     * @param {string} text - The input text to encode.
     * @param {number} base - The numerical base for encoding. Default is the optimal base for the current alphabet.
     * @returns {string} The encoded string.
     */
    encodeString: (text, base = 6) => Array.from(text, u => u.codePointAt(0).toString(base).split('').map(x => ZWUS.alphabet[x]).join('')).join(ZWUS.alphabet.unifier),
    /**
     * Encodes an array of numbers into a sequence of zero-width characters.
     * WARNING: Adjusting the base beyond the alphabet size may result in encoding failure.
     * @param {Array<number>} arr - The array of numbers to encode.
     * @param {number} base - The numerical base for encoding. Default is the optimal base for the current alphabet.
     * @returns {string} The encoded array.
     */
    encodeNumberArray: (arr, base = 6) => arr.map(n => n.toString(base).split('').map(x => ZWUS.alphabet[x]).join('')).join(ZWUS.alphabet.unifier),
    /**
     * Decodes a string of zero-width characters back into the original string.
     * NOTE: Decoding accuracy is contingent upon the original encoding base and alphabet.
     * @param {string} text - The encoded text to decode.
     * @param {number} base - The numerical base for decoding. Must match the base used for encoding.
     * @returns {string} The decoded string.
     */
    decodeToString: (text, base = 6) => text.split(ZWUS.alphabet.unifier).map(x => String.fromCodePoint(parseInt(Array.from(x).map(z => Object.keys(ZWUS.alphabet).find(k => ZWUS.alphabet[k] === z)).join(''), base))).join(''),
    /**
     * Decodes a string of zero-width characters back into the original array of numbers.
     * NOTE: Decoding accuracy is contingent upon the original encoding base and alphabet.
     * @param {string} text - The encoded text to decode.
     * @param {number} base - The numerical base for decoding. Must match the base used for encoding.
     * @returns {Array<number>} The decoded array of numbers.
     */
    decodeToNumberArray: (text, base = 6) => text.split(ZWUS.alphabet.unifier).map(x => parseInt(Array.from(x).map(z => Object.keys(ZWUS.alphabet).find(k => ZWUS.alphabet[k] === z)).join(''), base)),
}; // https://soundcloud.com/crystal-castles/pino-placentile-wooden-girl

export default ZWUS;