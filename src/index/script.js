document.getElementById("obf").addEventListener("click", function ()
{
    if (document.getElementById("kiloArea").value === "")
    {
        document.getElementById("kiloArea").value = "The text box is empty.";
        return;
    }
    switch (document.getElementById("dropdown").value)
    {
        case "version 1.0":
            document.getElementById("kiloArea").value = encodeV1_0(document.getElementById("kiloArea").value);
            break;
        case "version 1.1":
            document.getElementById("kiloArea").value = encodeV1_1(document.getElementById("kiloArea").value);
            break;
        case "version 1.2":
            document.getElementById("kiloArea").value = encodeV1_2(document.getElementById("kiloArea").value);
            break;
        case "ZWUS-6":
            document.getElementById("kiloArea").value = ZWUS_6.encode(document.getElementById("kiloArea").value);
            break;
        case "limited twiT":
            document.getElementById("kiloArea").value = encodeVtwiT(document.getElementById("kiloArea").value);
            break;
        case "limited proT":
            document.getElementById("kiloArea").value = encodeVproT(document.getElementById("kiloArea").value);
            break;
        case "limited winT":
            document.getElementById("kiloArea").value = encodeVwinT(document.getElementById("kiloArea").value);
            break;
    }
    document.querySelector("#kiloArea").select();
    document.execCommand("copy");
    document.getElementById("kiloArea").value = "Copied to clipboard. Here is a copy just in case -> " + document.getElementById("kiloArea").value +
        " <- \n\n• During decoding pick the correct version. \n• It's okay if there is extra text mixed up with it.";

});

document.getElementById("decode").addEventListener("click", function ()
{
    if (document.getElementById("kiloArea").value === "")
    {
        document.getElementById("kiloArea").value = "The text box is empty.";
        return;
    }
    let versionAlg = document.getElementById("dropdown").value;

    if (document.getElementById("kiloArea").value
    .replace(/[^\u200B\u200C\u200D\u2060\u00AD\uFEFF\u200E\u180E]/g, "").substring(0, 6) === V1P2.signature) // autopick/override if signature present
    {
        versionAlg = "version 1.2";
    }

    switch (versionAlg)
    {
        case "version 1.0":
            document.getElementById("kiloArea").value = decodeV1_0(document.getElementById("kiloArea").value);
            break;
        case "version 1.1":
            document.getElementById("kiloArea").value = decodeV1_1(document.getElementById("kiloArea").value);
            break;
        case "version 1.2":
            document.getElementById("kiloArea").value = decodeV1_2(document.getElementById("kiloArea").value);
            break;
        case "ZWUS-6":
            document.getElementById("kiloArea").value = ZWUS_6.decode(document.getElementById("kiloArea").value);
            break;
        case "limited twiT":
            document.getElementById("kiloArea").value = decodeVtwiT(document.getElementById("kiloArea").value);
            break;
        case "limited winT":
            document.getElementById("kiloArea").value = decodeVwinT(document.getElementById("kiloArea").value);
            break;
        case "limited proT":
            document.getElementById("kiloArea").value = decodeVproT(document.getElementById("kiloArea").value);
            break;
    }

});

// ------------------------------------------------------------------------------
/** Zero Width Unicode Standard — Senary */
const ZWUS_6 = {
    0      : "\u{200B}",
    1      : "\u{200C}",
    2      : "\u{200D}",
    3      : "\u{2060}",
    4      : "\u{FEFF}",
    5      : "\u{200E}",
    UNIFIER: "\u{180E}",

    encode: text => text.split('').map(x => x.codePointAt(0).toString(6).split('').map(x => ZWUS_6[x]).join('') + ZWUS_6.UNIFIER).join('').slice(0, -1),
    decode: text => text.split(ZWUS_6.UNIFIER).map(s => String.fromCharCode(parseInt(s.split('').map(c => Object.keys(ZWUS_6).find(k => ZWUS_6[k] === c)).join(''), 6).toString(10))).join('')
};

