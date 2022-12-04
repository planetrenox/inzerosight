<a href="https://addons.mozilla.org/en-US/firefox/addon/in0sight/"><img src="https://badgen.net/amo/users/in0sight?color=black&icon=firefox"></a> <a href="https://chrome.google.com/webstore/detail/in%C3%B8sight-%E2%80%94-zero-width-obf/fkobnhlaipildbjmlhaolahpplolnpcn"><img src="https://badgen.net/chrome-web-store/users/fkobnhlaipildbjmlhaolahpplolnpcn?icon=chrome&color=black"></a>


>**Paste this line of te‏‎‍­‍​‍‎⁠‍­‏‌‏‎‏­​⁠‎‍‎​­‏‌‏‍​‏­‎⁠‍­‎­⁠‎‌‏‍​‏­‎⁠‍­‎­⁠‎‌‏‎‍­‍​‍‎⁠‍­‏‌‏‎‏­​⁠‎‍‎​­‏‌‏‍​‏­‎⁠‍­‎­⁠‎‌‏‎‍­‍​‍‎⁠‍­‏‌‏‎‏­​⁠‎‍‎​­‏‌‏‍​‏­‎⁠‍­‎­⁠‎xt inside the extension & try decoding.**
>>If you're curious how this is possible, try pasting encoded text [here](https://www.branah.com/unicode-converter).

* **Firefox: [Install](https://addons.mozilla.org/en-US/firefox/addon/in0sight/)**
* **Chrome: [Install](https://chrome.google.com/webstore/detail/in%C3%B8sight-%E2%80%94-zero-width-obf/fkobnhlaipildbjmlhaolahpplolnpcn)**


![](https://raw.githubusercontent.com/PlanetRenox/in0sight/master/images/ui.png "User Interface")


There exist 7 unicode which can be typed anywhere text is allowed. These characters take up no space and cannot be detected without prior knowledge.

This extension defines a standard to represent all unicode so they can be encoded into zero width.

```
/** Zero Width Unicode Standard */
const ZWUS = {
    alphabet: {unifier: "\u{200C}", 0:"\u{200D}", 1: "\u{200F}", 2: "\u{00AD}", 3: "\u{2060}", 4: "\u{200B}", 5: "\u{200E}", 6:"\u{180E}", 7:"\u{FEFF}"},
    encodeString: (text, base = 6) => Array.from(text, u => u.codePointAt(0).toString(base).split('').map(x => ZWUS.alphabet[x]).join('')).join(ZWUS.alphabet.unifier)}
```

