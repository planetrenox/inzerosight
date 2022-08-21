const textarea = document.getElementById("textarea");
const cipher = document.getElementById("cipher");
document.getElementById("en").addEventListener("click", ACT);
document.getElementById("de").addEventListener("click", ACT);


//passMemoryToJavaScript();


function ACT(event)
{
    if (textarea.value === "")
    {
        textarea.value = "The text box is empty.";
        return;
    }
    cipher.value == 'PLAIN' ? DES.EN(textarea.value) : CRY.YES(textarea.value, CRY.CIPHER[cipher.value], "key", true).then(ct => textarea.value = DES.EN("ct"));
    // (<HTMLTextAreaElement>document.querySelector("#kiloArea")).select();
    // document.execCommand("copy");
    // textarea.value = "Copied to clipboard. Here is a copy just in case -> " + textarea.value + " <-";
}


/** Zero Width Unicode Standard — Senary */
const DES = {
    code: {
        0: "\u{180E}", 1: "\u{200B}", 2: "\u{200C}", 3: "\u{200D}", 4: "\u{200E}", 5: "\u{2060}", unifier: "\u{FEFF}"
    },

    encode: (text) => Array.from(text).map(x => x.codePointAt(0).toString(6).split('').map(x => DES.code[x]).join('')).join(DES.code.unifier),
    decode: (text) => text.split(DES.code.unifier).map(x => String.fromCodePoint(parseInt(Array.from(x).map(z => Object.keys(DES.code).find(k => DES.code[k] === z)).join(''), 6))).join(''),
    CRY: {
        NO: async (plaintext, cipher) =>
        {
            const wasm_enscry = await fetch(".wasm").then(res => res.arrayBuffer()).then(bytes => WebAssembly.instantiate(bytes, {}));
            let uint8arr_256 = new TextEncoder().encode(plaintext); // should be 256 bits + key
            let pt_uint8arr_256 = wasm_enscry.instance.exports.malloc(uint8arr_256.length);
            let wasmArr = new Uint8Array(wasm_enscry.instance.exports.memory.buffer, pt_uint8arr_256, uint8arr_256.length);
            wasmArr.set(uint8arr_256);
            const response = wasm_enscry.instance.exports[cipher](pt_uint8arr_256, uint8arr_256.length);
            // print wasmArr in hex
            for(let i = 0; i < wasmArr.length; i++)
            {
                console.log(wasmArr[i].toString(16));
            }
        }
    }
};


DES.CRY.NO(" made it equival", "speck_128_encrypt");


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