// ------------------------------------------------------------------------------
// Version 1.2           Focus here is on scalability, support for multiple languages and special characters
const V1P2 = {signature: "\u{200C}\u{200E}\u{FEFF}\u{00AD}\u{200D}\u{FEFF}"};
//<editor-fold defaultstate="collapsed" desc="Version 1.2">
const dictionaryV1_2root = {
    0   : "\u{200C}\u{FEFF}",
    1   : "\u{200C}\u{200E}",
    2   : "\u{200D}\u{FEFF}",
    3   : "\u{200D}\u{200E}",
    4   : "\u{2060}\u{FEFF}",
    5   : "\u{2060}\u{200E}",
    6   : "\u{00AD}\u{FEFF}",
    7   : "\u{00AD}\u{200E}",
    8   : "\u{FEFF}\u{200B}",
    9   : "\u{FEFF}\u{200C}",
    a   : "\u{200B}\u{200D}",
    b   : "\u{2060}\u{00AD}",
    c   : "\u{200D}\u{200D}",
    d   : "\u{200C}\u{00AD}",
    e   : "\u{200B}\u{200B}",
    f   : "\u{200D}\u{00AD}",
    g   : "\u{2060}\u{200D}",
    h   : "\u{200C}\u{200D}",
    i   : "\u{200B}\u{2060}",
    j   : "\u{00AD}\u{2060}",
    k   : "\u{00AD}\u{200C}",
    l   : "\u{200D}\u{200B}",
    m   : "\u{200D}\u{2060}",
    n   : "\u{200B}\u{00AD}",
    o   : "\u{200C}\u{200B}",
    p   : "\u{2060}\u{2060}",
    q   : "\u{00AD}\u{200D}",
    r   : "\u{200C}\u{2060}",
    s   : "\u{200C}\u{200C}",
    t   : "\u{200B}\u{200C}",
    u   : "\u{200D}\u{200C}",
    v   : "\u{00AD}\u{200B}",
    w   : "\u{2060}\u{200B}",
    x   : "\u{200B}\u{FEFF}",
    y   : "\u{2060}\u{200C}",
    z   : "\u{200B}\u{200E}",
    "'" : "\u{200E}\u{200C}",
    " " : "\u{180E}", // Stays the same across all dictionaries
    "," : "\u{FEFF}\u{2060}", // Stays the same across all dictionaries
    "\n": "\u{FEFF}\u{200D}", // Stays the same across all dictionaries
    "." : "\u{FEFF}\u{00AD}",
    "-" : "\u{FEFF}\u{FEFF}",
    '"' : "\u{FEFF}\u{200E}",
    "+" : "\u{200E}\u{200D}",
    "=" : "\u{200E}\u{2060}",
    "/" : "\u{200E}\u{00AD}",
    "!" : "\u{200E}\u{200E}",
    "?" : "\u{200E}\u{200B}"
    // "switch dictionary": "\u{200E}\u{FEFF}" // Stays the same across all dictionaries
};
const dictionaryV1_2ru = {
    0   : "\u{200C}\u{FEFF}",
    1   : "\u{200C}\u{200E}",
    2   : "\u{200D}\u{FEFF}",
    3   : "\u{200D}\u{200E}",
    4   : "\u{2060}\u{FEFF}",
    5   : "\u{2060}\u{200E}",
    6   : "\u{00AD}\u{FEFF}",
    7   : "\u{00AD}\u{200E}",
    8   : "\u{FEFF}\u{200B}",
    9   : "\u{FEFF}\u{200C}",
    а   : "\u{200B}\u{200D}",
    б   : "\u{2060}\u{00AD}",
    в   : "\u{200D}\u{200D}",
    г   : "\u{200C}\u{00AD}",
    д   : "\u{200B}\u{200B}",
    е   : "\u{200D}\u{00AD}",
    ж   : "\u{2060}\u{200D}",
    з   : "\u{200C}\u{200D}",
    и   : "\u{200B}\u{2060}",
    й   : "\u{00AD}\u{2060}",
    к   : "\u{00AD}\u{200C}",
    л   : "\u{200D}\u{200B}",
    м   : "\u{200D}\u{2060}",
    н   : "\u{200B}\u{00AD}",
    о   : "\u{200C}\u{200B}",
    п   : "\u{2060}\u{2060}",
    р   : "\u{00AD}\u{200D}",
    с   : "\u{200C}\u{2060}",
    т   : "\u{200C}\u{200C}",
    у   : "\u{200B}\u{200C}",
    ф   : "\u{200D}\u{200C}",
    х   : "\u{00AD}\u{200B}",
    ц   : "\u{2060}\u{200B}",
    ч   : "\u{200B}\u{FEFF}",
    ш   : "\u{2060}\u{200C}",
    щ   : "\u{200B}\u{200E}",
    ъ   : "\u{FEFF}\u{FEFF}",
    ы   : "\u{FEFF}\u{200E}",
    ь   : "\u{200E}\u{200D}",
    э   : "\u{200E}\u{2060}",
    ю   : "\u{200E}\u{00AD}",
    я   : "\u{200E}\u{200E}",
    ё   : "\u{200E}\u{200B}",
    "\n": "\u{FEFF}\u{200D}",
    "." : "\u{FEFF}\u{00AD}",
    "," : "\u{FEFF}\u{2060}",
    "|" : "\u{200E}\u{200C}",
    " " : "\u{180E}"
    // "switch dictionary": "\u{200E}\u{FEFF}" // Stays the same across all dictionaries
};
const dictionaryV1_2sc = {
    0   : "\u{200C}\u{FEFF}",
    1   : "\u{200C}\u{200E}",
    2   : "\u{200D}\u{FEFF}",
    3   : "\u{200D}\u{200E}",
    4   : "\u{2060}\u{FEFF}",
    5   : "\u{2060}\u{200E}",
    6   : "\u{00AD}\u{FEFF}",
    7   : "\u{00AD}\u{200E}",
    8   : "\u{FEFF}\u{200B}",
    9   : "\u{FEFF}\u{200C}",
    ":" : "\u{200B}\u{200D}",
    "*" : "\u{2060}\u{00AD}",
    "(" : "\u{200D}\u{200D}",
    ")" : "\u{200C}\u{00AD}",
    "_" : "\u{200B}\u{200B}",
    "#" : "\u{200D}\u{00AD}",
    "&" : "\u{2060}\u{200D}",
    "^" : "\u{200C}\u{200D}",
    "%" : "\u{200B}\u{2060}",
    "$" : "\u{00AD}\u{2060}",
    "@" : "\u{00AD}\u{200C}",
    "`" : "\u{200D}\u{200B}",
    "~" : "\u{200D}\u{2060}",
    "\\": "\u{200B}\u{00AD}",
    ">" : "\u{200C}\u{200B}",
    "<" : "\u{2060}\u{2060}",
    "]" : "\u{00AD}\u{200D}",
    "[" : "\u{200C}\u{2060}",
    "}" : "\u{200C}\u{200C}",
    "{" : "\u{200B}\u{200C}",
    "—" : "\u{00AD}\u{200B}",
    ñ   : "\u{2060}\u{200B}",
    à   : "\u{200B}\u{FEFF}",
    è   : "\u{2060}\u{200C}",
    é   : "\u{200B}\u{200E}",
    ì   : "\u{200E}\u{200C}",
    " " : "\u{180E}", // Stays the same across all dictionaries
    "," : "\u{FEFF}\u{2060}", // Stays the same across all dictionaries
    "\n": "\u{FEFF}\u{200D}", // Stays the same across all dictionaries
    "." : "\u{FEFF}\u{00AD}", // Stays the same across all dictionaries
    í   : "\u{FEFF}\u{FEFF}",
    ò   : "\u{FEFF}\u{200E}",
    ó   : "\u{200E}\u{200D}",
    ù   : "\u{200E}\u{2060}",
    "$" : "\u{200E}\u{00AD}",
    "œ" : "\u{200E}\u{200E}",
    "æ" : "\u{200E}\u{200B}"
    // "switch dictionary": "\u{200E}\u{FEFF}" // Stays the same across all dictionaries
    // "\u{00d8}": "\u{200D}\u{200C}", //cant figure out why doesnt work
};
const dictionaryV1_2jaHira = {
    0   : "\u{200C}\u{FEFF}",
    1   : "\u{200C}\u{200E}",
    2   : "\u{200D}\u{FEFF}",
    3   : "\u{200D}\u{200E}",
    4   : "\u{2060}\u{FEFF}",
    5   : "\u{2060}\u{200E}",
    6   : "\u{00AD}\u{FEFF}",
    7   : "\u{00AD}\u{200E}",
    8   : "\u{FEFF}\u{200B}",
    9   : "\u{FEFF}\u{200C}",
    ぁ   : "\u{200B}\u{200D}",
    あ   : "\u{2060}\u{00AD}",
    ぃ   : "\u{200D}\u{200D}",
    い   : "\u{200C}\u{00AD}",
    ぅ   : "\u{200B}\u{200B}",
    う   : "\u{200D}\u{00AD}",
    ぇ   : "\u{2060}\u{200D}",
    え   : "\u{200C}\u{200D}",
    ぉ   : "\u{200B}\u{2060}",
    お   : "\u{00AD}\u{2060}",
    か   : "\u{00AD}\u{200C}",
    が   : "\u{200D}\u{200B}",
    き   : "\u{200D}\u{2060}",
    ぎ   : "\u{200B}\u{00AD}",
    く   : "\u{200C}\u{200B}",
    ぐ   : "\u{2060}\u{2060}",
    け   : "\u{00AD}\u{200D}",
    げ   : "\u{200C}\u{2060}",
    こ   : "\u{200C}\u{200C}",
    ご   : "\u{200B}\u{200C}",
    さ   : "\u{200D}\u{200C}",
    ざ   : "\u{00AD}\u{200B}",
    し   : "\u{2060}\u{200B}",
    じ   : "\u{200B}\u{FEFF}",
    す   : "\u{2060}\u{200C}",
    ず   : "\u{200B}\u{200E}",
    せ   : "\u{200E}\u{200C}",
    " " : "\u{180E}", // Stays the same across all dictionaries
    "," : "\u{FEFF}\u{2060}", // Stays the same across all dictionaries
    "\n": "\u{FEFF}\u{200D}", // Stays the same across all dictionaries
    "." : "\u{FEFF}\u{00AD}", // Stays the same across all dictionaries
    ぜ   : "\u{FEFF}\u{FEFF}",
    そ   : "\u{FEFF}\u{200E}",
    ぞ   : "\u{200E}\u{200D}",
    た   : "\u{200E}\u{2060}",
    だ   : "\u{200E}\u{00AD}",
    ち   : "\u{200E}\u{200E}",
    ぢ   : "\u{200E}\u{200B}"
    // "switch dictionary": "\u{200E}\u{FEFF}" // Stays the same across all dictionaries
};
const dictionaryV1_2jaHira2 = {
    0   : "\u{200C}\u{FEFF}",
    1   : "\u{200C}\u{200E}",
    2   : "\u{200D}\u{FEFF}",
    3   : "\u{200D}\u{200E}",
    4   : "\u{2060}\u{FEFF}",
    5   : "\u{2060}\u{200E}",
    6   : "\u{00AD}\u{FEFF}",
    7   : "\u{00AD}\u{200E}",
    8   : "\u{FEFF}\u{200B}",
    9   : "\u{FEFF}\u{200C}",
    っ   : "\u{200B}\u{200D}",
    つ   : "\u{2060}\u{00AD}",
    づ   : "\u{200D}\u{200D}",
    て   : "\u{200C}\u{00AD}",
    で   : "\u{200B}\u{200B}",
    と   : "\u{200D}\u{00AD}",
    ど   : "\u{2060}\u{200D}",
    な   : "\u{200C}\u{200D}",
    に   : "\u{200B}\u{2060}",
    ぬ   : "\u{00AD}\u{2060}",
    ね   : "\u{00AD}\u{200C}",
    の   : "\u{200D}\u{200B}",
    は   : "\u{200D}\u{2060}",
    ぎ   : "\u{200B}\u{00AD}",
    ば   : "\u{200C}\u{200B}",
    ぱ   : "\u{2060}\u{2060}",
    ひ   : "\u{00AD}\u{200D}",
    び   : "\u{200C}\u{2060}",
    ぴ   : "\u{200C}\u{200C}",
    ご   : "\u{200B}\u{200C}",
    ふ   : "\u{200D}\u{200C}",
    ぶ   : "\u{00AD}\u{200B}",
    ぷ   : "\u{2060}\u{200B}",
    へ   : "\u{200B}\u{FEFF}",
    べ   : "\u{2060}\u{200C}",
    ぺ   : "\u{200B}\u{200E}",
    ほ   : "\u{200E}\u{200C}",
    " " : "\u{180E}", // Stays the same across all dictionaries
    "," : "\u{FEFF}\u{2060}", // Stays the same across all dictionaries
    "\n": "\u{FEFF}\u{200D}", // Stays the same across all dictionaries
    "." : "\u{FEFF}\u{00AD}", // Stays the same across all dictionaries
    ぼ   : "\u{FEFF}\u{FEFF}",
    ぽ   : "\u{FEFF}\u{200E}",
    ま   : "\u{200E}\u{200D}",
    み   : "\u{200E}\u{2060}",
    む   : "\u{200E}\u{00AD}",
    め   : "\u{200E}\u{200E}",
    も   : "\u{200E}\u{200B}"
    // "switch dictionary": "\u{200E}\u{FEFF}" // Stays the same across all dictionaries
};
const dictionaryV1_2jaHira3 = {
    0   : "\u{200C}\u{FEFF}",
    1   : "\u{200C}\u{200E}",
    2   : "\u{200D}\u{FEFF}",
    3   : "\u{200D}\u{200E}",
    4   : "\u{2060}\u{FEFF}",
    5   : "\u{2060}\u{200E}",
    6   : "\u{00AD}\u{FEFF}",
    7   : "\u{00AD}\u{200E}",
    8   : "\u{FEFF}\u{200B}",
    9   : "\u{FEFF}\u{200C}",
    ゃ   : "\u{200B}\u{200D}",
    や   : "\u{2060}\u{00AD}",
    ゅ   : "\u{200D}\u{200D}",
    ゆ   : "\u{200C}\u{00AD}",
    ょ   : "\u{200B}\u{200B}",
    よ   : "\u{200D}\u{00AD}",
    ら   : "\u{2060}\u{200D}",
    り   : "\u{200C}\u{200D}",
    る   : "\u{200B}\u{2060}",
    れ   : "\u{00AD}\u{2060}",
    ろ   : "\u{00AD}\u{200C}",
    ゎ   : "\u{200D}\u{200B}",
    わ   : "\u{200D}\u{2060}",
    ゐ   : "\u{200B}\u{00AD}",
    ゑ   : "\u{200C}\u{200B}",
    を   : "\u{2060}\u{2060}",
    ん   : "\u{00AD}\u{200D}",
    ゔ   : "\u{200C}\u{2060}",
    ゕ   : "\u{200C}\u{200C}",
    ゖ   : "\u{200B}\u{200C}",
    "゙ ": "\u{200D}\u{200C}",
    " " : "\u{00AD}\u{200B}",
    "゛" : "\u{2060}\u{200B}",
    "゜" : "\u{200B}\u{FEFF}",
    ゝ   : "\u{2060}\u{200C}",
    ゞ   : "\u{200B}\u{200E}",
    ゟ   : "\u{200E}\u{200C}",
    " " : "\u{180E}", // Stays the same across all dictionaries
    "," : "\u{FEFF}\u{2060}", // Stays the same across all dictionaries
    "\n": "\u{FEFF}\u{200D}", // Stays the same across all dictionaries
    "." : "\u{FEFF}\u{00AD}", // Stays the same across all dictionaries
    県   : "\u{FEFF}\u{FEFF}",
    政   : "\u{FEFF}\u{200E}",
    保   : "\u{200E}\u{200D}",
    意   : "\u{200E}\u{2060}",
    会   : "\u{200E}\u{00AD}",
    入   : "\u{200E}\u{200E}",
    力   : "\u{200E}\u{200B}"
    // "switch dictionary": "\u{200E}\u{FEFF}" // Stays the same across all dictionaries
};
const dictionaryV1_2izs = {
    0         : "\u{200C}\u{FEFF}",
    1         : "\u{200C}\u{200E}",
    2         : "\u{200D}\u{FEFF}",
    3         : "\u{200D}\u{200E}",
    4         : "\u{2060}\u{FEFF}",
    5         : "\u{2060}\u{200E}",
    6         : "\u{00AD}\u{FEFF}",
    7         : "\u{00AD}\u{200E}",
    8         : "\u{FEFF}\u{200B}",
    9         : "\u{FEFF}\u{200C}",
    '§'       : "\u{200B}\u{200D}",
    '£'       : "\u{2060}\u{00AD}",
    '€'       : "\u{200D}\u{200D}",
    '¥'       : "\u{200C}\u{00AD}",
    '©'       : "\u{200B}\u{200B}",
    '®'       : "\u{200D}\u{00AD}",
    '°'       : "\u{2060}\u{200D}",
    '¶'       : "\u{200C}\u{200D}",
    '\u{200C}': "\u{200B}\u{2060}",
    '\u{FEFF}': "\u{00AD}\u{2060}",
    '\u{200E}': "\u{00AD}\u{200C}",
    '\u{200D}': "\u{200D}\u{200B}",
    '\u{200B}': "\u{200D}\u{2060}",
    '\u{00AD}': "\u{200B}\u{00AD}",
    '\u{2060}': "\u{200C}\u{200B}",
    '\u{180E}': "\u{2060}\u{2060}",
    '•'       : "\u{00AD}\u{200D}",
    '¬'       : "\u{200C}\u{2060}"
    // ゕ: "\u{200C}\u{200C}",
    // ゖ: "\u{200B}\u{200C}",
    // "゙ ": "\u{200D}\u{200C}",
    // " ": "\u{00AD}\u{200B}",
    // "゛": "\u{2060}\u{200B}",
    // "゜": "\u{200B}\u{FEFF}",
    // ゝ: "\u{2060}\u{200C}",
    // ゞ: "\u{200B}\u{200E}",
    // ゟ: "\u{200E}\u{200C}",
    // " ": "\u{180E}", // Stays the same across all dictionaries
    // ",": "\u{FEFF}\u{2060}", // Stays the same across all dictionaries
    // "\n": "\u{FEFF}\u{200D}", // Stays the same across all dictionaries
    // ".": "\u{FEFF}\u{00AD}", // Stays the same across all dictionaries
    // 県: "\u{FEFF}\u{FEFF}",
    // 政: "\u{FEFF}\u{200E}",
    // 保: "\u{200E}\u{200D}",
    // 意: "\u{200E}\u{2060}",
    // 会: "\u{200E}\u{00AD}",
    // 入: "\u{200E}\u{200E}",
    // 力: "\u{200E}\u{200B}"
    // "switch dictionary": "\u{200E}\u{FEFF}" // Stays the same across all dictionaries
};

