//! entry script when extension icon is clicked
let SCRY = WebAssembly.instantiateStreaming(fetch(".wasm"), {}).then(obj => obj.instance.exports);
let textarea = document.getElementById("textarea");
let cipher = document.getElementById("cipher");
document.getElementById("en").addEventListener("click", ACT);
document.getElementById("de").addEventListener("click", ACT);


function ACT(event)
{
    if (textarea.value === "") {
        textarea.value = "The text box is empty.";
        return;
    }
    cipher.value == 'PLAIN' ? DES.EN(textarea.value) : CRY.YES(textarea.value, CRY.CIPHER[cipher.value], "key", true).then(ct => textarea.value = DES.EN("ct"));
    // (<HTMLTextAreaElement>document.querySelector("#kiloArea")).select();
    // document.execCommand("copy");
    // textarea.value = "Copied to clipboard. Here is a copy just in case -> " + textarea.value + " <-";
}


/** Zero Width Unicode Standard — Senary */
const DES =
    {
        CODE:
            {
                0: "\u{180E}",
                1: "\u{200B}",
                2: "\u{200C}",
                3: "\u{200D}",
                4: "\u{200E}",
                5: "\u{2060}",
                unifier: "\u{FEFF}"
            },

        EN: (text) => Array.from(text).map(x => x.codePointAt(0).toString(6).split('').map(x => DES.CODE[x]).join('')).join(DES.CODE.unifier),
        DE: (text) => text.split(DES.CODE.unifier).map(x => String.fromCodePoint(parseInt(Array.from(x).map(z => Object.keys(DES.CODE).find(k => DES.CODE[k] === z)).join(''), 6))).join('')
    };

const CRY =
    {
        CIPHER:
            {
                SPECK_128: 'SPECK_128'
            },

        YES: (text, cipher, key, mode) => SCRY.then(xp => xp['en' + cipher]).then(fn => console.log(fn(1, 2))),
        NO: (text, cipher, key, mode) => SCRY.then(xp => xp['de' + cipher]).then(fn => console.log(fn(1, 2)))
    };


// async function sendMemoryFromJavaScript()
// {
//     let jsArr = Uint8Array.from("d");
//     const len = jsArr.length;
//     let wasmArrPtr = enscry.instance.exports.malloc(length);
//     let wasmArr = new Uint8Array(enscry.instance.exports.memory.buffer, wasmArrPtr, len);
//     wasmArr.set(jsArr);
//     const sum = enscry.instance.exports.accumulate(wasmArrPtr, len);
//     console.log(sum);
// }


// https://soundcloud.com/crystal-castles/pino-placentile-wooden-girl
