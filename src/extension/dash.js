const speck32_64 = require('generic-speck')()
const blake = require('blakejs')
const zwus = require('zwus')

const textarea = document.getElementById("textarea")
const cipherDropdown = document.getElementById("cipher")
document.getElementById("encodeButton").addEventListener("click", ACT)
document.getElementById("decodeButton").addEventListener("click", ACT)

function ACT(event) {

    if (textarea.value === "") {
        textarea.value = "The text box is empty."
        return
    }

    if (event.target.id === "decodeButton") {
        textarea.value = DESCRY.YES[cipherDropdown.value](textarea.value, cipherDropdown.value !== "PLAIN" ? prompt("enter password.") : null)
    } else {
        textarea.value = DESCRY.NO[cipherDropdown.value](textarea.value, cipherDropdown.value !== "PLAIN" ? prompt("enter password.") : null)
        textarea.select()
        document.execCommand("copy")
        textarea.value = "Copied to your clipboard.\n A copy has been placed between these brackets [" + textarea.value + "]"
    }
}


DESCRY = {
    NO: {
        SPECK48_96: (ptStr, kStr) => {
            const key64bit = blake.blake2bHex(kStr, null, 8) // expand key to fixed length of 64 bits
            const key64arr = [parseInt(key64bit.slice(0, 4), 16), parseInt(key64bit.slice(4, 8), 16), parseInt(key64bit.slice(8, 12), 16), parseInt(key64bit.slice(12, 16), 16)]
            return zwus.encodeNumberArray(Array.from(ptStr, c => speck32_64.encrypt(c.codePointAt(0), key64arr)))
        },
        PLAIN: (plaintext) => zwus.encodeString(plaintext)
    },
    YES: {
        SPECK48_96: (ptStr, kStr) => {
            const key64bit = blake.blake2bHex(kStr, null, 8) // expand key to fixed length of 64 bits
            const key64arr = [parseInt(key64bit.slice(0, 4), 16), parseInt(key64bit.slice(4, 8), 16), parseInt(key64bit.slice(8, 12), 16), parseInt(key64bit.slice(12, 16), 16)]
            return zwus.decodeToNumberArray(ptStr).map(x => String.fromCodePoint(speck32_64.decrypt(x, key64arr))).join('')
        },
        PLAIN: (plaintext) => zwus.decodeToString(plaintext)
    }

} // https://soundcloud.com/esudesu/tried-luvletter