function encodeV1_2(text)
{
    var kilo = "\u{200C}\u{200E}\u{FEFF}\u{00AD}\u{200D}\u{FEFF}"; // sign with "1.2"
    var currDictionary = dictionaryV1_2root;
    for (var i = 0; i < text.length; i++) // iterate each charcter
    {
        var itWasUpperCase = false;
        itWasUpperCase = text.charAt(i) != text.charAt(i).toLowerCase();
        if (dictionaryV1_2root[text.charAt(i).toLowerCase()] !== undefined) // Check to see if character is in root dictionary
        {
            if ((currDictionary != dictionaryV1_2root) && (text.charAt(i) !== ' ') && (text.charAt(i) !== ',') && (text.charAt(i) !== '.') && (text.charAt(i) !== '\n') && (isNaN(text.charAt(i))))
            {
                // insert sequence into unicode path to let deobfuscate method know to start using root dictionary.
                kilo += "\u{200E}\u{FEFF}\u{180E}\u{180E}";
                currDictionary = dictionaryV1_2root;
            }
            if (itWasUpperCase)
            {
                kilo += "\u{00AD}\u{00AD}";
            }
            kilo += dictionaryV1_2root[text.charAt(i).toLowerCase()];
        }
        else if (dictionaryV1_2ru[text.charAt(i).toLowerCase()] !== undefined) // Check to see if character is in Russian dictionary
        {
            if (currDictionary != dictionaryV1_2ru)
            {
                // insert sequence into unicode path to let deobfuscate method know to start using this dictionary.
                kilo += "\u{200E}\u{FEFF}\u{180E}\u{200B}";
                currDictionary = dictionaryV1_2ru;
            }
            if (itWasUpperCase)
            {
                kilo += "\u{00AD}\u{00AD}";
            }
            kilo += dictionaryV1_2ru[text.charAt(i).toLowerCase()];
        }
        else if (dictionaryV1_2sc[text.charAt(i).toLowerCase()] !== undefined) // Check to see if character is in this dictionary
        {
            if (currDictionary != dictionaryV1_2sc)
            {
                // insert sequence into unicode path to let deobfuscate method know to start using this dictionary.
                kilo += "\u{200E}\u{FEFF}\u{180E}\u{200C}";
                currDictionary = dictionaryV1_2sc;
            }
            if (itWasUpperCase)
            {
                kilo += "\u{00AD}\u{00AD}";
            }
            kilo += dictionaryV1_2sc[text.charAt(i).toLowerCase()];
        }
        else if (dictionaryV1_2jaHira[text.charAt(i).toLowerCase()] !== undefined) // Check to see if character is in this dictionary
        {
            if (currDictionary != dictionaryV1_2jaHira)
            {
                // insert sequence into unicode path to let deobfuscate method know to start using this dictionary.
                kilo += "\u{200E}\u{FEFF}\u{180E}\u{200D}";
                currDictionary = dictionaryV1_2jaHira;
            }
            if (itWasUpperCase)
            {
                kilo += "\u{00AD}\u{00AD}";
            }
            kilo += dictionaryV1_2jaHira[text.charAt(i).toLowerCase()];
        }
        else if (dictionaryV1_2jaHira2[text.charAt(i).toLowerCase()] !== undefined) // Check to see if character is in this dictionary
        {
            if (currDictionary != dictionaryV1_2jaHira2)
            {
                // insert sequence into unicode path to let deobfuscate method know to start using this dictionary.
                kilo += "\u{200E}\u{FEFF}\u{180E}\u{2060}";
                currDictionary = dictionaryV1_2jaHira2;
            }
            if (itWasUpperCase)
            {
                kilo += "\u{00AD}\u{00AD}";
            }
            kilo += dictionaryV1_2jaHira2[text.charAt(i).toLowerCase()];
        }
        else if (dictionaryV1_2jaHira3[text.charAt(i).toLowerCase()] !== undefined) // Check to see if character is in this dictionary
        {
            if (currDictionary != dictionaryV1_2jaHira3)
            {
                // insert sequence into unicode path to let deobfuscate method know to start using this dictionary.
                kilo += "\u{200E}\u{FEFF}\u{180E}\u{00AD}";
                currDictionary = dictionaryV1_2jaHira3;
            }
            if (itWasUpperCase)
            {
                kilo += "\u{00AD}\u{00AD}";
            }
            kilo += dictionaryV1_2jaHira3[text.charAt(i).toLowerCase()];
        }
        else if (dictionaryV1_2izs[text.charAt(i).toLowerCase()] !== undefined) // Check to see if character is in this dictionary
        {
            if (currDictionary != dictionaryV1_2izs)
            {
                // insert sequence into unicode path to let deobfuscate method know to start using this dictionary.
                kilo += "\u{200E}\u{FEFF}\u{180E}\u{FEFF}";
                currDictionary = dictionaryV1_2izs;
            }
            if (itWasUpperCase)
            {
                kilo += "\u{00AD}\u{00AD}";
            }
            kilo += dictionaryV1_2izs[text.charAt(i).toLowerCase()];
        }
    }
    return kilo;
}

