const textarea = document.getElementById("textarea");
const cipher = document.getElementById("cipher");
document.getElementById("en").addEventListener("click", ACT);
document.getElementById("de").addEventListener("click", ACT);

function ACT()
{
    if (textarea.value === "")
    {
        textarea.value = "The text box is empty.";
        return;
    }
    cipher.value === 'PLAIN' ? DES.encode(textarea.value) : DES.CRY.NO(cipher.value, textarea.value,  "key").then(ciphertext => textarea.value = DES.EN("ciphertext"));
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
        NO: async (cipher, plaintext, key) =>
        {
            console.log(cipher, plaintext, key);
            const wasm_enscry = await fetch(".wasm").then(res => res.arrayBuffer()).then(bytes => WebAssembly.instantiate(bytes, {}));
            // let uint8arr_pt = new TextEncoder().encode(plaintext);
            let uint8arr_pt = new Uint8Array([0x6c, 0x61, 0x76, 0x69, 0x75, 0x71, 0x65, 0x20, 0x74, 0x69, 0x20, 0x65, 0x64, 0x61, 0x6d, 0x20]);
            // let uint8arr_k = new Uint8Array([0x00,0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]);
            let uint8arr_k = new Uint8Array([0x0f, 0x0e, 0x0d, 0x0c, 0x0b, 0x0a, 0x09, 0x08, 0x07, 0x06, 0x05, 0x04, 0x03, 0x02, 0x01, 0x00]);
            let uint8arr_256 = new Int8Array(uint8arr_pt.length + uint8arr_k.length);
            uint8arr_256.set(uint8arr_pt);
            uint8arr_256.set(uint8arr_k, uint8arr_k.length);
            let pt_uint8arr_256 = wasm_enscry.instance.exports.malloc(uint8arr_256.length);
            let wasmArr = new Uint8Array(wasm_enscry.instance.exports.memory.buffer, pt_uint8arr_256, uint8arr_256.length);
            wasmArr.set(uint8arr_256);
            const response = wasm_enscry.instance.exports['speck_128_encrypt'](pt_uint8arr_256, uint8arr_256.length);

            for (let i = 0; i < wasmArr.length; i++) console.log(wasmArr[i].toString(16));
            console.log(response);
        }
    }
};


DES.CRY.NO("speck_128", " made it equival", " ");

// https://soundcloud.com/crystal-castles/pino-placentile-wooden-girl
