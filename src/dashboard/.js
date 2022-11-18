const createSpeck = require('blakejs')
const blake = require('speck.js');

const textarea = document.getElementById("textarea")
const cipherDropdown = document.getElementById("cipher")
document.getElementById("encodeButton").addEventListener("click", ACT)
document.getElementById("decodeButton").addEventListener("click", ACT)

function ACT (event)
{

    if (textarea.value === "")
    {
        textarea.value = "The text box is empty."
        return
    }

    if (event.target.id === "decodeButton")
    {
        textarea.value = ZWUS6.DES.CRY.YES[cipherDropdown.value](textarea.value)
    } else
    {
        textarea.value = ZWUS6.DES.CRY.NO[cipherDropdown.value](textarea.value)
        textarea.select()
        document.execCommand("copy")
        textarea.value = "Copied to your clipboard.\n A copy has been placed between these brackets [" + textarea.value + "]"
    }
}

const ZWUS6 = {
    /** Zero Width Unicode Standard — Senary */
    DES: {
        alphabet: {
            0: "\u{180E}", 1: "\u{200B}", 2: "\u{200C}", 3: "\u{200D}", 4: "\u{200E}", 5: "\u{200F}", unifier: "\u{2060}"
        },

        encode: (text) => Array.from(text).map(x => x.codePointAt(0).toString(6).split('').map(x => ZWUS6.DES.alphabet[x]).join('')).join(ZWUS6.DES.alphabet.unifier),
        decode: (text) => text.split(ZWUS6.DES.alphabet.unifier).map(x => String.fromCodePoint(parseInt(Array.from(x).map(z => Object.keys(ZWUS6.DES.alphabet).find(k => ZWUS6.DES.alphabet[k] === z)).join(''), 6))).join(''),

        CRY: {
            NO: {
                SPECK48_96: (plaintext, key) =>
                {
                    const key96 = blake.blake2bHex(key, null , 12) // digest key to fixed length of 96 bits
                    
                    
                }, 
                PLAIN: (plaintext) => ZWUS6.DES.encode(plaintext)
            }, 
            YES: {
                PLAIN: (plaintext) => ZWUS6.DES.decode(plaintext)
            }
        }
    }
} // https://soundcloud.com/esudesu/tried-luvletter

ZWUS6.DES.CRY.NO.SPECK48_96("b", "a")