function decodeV1_2(text)
{
    var theKilo = "";
    var stripped = text.replace(/[^\u200B\u200C\u200D\u2060\u00AD\uFEFF\u200E\u180E]/g, "");
    stripped = stripped.substring(6, stripped.length);
    var kilo = "";
    var currDictionary = dictionaryV1_2root;
    var reverseDictionary = Object.values(dictionaryV1_2root);
    var CorresKeys = Object.keys(dictionaryV1_2root);
    for (var i = 0; i < stripped.length; i += 2)
    {
        var wasUpperCase = false;
        while (stripped.charAt(i) === "\u{180E}")
        {
            kilo += " ";
            i++;
        }
        if (stripped.substring(i, i + 4) === "\u{200E}\u{FEFF}\u{180E}\u{180E}") // Use Root Dictionary
        {
            currDictionary = dictionaryV1_2root;
            reverseDictionary = Object.values(dictionaryV1_2root);
            CorresKeys = Object.keys(dictionaryV1_2root);
            i += 4;
        }
        else if (stripped.substring(i, i + 4) === "\u{200E}\u{FEFF}\u{180E}\u{200B}") // Use Russian Dictionary
        {
            currDictionary = dictionaryV1_2ru;
            reverseDictionary = Object.values(dictionaryV1_2ru);
            CorresKeys = Object.keys(dictionaryV1_2ru);
            i += 4;
        }
        else if (stripped.substring(i, i + 4) === "\u{200E}\u{FEFF}\u{180E}\u{200C}") // Use sc Dictionary
        {
            currDictionary = dictionaryV1_2sc;
            reverseDictionary = Object.values(dictionaryV1_2sc);
            CorresKeys = Object.keys(dictionaryV1_2sc);
            i += 4;
        }
        else if (stripped.substring(i, i + 4) === "\u{200E}\u{FEFF}\u{180E}\u{200D}") // Use ja Dictionary
        {
            currDictionary = dictionaryV1_2jaHira;
            reverseDictionary = Object.values(dictionaryV1_2jaHira);
            CorresKeys = Object.keys(dictionaryV1_2jaHira);
            i += 4;
        }
        else if (stripped.substring(i, i + 4) === "\u{200E}\u{FEFF}\u{180E}\u{2060}") // Use ja2 Dictionary
        {
            currDictionary = dictionaryV1_2jaHira2;
            reverseDictionary = Object.values(dictionaryV1_2jaHira2);
            CorresKeys = Object.keys(dictionaryV1_2jaHira2);
            i += 4;
        }
        else if (stripped.substring(i, i + 4) === "\u{200E}\u{FEFF}\u{180E}\u{00AD}") // Use ja3 Dictionary
        {
            currDictionary = dictionaryV1_2jaHira3;
            reverseDictionary = Object.values(dictionaryV1_2jaHira3);
            CorresKeys = Object.keys(dictionaryV1_2jaHira3);
            i += 4;
        }
        else if (stripped.substring(i, i + 4) === "\u{200E}\u{FEFF}\u{180E}\u{FEFF}") // Use izs Dictionary
        {
            currDictionary = dictionaryV1_2izs;
            reverseDictionary = Object.values(dictionaryV1_2izs);
            CorresKeys = Object.keys(dictionaryV1_2izs);
            i += 4;
        }
        if (stripped.substring(i, i + 2) === "\u{00AD}\u{00AD}")
        {
            wasUpperCase = true;
            i += 2;
        }
        for (var k = 0; k < 48; k++)
        {
            if (stripped.substring(i, i + 2) === reverseDictionary[k])
            {
                theKilo = CorresKeys[k];
                if (wasUpperCase)
                {
                    theKilo = theKilo.toUpperCase();
                }
                kilo += theKilo;
                break;
            }
        }
    }
    return kilo;
}

