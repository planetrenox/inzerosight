<a href="https://addons.mozilla.org/en-US/firefox/addon/in0sight/"><img src="https://badgen.net/amo/users/in0sight?color=black&icon=firefox"></a> <a href="https://chrome.google.com/webstore/detail/in%C3%B8sight-%E2%80%94-zero-width-obf/fkobnhlaipildbjmlhaolahpplolnpcn"><img src="https://badgen.net/chrome-web-store/users/fkobnhlaipildbjmlhaolahpplolnpcn?icon=chrome&color=black"></a>


>**Paste this line of te‏‎‍­‍​‍‎⁠‍­‏‌‏‎‏­​⁠‎‍‎​­‏‌‏‍​‏­‎⁠‍­‎­⁠‎‌‏‍​‏­‎⁠‍­‎­⁠‎‌‏‎‍­‍​‍‎⁠‍­‏‌‏‎‏­​⁠‎‍‎​­‏‌‏‍​‏­‎⁠‍­‎­⁠‎‌‏‎‍­‍​‍‎⁠‍­‏‌‏‎‏­​⁠‎‍‎​­‏‌‏‍​‏­‎⁠‍­‎­⁠‎xt inside the extension & try decoding.**
>>If you're curious how this is possible, try pasting encoded text [here](https://www.branah.com/unicode-converter).

* **Firefox: [Install](https://addons.mozilla.org/en-US/firefox/addon/in0sight/)**
* **Chrome: [Install](https://chrome.google.com/webstore/detail/in%C3%B8sight-%E2%80%94-zero-width-obf/fkobnhlaipildbjmlhaolahpplolnpcn)**


![](https://raw.githubusercontent.com/PlanetRenox/in0sight/master/images/ui.png "User Interface")


There exist 7 unicode which can be typed anywhere text is allowed. These characters take up no space and cannot be detected without prior knowledge.

This extension defines a standard to represent all unicode so they can be encoded into zero width.

```
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

        EN: (text: string) => Array.from(text).map(x => x.codePointAt(0).toString(6).split('').map(x => DES.CODE[x]).join('')).join(DES.CODE.unifier),
        DE: (text: string) => text.split(DES.CODE.unifier).map(x => String.fromCodePoint(parseInt(Array.from(x).map(z => Object.keys(DES.CODE).find(k => DES.CODE[k] === z)).join(''), 6))).join('')
    };
```
*Pull requests are welcome.*
