<p align="center"><img src="icon_500.png" width="128"></p>
<h1 align="center">inØsight</h1>
<p align="center">Hide text inside zero-width Unicode characters. Send secret messages through any text field — chat, email, documents — completely invisible to the naked eye.</p>

<p align="center">
<a href="https://addons.mozilla.org/en-US/firefox/addon/in0sight/">Firefox Add-on</a> · <a href="https://chromewebstore.google.com/detail/acnmohbphjmnbaboacmecidopeplkhog">Chrome Web Store</a>
</p>

---

## ZWUS Encoding

Text is encoded using **ZWUS (Zero Width Unicode Standard)** — each character's code point is converted to a target base, then each digit is mapped to a designated zero-width Unicode character.

| Base | Characters Used | Unicode Points | Notes |
|------|:-:|---|---|
| **ZWUS-3** | 3 + 1 separator | U+180E · U+200B · U+200D · sep U+00AD | Most compatible — fewest characters, safest across platforms |
| **ZWUS-6** | 6 + 1 separator | U+200D · U+200F · U+00AD · U+2060 · U+200B · U+200E · sep U+200C | Balanced |
| **ZWUS-8** | 8 + 1 separator | U+200D · U+200F · U+00AD · U+2060 · U+200B · U+200E · U+180E · U+FEFF · sep U+200C | Smallest output but uses characters some platforms strip |

**Compatibility:** ZWUS-3 > ZWUS-6 > ZWUS-8    
**Output size:** ZWUS-8 < ZWUS-6 < ZWUS-3

Some platforms actively strip or collapse certain zero-width characters. If your encoded text breaks on a platform, drop to a lower base.

## Encryption

### PLAIN
No encryption. Encodes text directly.

### SPECK32/64 ECB
Block cipher in ECB mode. Each character is encrypted independently — identical plaintext characters produce identical ciphertext. Useful when you want varied-looking output from the same input, but **not secure under real threat models** since patterns in the plaintext leak through.

### SPECK48/96 CTR
Stream cipher mode with a random 24-bit nonce prepended to the output. Identical plaintexts produce different ciphertexts each time. Significantly more secure than ECB. **Rotate your password after roughly every 100 encryptions** to avoid nonce reuse risk within the 24-bit space.

## How ZWUS Works

1. Take each character's Unicode code point.
2. Convert it to the chosen base (3, 6, or 8).
3. Map each resulting digit to its assigned zero-width character from the alphabet.
4. Join digits together; separate characters with the base's designated separator (also zero-width).

The result is a string of invisible Unicode that carries the full original text. Decoding reverses the mapping: split on the separator, look up each zero-width character to recover the digit, parse the base-N number back to a code point, and reconstruct the string.

## Use ZWUS in Your Own Projects

The encoder/decoder is available as a standalone package for multiple languages:

- **JavaScript/TypeScript:** [zwus on npm](https://www.npmjs.com/package/zwus)
- **Rust:** [zwus on crates.io](https://crates.io/crates/zwus)
