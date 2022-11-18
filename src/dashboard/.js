const createSpeck = require('generic-speck')

const speck48_96 = createSpeck({
    bits: 24,
    rounds: 23,
    rightRotations: 8,
    leftRotations: 3
})

// https://eprint.iacr.org/2013/404.pdf#page=17
// Speck 48/96
// Key: 1a1918 121110 0a0908 020100
// Plaintext: 6d2073 696874
// Ciphertext: 735e10 b6445d

const key = [0x020100, 0x0a0908, 0x121110, 0x1a1918]
const originalInteger = 0x6968746d2073
const obfuscatedInteger = speck48_96.encrypt(originalInteger, key)
console.log(obfuscatedInteger.toString(16))


const textarea = document.getElementById("textarea")
const cipher = document.getElementById("cipher")
document.getElementById("encodeButton").addEventListener("click", ACT)
document.getElementById("decodeButton").addEventListener("click", ACT)

function ACT (event)
{
    if (textarea.value === "")
    {
        alert("The text box is empty.");
        return
    }

    if (event.target.id === "decodeButton")
    {
        textarea.value = DES.CRY.YES[cipher.value](textarea.value, cipher.value !== "PLAIN" ? window.prompt("Encryption key to be used:","") : null)
    } else
    {
        textarea.value = DES.CRY.NO[cipher.value](textarea.value, cipher.value !== "PLAIN" ? window.prompt("Encryption key to be used:","") : null)
        textarea.select()
        document.execCommand("copy")
        textarea.value = "Copied to your clipboard.\n A copy has been placed between these brackets [" + textarea.value + "]"
    }
} // https://soundcloud.com/crystal-castles/pino-placentile-wooden-girl



/** Zero Width Unicode Standard — Senary */
const DES = {
    alphabet: {
        0: "\u{180E}",
        1: "\u{200B}",
        2: "\u{200C}",
        3: "\u{200D}",
        4: "\u{200E}",
        5: "\u{2060}",
        unifier: "\u{200F}"
    },

    encode: (text) => Array.from(text).map(x => x.codePointAt(0).toString(6).split('').map(x => DES.alphabet[x]).join('')).join(DES.alphabet.unifier),
    decode: (text) => text.split(DES.alphabet.unifier).map(x => String.fromCodePoint(parseInt(Array.from(x).map(z => Object.keys(DES.alphabet).find(k => DES.alphabet[k] === z)).join(''), 6))).join(''),


    CRY: {
        NO: {
            PLAIN: (plaintext) => DES.encode(plaintext),
            SPECK48_96: (plaintext, key) => plaintext.codePointAt(0)
        },
        YES: {
            PLAIN: (plaintext) => DES.decode(plaintext),
            SPECK48_96: (plaintext, key) => key
        }
    }
} // https://soundcloud.com/esudesu/tried-luvletter


console.log("😀".codePointAt(0).toString(16))