//</editor-fold>

// ------------------------------------------------------------------------------
// Version 1.1           Not concerned with compatibility, can handle PGP, improved size efficiency
// Building blocks:      200B 200C 200D 180E 2060 00AD FEFF 200E
// Supported characters: (space) Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
//                       0 1 2 3 4 5 6 7 8 9
//                       (new line) ! ? # * ( ) - _ = + : " , . /
//<editor-fold defaultstate="collapsed" desc="Version 1.1">
var dictionaryV1_1 = {
    0   : "\u{200C}\u{FEFF}",
    1   : "\u{200C}\u{200E}",
    2   : "\u{200D}\u{FEFF}",
    3   : "\u{200D}\u{200E}",
    4   : "\u{2060}\u{FEFF}",
    5   : "\u{2060}\u{200E}",
    6   : "\u{00AD}\u{FEFF}",
    7   : "\u{00AD}\u{200E}",
    8   : "\u{FEFF}\u{200B}",
    9   : "\u{FEFF}\u{200C}",
    a   : "\u{200B}\u{200D}",
    b   : "\u{2060}\u{00AD}",
    c   : "\u{200D}\u{200D}",
    d   : "\u{200C}\u{00AD}",
    e   : "\u{200B}\u{200B}",
    f   : "\u{200D}\u{00AD}",
    g   : "\u{2060}\u{200D}",
    h   : "\u{200C}\u{200D}",
    i   : "\u{200B}\u{2060}",
    j   : "\u{00AD}\u{2060}",
    k   : "\u{00AD}\u{200C}",
    l   : "\u{200D}\u{200B}",
    m   : "\u{200D}\u{2060}",
    n   : "\u{200B}\u{00AD}",
    o   : "\u{200C}\u{200B}",
    p   : "\u{2060}\u{2060}",
    q   : "\u{00AD}\u{200D}",
    r   : "\u{200C}\u{2060}",
    s   : "\u{200C}\u{200C}",
    t   : "\u{200B}\u{200C}",
    u   : "\u{200D}\u{200C}",
    v   : "\u{00AD}\u{200B}",
    w   : "\u{2060}\u{200B}",
    x   : "\u{200B}\u{FEFF}",
    y   : "\u{2060}\u{200C}",
    z   : "\u{200B}\u{200E}",
    _   : "\u{200E}\u{200C}",
    " " : "\u{180E}",
    "," : "\u{FEFF}\u{2060}",
    "\n": "\u{FEFF}\u{200D}",
    "." : "\u{FEFF}\u{00AD}",
    "-" : "\u{FEFF}\u{FEFF}",
    '"' : "\u{FEFF}\u{200E}",
    "+" : "\u{200E}\u{200D}",
    "=" : "\u{200E}\u{2060}",
    "/" : "\u{200E}\u{00AD}",
    "?" : "\u{200E}\u{FEFF}",
    "!" : "\u{200E}\u{200E}",
    "(" : "\u{200E}\u{200B}"
};

