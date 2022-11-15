(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
        textarea.value = "The text box is empty."
        return
    }

    if (event.target.id === "decodeButton")
    {
        textarea.value = DES.CRY.YES[cipher.value](textarea.value)
    } else
    {
        textarea.value = DES.CRY.NO[cipher.value](textarea.value)
        textarea.select()
        document.execCommand("copy")
        textarea.value = "Copied to your clipboard.\n A copy has been placed between these brackets [" + textarea.value + "]"
    }
}

/** Zero Width Unicode Standard — Senary */
const DES = {
    code: {
        0: "\u{180E}",
        1: "\u{200B}",
        2: "\u{200C}",
        3: "\u{200D}",
        4: "\u{200E}",
        5: "\u{2060}",
        unifier: "\u{FEFF}"
    },

    encode: (text) => Array.from(text).map(x => x.codePointAt(0).toString(6).split('').map(x => DES.code[x]).join('')).join(DES.code.unifier),
    decode: (text) => text.split(DES.code.unifier).map(x => String.fromCodePoint(parseInt(Array.from(x).map(z => Object.keys(DES.code).find(k => DES.code[k] === z)).join(''), 6))).join(''),
    
    CRY: {
        NO: {
            SPECK48_96: () => "worDks",
            PLAIN: (plaintext) => DES.encode(plaintext)
        },
        YES: {
            PLAIN: (plaintext) => DES.decode(plaintext)
        }
    }
};

// https://soundcloud.com/esudesu/tried-luvletter

},{"generic-speck":2}],2:[function(require,module,exports){
function speck (params = {}) {
  const BITS = params.bits || 16
  const ROUNDS = params.rounds || 22
  const RIGHT_ROTATIONS = params.rightRotations || 7
  const LEFT_ROTATIONS = params.leftRotations || 2

  const BIT_MAX = 2 ** BITS
  const BIT_MASK = BIT_MAX - 1

  const ROR = (x, r) => (x >> r) | ((x << (BITS - r)) & BIT_MASK)
  const ROL = (x, r) => ((x << r) & BIT_MASK) | (x >> (BITS - r))

  const R = (x, y, k) => {
    x = ROR(x, RIGHT_ROTATIONS)
    x = (x + y) & BIT_MASK
    x ^= k
    y = ROL(y, LEFT_ROTATIONS)
    y ^= x
    return [x, y]
  }
  const RR = (x, y, k) => {
    y ^= x
    y = ROR(y, LEFT_ROTATIONS)
    x ^= k
    x = (x - y) & BIT_MASK
    x = ROL(x, RIGHT_ROTATIONS)
    return [x, y]
  }

  function encryptRaw (pt, K) {
    let y = pt[0]
    let x = pt[1]
    let b = K[0]
    let a = K.slice(1)

    ;[x, y] = R(x, y, b)
    for (let i = 0; i < ROUNDS - 1; i++) {
      const j = i % a.length
      ;[a[j], b] = R(a[j], b, i)
      ;[x, y] = R(x, y, b)
    }

    return [y, x]
  }

  function decryptRaw (pt, K) {
    let y = pt[0]
    let x = pt[1]
    let b = K[0]
    let a = K.slice(1)

    for (let i = 0; i < ROUNDS - 1; i++) {
      const j = i % a.length
      ;[a[j], b] = R(a[j], b, i)
    }
    for (let i = 0; i < ROUNDS; i++) {
      const j = (ROUNDS - 2 - i) % a.length
      ;[x, y] = RR(x, y, b)
      ;[a[j], b] = RR(a[j], b, ROUNDS - 2 - i)
    }

    return [y, x]
  }

  // Wrap function in order to convert any bit size to the internal format
  function wrapFn (fn) {
    return (input, key) => {
      const result = fn([input / BIT_MAX | 0, input & BIT_MASK], key)
      return result[0] * BIT_MAX + result[1]
    }
  }

  return {
    encrypt: wrapFn(encryptRaw),
    decrypt: wrapFn(decryptRaw),
    encryptRaw,
    decryptRaw
  }
}

module.exports = speck

},{}]},{},[1]);
