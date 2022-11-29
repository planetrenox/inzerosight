/** Zero Width Unicode Standard — Senary */
const ZWUS6 = {
    alphabet: {0: "\u{180E}", 1: "\u{200B}", 2: "\u{200C}", 3: "\u{200D}", 4: "\u{200E}", 5: "\u{200F}", unifier: "\u{2060}"},
    encodeString: (text) => Array.from(text, u => u.codePointAt(0).toString(6).split('').map(x => ZWUS6.alphabet[x]).join('')).join(ZWUS6.alphabet.unifier),
    encodeNumberArray: (arr) => arr.map(n => n.toString(6).split('').map(x => ZWUS6.alphabet[x]).join('')).join(ZWUS6.alphabet.unifier),
    decodeString: (text) => text.split(ZWUS6.alphabet.unifier).map(x => String.fromCodePoint(parseInt(Array.from(x).map(z => Object.keys(ZWUS6.alphabet).find(k => ZWUS6.alphabet[k] === z)).join(''), 6))).join(''),
    decodeNumber: (text) => text.split(ZWUS6.alphabet.unifier).map(x => parseInt(Array.from(x).map(z => Object.keys(ZWUS6.alphabet).find(k => ZWUS6.alphabet[k] === z)).join(''), 6)),
} // https://soundcloud.com/crystal-castles/pino-placentile-wooden-girl

module.exports = ZWUS6