function encodeV1_1(sec)
{
    var kilo = "";
    for (var i = 0; i < sec.length; i++)
    {
        var itWasUpperCase = false;
        if (sec.charAt(i) == sec.charAt(i).toLowerCase())
        {
            itWasUpperCase = false;
        }
        else
        {
            itWasUpperCase = true;
        }
        if (dictionaryV1_1[sec.charAt(i).toLowerCase()] !== undefined)
        {
            if (itWasUpperCase)
            {
                kilo += "\u{00AD}\u{00AD}";
            }
            kilo += dictionaryV1_1[sec.charAt(i).toLowerCase() // Spacial characters
                ];
        }
        else if (sec.charAt(i) === "#")
        {
            kilo += "\u{200E}\u{200B}\u{200E}\u{200D}";
        }
        else if (sec.charAt(i) === ")")
        {
            kilo += "\u{200E}\u{200B}\u{FEFF}\u{200D}";
        }
        else if (sec.charAt(i) === ":")
        {
            kilo += "\u{200E}\u{200B}\u{FEFF}\u{00AD}";
        }
        else if (sec.charAt(i) === "*")
        {
            kilo += "\u{200E}\u{200B}\u{200E}\u{00AD}";
        }
    }
    return kilo;
}

function decodeV1_1(text)
{
    var theKilo = "";
    var stripped = text.replace(/[^\u200B\u200C\u200D\u2060\u00AD\uFEFF\u200E\u180E]/g, "");
    var kilo = "";
    var reverseDictionary = Object.values(dictionaryV1_1);
    var CorresKeys = Object.keys(dictionaryV1_1);
    for (var i = 0; i < stripped.length; i += 2)
    {
        var wasUpperCase = false;
        while (stripped.charAt(i) === "\u{180E}")
        {
            kilo += " ";
            i++;
        }
        if (stripped.substring(i, i + 2) === "\u{00AD}\u{00AD}")
        {
            wasUpperCase = true;
            i += 2;
        }
        for (var k = 0; k < 48; k++)
        {
            if (stripped.substring(i, i + 2) === reverseDictionary[k])
            {
                theKilo = CorresKeys[k];
                if (wasUpperCase)
                {
                    theKilo = theKilo.toUpperCase();
                }
                kilo += theKilo;
                break;
            }
            else if (stripped.substring(i, i + 2) === "\u{200E}\u{200B}")
            {
                if (stripped.substring(i + 2, i + 4) === "\u{200E}\u{200D}")
                {
                    kilo += "#";
                    i += 2;
                    break;
                }
                else if (stripped.substring(i + 2, i + 4) === "\u{FEFF}\u{200D}")
                {
                    kilo += ")";
                    i += 2;
                    break;
                }
                else if (stripped.substring(i + 2, i + 4) === "\u{200E}\u{00AD}")
                {
                    kilo += "*";
                    i += 2;
                    break;
                }
                else if (stripped.substring(i + 2, i + 4) === "\u{FEFF}\u{00AD}")
                {
                    kilo += ":";
                    i += 2;
                    break;
                }
                else
                {
                    kilo += "(";
                }
                break;
            }
        }
    }
    return kilo;
}

// ==============================================================================
//  end of version 1.1
// ==============================================================================
//</editor-fold>

// ------------------------------------------------------------------------------
// Version 1.0           Not concerned with compatibility, can handle PGP, efficiency not so great
// Building blocks:      200B 200C 200D 180E 2060 00AD FEFF 200E
// Supported characters: (space) Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
//                       0 1 2 3 4 5 6 7 8 9
//                       (new line) ! ? # * ( ) - _ = + : " , . /
//<editor-fold defaultstate="collapsed" desc="Version 1.0">
var dictionary = {
    0   : "\u{200C}\u{FEFF}",
    1   : "\u{200C}\u{200E}",
    2   : "\u{200D}\u{FEFF}",
    3   : "\u{200D}\u{200E}",
    4   : "\u{2060}\u{FEFF}",
    5   : "\u{2060}\u{200E}",
    6   : "\u{00AD}\u{FEFF}",
    7   : "\u{00AD}\u{200E}",
    8   : "\u{FEFF}\u{200B}",
    9   : "\u{FEFF}\u{200C}",
    a   : "\u{200B}\u{200D}",
    b   : "\u{2060}\u{00AD}",
    c   : "\u{200D}\u{200D}",
    d   : "\u{200C}\u{00AD}",
    e   : "\u{200B}\u{200B}",
    f   : "\u{200D}\u{00AD}",
    g   : "\u{2060}\u{200D}",
    h   : "\u{200C}\u{200D}",
    i   : "\u{200B}\u{2060}",
    j   : "\u{00AD}\u{2060}",
    k   : "\u{00AD}\u{200C}",
    l   : "\u{200D}\u{200B}",
    m   : "\u{200D}\u{2060}",
    n   : "\u{200B}\u{00AD}",
    o   : "\u{200C}\u{200B}",
    p   : "\u{2060}\u{2060}",
    q   : "\u{00AD}\u{200D}",
    r   : "\u{200C}\u{2060}",
    s   : "\u{200C}\u{200C}",
    t   : "\u{200B}\u{200C}",
    u   : "\u{200D}\u{200C}",
    v   : "\u{00AD}\u{200B}",
    w   : "\u{2060}\u{200B}",
    x   : "\u{200B}\u{FEFF}",
    y   : "\u{2060}\u{200C}",
    z   : "\u{200B}\u{200E}",
    _   : "\u{200E}\u{200C}",
    " " : "\u{00AD}\u{00AD}",
    "\n": "\u{FEFF}\u{200D}",
    "," : "\u{FEFF}\u{2060}",
    "." : "\u{FEFF}\u{00AD}",
    "-" : "\u{FEFF}\u{FEFF}",
    '"' : "\u{FEFF}\u{200E}",
    "(" : "\u{200E}\u{200B}",
    "+" : "\u{200E}\u{200D}",
    "=" : "\u{200E}\u{2060}",
    "/" : "\u{200E}\u{00AD}",
    "?" : "\u{200E}\u{FEFF}",
    "!" : "\u{200E}\u{200E}"
};

function encodeV1_0(sec)
{
    var kilo = "";
    for (var i = 0; i < sec.length; i++)
    {
        var itWasUpperCase = false;
        if (sec.charAt(i) == sec.charAt(i).toLowerCase())
        {
            itWasUpperCase = false;
        }
        else
        {
            itWasUpperCase = true;
        }
        if (dictionary[sec.charAt(i).toLowerCase()] !== undefined)
        {
            if (itWasUpperCase)
            {
                kilo += "\u{180E}";
            }
            kilo += dictionary[sec.charAt(i).toLowerCase() // Spacial characters
                ];
        }
        else if (sec.charAt(i) === "#")
        {
            kilo += "\u{200E}\u{200B}\u{200E}\u{200D}";
        }
        else if (sec.charAt(i) === ")")
        {
            kilo += "\u{200E}\u{200B}\u{FEFF}\u{200D}";
        }
        else if (sec.charAt(i) === ":")
        {
            kilo += "\u{200E}\u{200B}\u{FEFF}\u{00AD}";
        }
        else if (sec.charAt(i) === "*")
        {
            kilo += "\u{200E}\u{200B}\u{200E}\u{00AD}";
        }
    }
    return kilo;
}

