# Generic Speck

A generic implementation of the [Speck cipher](https://en.wikipedia.org/wiki/Speck_%28cipher%29) focused
on integer obfuscation. If supports from 16-bit integers to 52-bit integers.

[**Check the demo**](https://qgustavor.github.io/generic-speck/demo.html).

## Why?

Because I wanted to obfuscate integers and the current libraries focused more on the encoding process
and not on the obfuscation process, thus seemed not secure. More info on the [research section](#research).

## How to use

```javascript
// If you're using Node then you need to install it (often using NPM or yarn)
// then you can require the library like this:
const createSpeck = require('generic-speck')

// If you're using Deno or running code in a browser you can use this:
import createSpeck from 'https://unpkg.com/generic-speck/speck.mjs'

// The following are the default parameters
// More info on the parameters section.
const speck = createSpeck({
  bits: 16,
  rounds: 22,
  rightRotations: 7,
  leftRotations: 2
})

// Then you need to generate a key: it's an array with two or more
// integers ranging from 0 to 2 ^ (bits) - 1. Here's a 64 bit key:
const key = [0x0100, 0x0908, 0x1110, 0x1918]

// As you can use multiple keys for multiple contexts the key option
// is provided on the encrypt function, not on the constructor.

// You can obfuscate integers like this:
const originalInteger = 0x694c6574
const obfuscatedInteger = speck.encrypt(originalInteger, key)
console.log(obfuscatedInteger) // 0x42f2a868

// You can deobfuscate integers like this:
const deobfuscatedInteger = speck.decrypt(obfuscatedInteger, key)
console.log(obfuscatedInteger) // 0x694c6574
```

### Parameters

As this is a generalized Speck implementation it's possible to configure the
internal parameters it's going to use. When possible use parameters from the Speck specification ([PDF](https://eprint.iacr.org/2013/404.pdf#page=17)) as those were the ones which were analyzed against attacks.

* Speck32/64: `{bits: 16, rounds: 22, rightRotations: 7, leftRotations: 2}`, keys must consist of four 16-bit integers;
* Speck48/64: `{bits: 24, rounds: 22, rightRotations: 8, leftRotations: 3}`, keys must consist of three 24-bit integers;
* Speck48/96: `{bits: 24, rounds: 23, rightRotations: 8, leftRotations: 3}`, keys must consist of four 24-bit integers;

What each parameter does:

* `bits`: internal word size. The block consists of two words, then, if you want to obfuscate a 32-bit integer you need to configure this parameter to `16`; This implementation supports word sizes from from 8-bit to 26-bit;
* `rounds`: how many rounds it will use, try to use a standard parameter or something close;
* `rightRotations`: how many right rotations it will do each encryption round, try to use a standard parameter;
* `leftRotations`: how many left rotations it will do each encryption round, try to use a standard parameter;

### Pitfalls:

* Setting `rounds` to a too large number will make it slower but not necessary safer;
* Using keys with many words (integers) will not make it safer as some of those may be not used;
* Speck is a cipher, but don't use this library for encryption: it was not intended neither tested for that;
* It supports up to 52-bit sized blocks and those are only safe [as long you can avoid some attacks](https://crypto.stackexchange.com/a/8570). If you're generating too many IDs it's better to use other cipher for that, more info on the [research section](#research) and [issue #1](https://github.com/qgustavor/generic-speck/issues/1).

### Formatting

The library includes a small helper format function:

```javascript
// Load the format functions using CommonJS...
const format = require('generic-speck/format')

// ... or ES modules
import * as format from 'https://unpkg.com/generic-speck/format.mjs'

// Then create an alphabet
const base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
const base32 = '23456789ABCDEFGHIJKMNPQRSTUVWXYZ'
const base20 = '23456789CFGHJMPQRVWX'
const base10 = '0123456789'

// To format use format.encode(value, alphabet, [maxValue])
format.encode(99, base64) // 'Bj'
format.encode(99, base32) // '55'
format.encode(99, base20) // '6X'
format.encode(99, base10) // '099'

// If you specify the maximum value the result will be padded
format.encode(100, base64, 256) // 'ABj'
format.encode(100, base32, 256) // '255'
format.encode(100, base20, 256) // '26X'
format.encode(100, base10, 256) // '099'

// To decode use format.decode(value, alphabet, [throwIfUnrecognized])
format.decode('Bj', base64) // 99
format.decode('55', base32) // 99
format.decode('6X', base20) // 99
format.decode('99', base10) // 99

// Unrecognized characters are ignored by default
// unless throwIfUnrecognized is true
format.decode('5V56+5W', base20) // 12345678
format.decode('ABC 9-9...', base10) // 99
format.decode('ABC 9-9...', base10, true) // throws 'unrecognized character'
```

## Research

I needed a way to obfuscate integers I use for IDs which met the following requirements:

* It shouldn't be easy to reverse to avoid people knowing how many IDs exist or their order ([1], [2], [3]);
* It should be small, so isn't possible to just generate a UUID and map it to a internal ID ([4]);
* It should work without having to check if a duplicate exists ([5], [6]);
* It shouldn't reinvent the wheel creating a new block cipher ([7], [13]);
* It should be implemented in JavaScript ([8]);
* It shouldn't be a pre-generated shuffled list ([9]);
* Best if there's no published attacks against it ([10]);
* Best if it can be plugged to internal ID schemes ([11]);
* Best if it don't wastes space (a sort of [format-preserving encryption]);
* The encoding doesn't matters ([12]);

I checked the following packages:

* [hashids](https://www.npmjs.com/package/hashids): its documentation says "this algorithm does try to make these ids random and unpredictable" but after working with it I noticed that seems it leaks part of the original integer size. [It also wastes space](https://runkit.com/embed/o4nhrey4e7mj): Base64 can encode any integer from 0 to 4095 using just two characters, Base32 can encode from 0 to 1023 also using two characters, but it uses three for less than that;
* [optimus-js](https://www.npmjs.com/package/optimus-js): can encode up to 2,147,483,647 (31 bits);

Following [some of those answers](https://stackoverflow.com/q/8554286) I decided trying some encryption related method. From the packages from NPM there's [node-fpe](https://www.npmjs.com/package/node-fpe) but [it's just a substitution cipher](https://runkit.com/embed/41ramg6ejgz0): I need to find a block cipher.

Speck [was suggested here](https://stackoverflow.com/a/8554984) and [seemed simple to implement](https://en.wikipedia.org/wiki/Speck_(cipher)#Reference_code). Other option could be [XXTEA](https://en.wikipedia.org/wiki/XXTEA) but it seemed harder to implement and there's an full attack published on it.

Turned that Speck is not just easy to implement but can be generalized to any block size which is multiple to 2 bits. As it's quite hard to find something that's not a multiple of 2 bits seems it can be used as a format-preserving encryption (but I couldn't find any cryptanalysis done on that). Because limitations on how JavaScript handles integers and bitwise operators this library supports block ciphers from 16-bit to 52-bit.

I'm currently using it to obfuscate identifiers [in this website](https://erros-da-cr.neocities.org/en/). Some example obfuscated IDs: `RD5JM2`, `6JYX3I`, `Q3CXRF`, `2FE8MJ` and `2J8QPB`.

----

Something that got my attention is YouTube: some of above links shown that it uses Base64 (specifically the URL variant). If you take a video ID, like `jNQXAC9IVRw`, and decode you get a 64-bit result, like `<Buffer 8c d4 17 00 2f 48 55 1c>`. That's the same size of the block size of DES/3DES and Blowfish ciphers. Based on that I imagine YouTube is using something like using internally something like Instagram ([11]) or Twitter and encrypting this ID using some 64-bit block cipher.

Then if someone wants to obfuscate a large number of IDs like YouTube or Instagram the best option would be using other block cipher, like 3DES or Blowfish, which is quite easy to implement using [the crypto module](https://nodejs.org/api/crypto.html).

[1]: https://stackoverflow.com/a/13868480
[2]: https://blog.codinghorror.com/url-shortening-hashes-in-practice/
[3]: http://kvz.io/blog/2009/06/10/create-short-ids-with-php-like-youtube-or-tinyurl/
[4]: https://stackoverflow.com/a/3034927
[5]: https://stackoverflow.com/a/3034987
[6]: https://stackoverflow.com/a/3034959
[7]: https://stackoverflow.com/q/9551091
[8]: https://stackoverflow.com/a/12590064
[9]: https://stackoverflow.com/a/3627139
[10]: http://carnage.github.io/2015/08/cryptanalysis-of-hashids
[11]: https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c
[format-preserving encryption]: https://en.wikipedia.org/wiki/Format-preserving_encryption
[12]: https://stackoverflow.com/a/42104974
[13]: https://stackoverflow.com/a/8555047
