const createSpeck = require('generic-speck')
const blake = require('blakejs')
const speck32_64 = createSpeck()


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

        encodeFromString: (text) => Array.from(text, x => x.codePointAt(0).toString(6).split('').map(x => ZWUS6.DES.alphabet[x]).join('')).join(ZWUS6.DES.alphabet.unifier),
        encodeFromBase6StringArray: (base6StringArray) => base6StringArray.map(x => x.split('').map(x => ZWUS6.DES.alphabet[x]).join('')).join(ZWUS6.DES.alphabet.unifier),
        decode: (text) => text.split(ZWUS6.DES.alphabet.unifier).map(x => String.fromCodePoint(parseInt(Array.from(x).map(z => Object.keys(ZWUS6.DES.alphabet).find(k => ZWUS6.DES.alphabet[k] === z)).join(''), 6))).join(''),

        CRY: {
            NO: {
                SPECK48_96: (ptStr, kStr) =>
                {
                    const key64 = blake.blake2bHex(kStr, null , 8) // expand key to fixed length of 64 bits
                    const key64arr = [parseInt(key64.slice(0, 4), 16), parseInt(key64.slice(4, 8), 16), parseInt(key64.slice(8, 12), 16), parseInt(key64.slice(12, 16), 16)]
                    let enc = Array.from(ptStr, c => speck32_64.encrypt(c.codePointAt(0), key64arr).toString(6))

                    let encoded = ZWUS6.DES.encodeFromBase6StringArray(enc).codePointAt(0)
                    
                    
                    console.log(ZWUS6.DES.decode(encoded))


                }, 
                PLAIN: (plaintext) => ZWUS6.DES.encodeFromString(plaintext)
            }, 
            YES: {
                PLAIN: (plaintext) => ZWUS6.DES.decode(plaintext)
            }
        }
    }
} // https://soundcloud.com/esudesu/tried-luvletter

ZWUS6.DES.CRY.NO.SPECK48_96("aab", "a")