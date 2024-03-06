<a href="https://addons.mozilla.org/en-US/firefox/addon/in0sight/"><img src="https://badgen.net/amo/users/in0sight?color=black&icon=firefox"></a> <a href="https://chrome.google.com/webstore/detail/in%C3%B8sight-%E2%80%94-zero-width-obf/fkobnhlaipildbjmlhaolahpplolnpcn"><img src="https://badgen.net/chrome-web-store/users/fkobnhlaipildbjmlhaolahpplolnpcn?icon=chrome&color=black"></a>


>**Paste these brackets (­‎­‌­‎⁠‌­​​‌­​​‌­​‎‌⁠‍­‌‎­‌­‎⁠‌⁠‍­‌‎­‌⁠‍​‌⁠‍‍‌­​‏‌­‎⁠‌⁠‍­‌‎­‌⁠‏‏‌­‎⁠‌­‎‏‌­‎­‌⁠‏­‌‏‏​) inside the extension & try decoding.**
>>If you're curious how this is possible, try pasting encoded text [here](https://unicode.scarfboy.com/).

* **Firefox: [Install](https://addons.mozilla.org/en-US/firefox/addon/in0sight/)**
* **Chrome: [Install](https://chrome.google.com/webstore/detail/in%C3%B8sight-%E2%80%94-zero-width-obf/fkobnhlaipildbjmlhaolahpplolnpcn)**


![](https://raw.githubusercontent.com/PlanetRenox/in0sight/master/images/ui.png "User Interface")

### ?
Unicode is the standard dictionary for every character that can be typed or pasted as text. There exists [millions](https://www.unicode.org/charts/) of uni codes containing foreign languages, emojis, etc. This standard won't be reverted. It is up to websites or the browser to ban characters. Some characters can have effects like making you write right to left, or act as the spacing between letters. From my research going through unicode charts I found 9 code points that are empty in length. It wouldn't be right to call them spaces because they don't even take up space.

Now in the same way 2+2 = 4, we could say codepoint1+codepoint2 = A

ZWUS-6, the 6 standing for base6 or senary, converts the code point to base6, then encodes the numbers with the zero width character assigned to 0-6

This extension defines a standard to represent **all** unicode so they can be encoded into zero width.

```
/** Zero Width Unicode Standard */
const ZWUS = {
    alphabet: {unifier: "\u{200C}", 0:"\u{200D}", 1: "\u{200F}", 2: "\u{00AD}", 3: "\u{2060}", 4: "\u{200B}", 5: "\u{200E}", 6:"\u{180E}", 7:"\u{FEFF}"},
    encodeString: (text, base = 6) => Array.from(text, u => u.codePointAt(0).toString(base).split('').map(x => ZWUS.alphabet[x]).join('')).join(ZWUS.alphabet.unifier)}
```

I've personally tested them in places like Discord, Steam chat, Reddit, Github, local text files, etc.
For extra security you can encrypt the text as well however this will increase its storage size.
I highly doubt forensics teams have protocol in place to scan for hidden zero width.
You can hide private information in a place no one can see or use it to communicate.

In update 2.0 the signature feature was removed so all encoded text only includes relevant data. Furthermore this extension requires no browser permissions and collects zero data.

**also available on [npmjs](https://www.npmjs.com/package/zwus)**