function decodeV1_0(text)
{
    var theKilo = "";
    var stripped = text.replace(/[^\u200B\u200C\u200D\u2060\u00AD\uFEFF\u200E\u180E]/g, "");
    var kilo = "";
    var reverseDictionary = Object.values(dictionary);
    var CorresKeys = Object.keys(dictionary);
    for (var i = 0; i < stripped.length; i += 2)
    {
        var wasUpperCase = false;
        if (stripped.charAt(i) === "\u{180E}")
        {
            wasUpperCase = true;
            i++;
        }
        for (var k = 0; k < 50; k++)
        {
            if (stripped.substring(i, i + 2) === reverseDictionary[k])
            {
                theKilo = CorresKeys[k];
                if (wasUpperCase)
                {
                    theKilo = theKilo.toUpperCase();
                }
                kilo += theKilo;
                break;
            }
            else if (stripped.substring(i, i + 2) === "\u{200E}\u{200B}")
            {
                if (stripped.substring(i + 2, i + 4) === "\u{200E}\u{200D}")
                {
                    kilo += "#";
                    i += 2;
                    break;
                }
                else if (stripped.substring(i + 2, i + 4) === "\u{FEFF}\u{200D}")
                {
                    kilo += ")";
                    i += 2;
                    break;
                }
                else if (stripped.substring(i + 2, i + 4) === "\u{200E}\u{00AD}")
                {
                    kilo += "*";
                    i += 2;
                    break;
                }
                else if (stripped.substring(i + 2, i + 4) === "\u{FEFF}\u{00AD}")
                {
                    kilo += ":";
                    i += 2;
                    break;
                }
                else
                {
                    kilo += "(";
                }
                break;
            }
        }
    }
    return kilo;
}

// ==============================================================================
//</editor-fold>

// ------------------------------------------------------------------------------
// Version limited twiT    Compatible with Twitter & etc
// Building blocks:         200B 200C 200D 180E 2060 00AD
// Banned blocks:           FEFF 200E
// Supported characters:    (space) a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9
//<editor-fold defaultstate="collapsed" desc="twiT">
var dictionaryV2_0 = {
    0: "\u{200C}\u{180E}",
    1: "\u{180E}\u{2060}",
    2: "\u{200D}\u{180E}",
    3: "\u{180E}\u{00AD}",
    4: "\u{2060}\u{180E}",
    5: "\u{180E}\u{180E}",
    6: "\u{00AD}\u{180E}",
    8: "\u{180E}\u{200B}",
    9: "\u{180E}\u{200C}",
    a: "\u{200B}\u{200D}",
    b: "\u{2060}\u{00AD}",
    c: "\u{200D}\u{200D}",
    d: "\u{200C}\u{00AD}",
    e: "\u{200B}\u{200B}",
    f: "\u{200D}\u{00AD}",
    g: "\u{2060}\u{200D}",
    h: "\u{200C}\u{200D}",
    i: "\u{200B}\u{2060}",
    j: "\u{00AD}\u{2060}",
    k: "\u{00AD}\u{200C}",
    l: "\u{200D}\u{200B}",
    m: "\u{200D}\u{2060}",
    n: "\u{200B}\u{00AD}",
    o: "\u{200C}\u{200B}",
    p: "\u{2060}\u{2060}",
    q: "\u{00AD}\u{200D}",
    r: "\u{200C}\u{2060}",
    s: "\u{200C}\u{200C}",
    t: "\u{200B}\u{200C}",
    u: "\u{200D}\u{200C}",
    v: "\u{00AD}\u{200B}",
    w: "\u{2060}\u{200B}",
    x: "\u{200B}\u{180E}",
    y: "\u{2060}\u{200C}"
};

function encodeVtwiT(sec)
{
    var kilo = "";
    sec = sec.toLowerCase();
    for (var i = 0; i < sec.length; i++)
    {
        if (dictionaryV2_0[sec.charAt(i)] !== undefined)
        {
            kilo += dictionaryV2_0[sec.charAt(i)];
        }
        else if (sec.charAt(i) === " ")
        {
            kilo += "\u{00AD}\u{00AD}";
        }
        else if (sec.charAt(i) == 7)
        {
            kilo += "\u{180E}\u{200D}\u{00AD}\u{00AD}\u{180E}\u{200D}";
        }
        else if (sec.charAt(i) === "z")
        {
            kilo += "\u{180E}\u{200D}";
        }
    }
    return kilo;
}

function decodeVtwiT(text)
{
    var stripped = text.replace(/[^\u200B\u200C\u200D\u2060\u00AD\u180E]/g, "");
    var kilo = "";
    var reverseDictionary = Object.values(dictionaryV2_0);
    var CorresKeys = Object.keys(dictionaryV2_0);
    for (var i = 0; i < stripped.length; i += 2)
    {
        for (var k = 0; k < 36; k++)
        {
            if (stripped.substring(i, i + 2) === reverseDictionary[k])
            {
                kilo += CorresKeys[k];
                break;
            }
            else if (stripped.substring(i, i + 2) === "\u{00AD}\u{00AD}")
            {
                kilo += " ";
                break;
            }
            else if (stripped.substring(i, i + 2) === "\u{180E}\u{200D}")
            {
                if (stripped.substring(i + 2, i + 6) === "\u{00AD}\u{00AD}\u{180E}\u{200D}")
                {
                    kilo += "7";
                    i += 4;
                    break;
                }
                else
                {
                    kilo += "z";
                    break;
                }
            }
        }
    }
    return kilo;
}

// ==============================================================================
//  end of version limited twiT
// ==============================================================================
//</editor-fold>

