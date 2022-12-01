/** Zero Width Unicode Standard */
const ZWUS = {
    alphabet: {unifier: "\u{200C}", 0:"\u{200D}", 1: "\u{200F}", 2: "\u{00AD}", 3: "\u{2060}", 4: "\u{200B}", 5: "\u{200E}", 6:"\u{180E}", 7:"\u{FEFF}"},
    encodeString: (text, base = 6) => Array.from(text, u => u.codePointAt(0).toString(base).split('').map(x => ZWUS.alphabet[x]).join('')).join(ZWUS.alphabet.unifier),
    encodeNumberArray: (arr, base = 6) => arr.map(n => n.toString(base).split('').map(x => ZWUS.alphabet[x]).join('')).join(ZWUS.alphabet.unifier),
    decodeToString: (text, base = 6) => text.split(ZWUS.alphabet.unifier).map(x => String.fromCodePoint(parseInt(Array.from(x).map(z => Object.keys(ZWUS.alphabet).find(k => ZWUS.alphabet[k] === z)).join(''), base))).join(''),
    decodeToNumberArray: (text, base = 6) => text.split(ZWUS.alphabet.unifier).map(x => parseInt(Array.from(x).map(z => Object.keys(ZWUS.alphabet).find(k => ZWUS.alphabet[k] === z)).join(''), base)),
} // https://soundcloud.com/crystal-castles/pino-placentile-wooden-girl

module.exports = ZWUS