// ------------------------------------------------------------------------------
// Version limtied proT     Compatible with ProtonMail & etc
// Building blocks:         200C 200D 180E 2060 00AD FEFF 200E
// Banned blocks:           200B
// Supported characters:    (newline) (space) a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9
//<editor-fold defaultstate="collapsed" desc="proT">
var dictionaryV2_1 = {
    0   : "\u{200C}\u{FEFF}",
    1   : "\u{200C}\u{200E}",
    2   : "\u{200D}\u{FEFF}",
    3   : "\u{200D}\u{200E}",
    4   : "\u{2060}\u{FEFF}",
    5   : "\u{2060}\u{200E}",
    6   : "\u{00AD}\u{FEFF}",
    7   : "\u{00AD}\u{200E}",
    8   : "\u{FEFF}\u{180E}",
    9   : "\u{FEFF}\u{200C}",
    a   : "\u{180E}\u{200D}",
    b   : "\u{2060}\u{00AD}",
    c   : "\u{200D}\u{200D}",
    d   : "\u{200C}\u{00AD}",
    e   : "\u{180E}\u{180E}",
    f   : "\u{200D}\u{00AD}",
    g   : "\u{2060}\u{200D}",
    h   : "\u{200C}\u{200D}",
    i   : "\u{180E}\u{2060}",
    j   : "\u{00AD}\u{2060}",
    k   : "\u{00AD}\u{200C}",
    l   : "\u{200D}\u{180E}",
    m   : "\u{200D}\u{2060}",
    n   : "\u{180E}\u{00AD}",
    o   : "\u{200C}\u{180E}",
    p   : "\u{2060}\u{2060}",
    q   : "\u{00AD}\u{200D}",
    r   : "\u{200C}\u{2060}",
    s   : "\u{200C}\u{200C}",
    t   : "\u{180E}\u{200C}",
    u   : "\u{200D}\u{200C}",
    v   : "\u{00AD}\u{180E}",
    w   : "\u{2060}\u{180E}",
    x   : "\u{180E}\u{FEFF}",
    y   : "\u{2060}\u{200C}",
    z   : "\u{180E}\u{200E}",
    _   : "\u{200E}\u{200C}",
    " " : "\u{00AD}\u{00AD}",
    "\n": "\u{FEFF}\u{200D}",
    "," : "\u{FEFF}\u{2060}",
    "." : "\u{FEFF}\u{00AD}",
    "-" : "\u{FEFF}\u{FEFF}",
    '"' : "\u{FEFF}\u{200E}",
    "(" : "\u{200E}\u{180E}",
    ")" : "\u{200E}\u{200D}",
    "=" : "\u{200E}\u{2060}",
    "/" : "\u{200E}\u{00AD}",
    "?" : "\u{200E}\u{FEFF}",
    "!" : "\u{200E}\u{200E}"
};

function encodeVproT(sec)
{
    var kilo = "";
    sec = sec.toLowerCase();
    for (var i = 0; i < sec.length; i++)
    {
        if (dictionaryV2_1[sec.charAt(i)] !== undefined)
        {
            kilo += dictionaryV2_1[sec.charAt(i)];
        }
    }
    return kilo;
}

function decodeVproT(text)
{
    var stripped = text.replace(/[^\u200C\u200D\u2060\u00AD\u180E\uFEFF\u200E]/g, "");
    var kilo = "";
    var reverseDictionary = Object.values(dictionaryV2_1);
    var CorresKeys = Object.keys(dictionaryV2_1);
    for (var i = 0; i < stripped.length; i += 2)
    {
        for (var k = 0; k < 50; k++)
        {
            if (stripped.substring(i, i + 2) === reverseDictionary[k])
            {
                kilo += CorresKeys[k];
                break;
            }
        }
    }
    return kilo;
}

// ==============================================================================
//  end of version limited proT
// ==============================================================================
//</editor-fold>

// ------------------------------------------------------------------------------
// Version limited winT     Compatible with the windows text documents .txt
// Building blocks:         200B FEFF 200C 200D 180E 200E  | FEFF 200E
// Banned blocks:           2060 00AD
// Supported characters:    (space) a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9
//<editor-fold defaultstate="collapsed" desc="winT">
var dictionaryV2_3 = {
    0: "\u{200C}\u{180E}",
    1: "\u{180E}\u{FEFF}",
    2: "\u{200D}\u{180E}",
    3: "\u{180E}\u{200E}",
    4: "\u{FEFF}\u{180E}",
    5: "\u{180E}\u{180E}",
    6: "\u{200E}\u{180E}",
    8: "\u{180E}\u{200B}",
    9: "\u{180E}\u{200C}",
    a: "\u{200B}\u{200D}",
    b: "\u{FEFF}\u{200E}",
    c: "\u{200D}\u{200D}",
    d: "\u{200C}\u{200E}",
    e: "\u{200B}\u{200B}",
    f: "\u{200D}\u{200E}",
    g: "\u{FEFF}\u{200D}",
    h: "\u{200C}\u{200D}",
    i: "\u{200B}\u{FEFF}",
    j: "\u{200E}\u{FEFF}",
    k: "\u{200E}\u{200C}",
    l: "\u{200D}\u{200B}",
    m: "\u{200D}\u{FEFF}",
    n: "\u{200B}\u{200E}",
    o: "\u{200C}\u{200B}",
    p: "\u{FEFF}\u{FEFF}",
    q: "\u{200E}\u{200D}",
    r: "\u{200C}\u{FEFF}",
    s: "\u{200C}\u{200C}",
    t: "\u{200B}\u{200C}",
    u: "\u{200D}\u{200C}",
    v: "\u{200E}\u{200B}",
    w: "\u{FEFF}\u{200B}",
    x: "\u{200B}\u{180E}",
    y: "\u{FEFF}\u{200C}"
};

function encodeVwinT(sec)
{
    var kilo = "";
    sec = sec.toLowerCase();
    for (var i = 0; i < sec.length; i++)
    {
        if (dictionaryV2_3[sec.charAt(i)] !== undefined)
        {
            kilo += dictionaryV2_3[sec.charAt(i)];
        }
        else if (sec.charAt(i) === " ")
        {
            kilo += "\u{200E}\u{200E}";
        }
        else if (sec.charAt(i) === "\n")
        {
            kilo += "\u{200E}\u{200E}";
        }
        else if (sec.charAt(i) == 7)
        {
            kilo += "\u{180E}\u{200D}\u{200E}\u{200E}\u{180E}\u{200D}";
        }
        else if (sec.charAt(i) === "z")
        {
            kilo += "\u{180E}\u{200D}";
        }
    }
    return kilo;
}

function decodeVwinT(text)
{
    var stripped = text.replace(/[^\u200B\u200C\u200D\uFEFF\u200E\u180E]/g, "");
    var kilo = "";
    var reverseDictionary = Object.values(dictionaryV2_3);
    var CorresKeys = Object.keys(dictionaryV2_3);
    for (var i = 0; i < stripped.length; i += 2)
    {
        for (var k = 0; k < 36; k++)
        {
            if (stripped.substring(i, i + 2) === reverseDictionary[k])
            {
                kilo += CorresKeys[k];
                break;
            }
            else if (stripped.substring(i, i + 2) === "\u{200E}\u{200E}")
            {
                kilo += " ";
                break;
            }
            else if (stripped.substring(i, i + 2) === "\u{180E}\u{200D}")
            {
                if (stripped.substring(i + 2, i + 6) === "\u{200E}\u{200E}\u{180E}\u{200D}")
                {
                    kilo += "7";
                    i += 4;
                    break;
                }
                else
                {
                    kilo += "z";
                    break;
                }
            }
        }
    }
    return kilo;
}

// ==============================================================================
//  end of version 2.3
// ==============================================================================
//</editor-fold>

// https://soundcloud.com/crystal-castles/pino-placentile-wooden-girl
