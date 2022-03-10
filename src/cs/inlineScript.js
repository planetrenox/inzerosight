/*
https://github.com/PlanetRenox/in0sight
Contact: planetrenox@pm.me
*/
document.getElementById("zerosight-button").addEventListener("click", replace);
document.getElementById("zerosight-button-quit").addEventListener("click", quit);

function replace()
{
  var nodes = document.querySelectorAll("#zerosight-1p2-node, #zerosight-1p2-node-header");
  for (i = 0; i < nodes.length; i++)
  {
    var userText = deobfuscateV1_2(nodes[i].textContent);
    userText = userText.split(/\n/);
    nodes[i].textContent = userText[0];
    for (v = 1; v < userText.length; v++)
    {
      var para = document.createElement("p");
      var node = document.createTextNode(userText[v]);
      para.appendChild(node);
      nodes[i].appendChild(para);
    }
  }
  document.getElementById("zerosight-div").remove();
}

function quit()
{
  document.getElementById("zerosight-div").remove();
}
//———————————————————————————————————————————————————————————————————————————————————
// Everything below would be better understood in src/sight/sight-script for the first time
//———————————————————————————————————————————————————————————————————————————————————
function deobfuscateV1_2(text)
{
  var dictionaryV1_2root = {
    0: "\u{200C}\u{FEFF}",
    1: "\u{200C}\u{200E}",
    2: "\u{200D}\u{FEFF}",
    3: "\u{200D}\u{200E}",
    4: "\u{2060}\u{FEFF}",
    5: "\u{2060}\u{200E}",
    6: "\u{00AD}\u{FEFF}",
    7: "\u{00AD}\u{200E}",
    8: "\u{FEFF}\u{200B}",
    9: "\u{FEFF}\u{200C}",
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
    x: "\u{200B}\u{FEFF}",
    y: "\u{2060}\u{200C}",
    z: "\u{200B}\u{200E}",
    "'": "\u{200E}\u{200C}",
    " ": "\u{180E}", // Stays the same across all dictionaries
    ",": "\u{FEFF}\u{2060}", // Stays the same across all dictionaries
    "\n": "\u{FEFF}\u{200D}", // Stays the same across all dictionaries
    ".": "\u{FEFF}\u{00AD}", // Stays the same across all dictionaries
    "-": "\u{FEFF}\u{FEFF}",
    '"': "\u{FEFF}\u{200E}",
    "+": "\u{200E}\u{200D}",
    "=": "\u{200E}\u{2060}",
    "/": "\u{200E}\u{00AD}",
    // "?": "\u{200E}\u{FEFF}", dedicated to switching between dictionaries
    "!": "\u{200E}\u{200E}",
    "?": "\u{200E}\u{200B}"
  };
  var dictionaryV1_2ru = {
    0: "\u{200C}\u{FEFF}",
    1: "\u{200C}\u{200E}",
    2: "\u{200D}\u{FEFF}",
    3: "\u{200D}\u{200E}",
    4: "\u{2060}\u{FEFF}",
    5: "\u{2060}\u{200E}",
    6: "\u{00AD}\u{FEFF}",
    7: "\u{00AD}\u{200E}",
    8: "\u{FEFF}\u{200B}",
    9: "\u{FEFF}\u{200C}",
    а: "\u{200B}\u{200D}",
    б: "\u{2060}\u{00AD}",
    в: "\u{200D}\u{200D}",
    г: "\u{200C}\u{00AD}",
    д: "\u{200B}\u{200B}",
    е: "\u{200D}\u{00AD}",
    ж: "\u{2060}\u{200D}",
    з: "\u{200C}\u{200D}",
    и: "\u{200B}\u{2060}",
    й: "\u{00AD}\u{2060}",
    к: "\u{00AD}\u{200C}",
    л: "\u{200D}\u{200B}",
    м: "\u{200D}\u{2060}",
    н: "\u{200B}\u{00AD}",
    о: "\u{200C}\u{200B}",
    п: "\u{2060}\u{2060}",
    р: "\u{00AD}\u{200D}",
    с: "\u{200C}\u{2060}",
    т: "\u{200C}\u{200C}",
    у: "\u{200B}\u{200C}",
    ф: "\u{200D}\u{200C}",
    х: "\u{00AD}\u{200B}",
    ц: "\u{2060}\u{200B}",
    ч: "\u{200B}\u{FEFF}",
    ш: "\u{2060}\u{200C}",
    щ: "\u{200B}\u{200E}",
    ъ: "\u{FEFF}\u{FEFF}",
    ы: "\u{FEFF}\u{200E}",
    ь: "\u{200E}\u{200D}",
    э: "\u{200E}\u{2060}",
    ю: "\u{200E}\u{00AD}",
    //я: "\u{200E}\u{FEFF}", dedicated to switching between dictionaries
    я: "\u{200E}\u{200E}",
    ё: "\u{200E}\u{200B}",
    "\n": "\u{FEFF}\u{200D}",
    ".": "\u{FEFF}\u{00AD}",
    ",": "\u{FEFF}\u{2060}",
    //")": "\u{200E}\u{200C}",
    " ": "\u{180E}"
  };
  var dictionaryV1_2sc = {
    0: "\u{200C}\u{FEFF}",
    1: "\u{200C}\u{200E}",
    2: "\u{200D}\u{FEFF}",
    3: "\u{200D}\u{200E}",
    4: "\u{2060}\u{FEFF}",
    5: "\u{2060}\u{200E}",
    6: "\u{00AD}\u{FEFF}",
    7: "\u{00AD}\u{200E}",
    8: "\u{FEFF}\u{200B}",
    9: "\u{FEFF}\u{200C}",
    ":": "\u{200B}\u{200D}",
    "*": "\u{2060}\u{00AD}",
    "(": "\u{200D}\u{200D}",
    ")": "\u{200C}\u{00AD}",
    "_": "\u{200B}\u{200B}",
    "#": "\u{200D}\u{00AD}",
    "&": "\u{2060}\u{200D}",
    "^": "\u{200C}\u{200D}",
    "%": "\u{200B}\u{2060}",
    "$": "\u{00AD}\u{2060}",
    "@": "\u{00AD}\u{200C}",
    "`": "\u{200D}\u{200B}",
    "~": "\u{200D}\u{2060}",
    "\\": "\u{200B}\u{00AD}",
    ">": "\u{200C}\u{200B}",
    "<": "\u{2060}\u{2060}",
    "]": "\u{00AD}\u{200D}",
    "[": "\u{200C}\u{2060}",
    "}": "\u{200C}\u{200C}",
    "{": "\u{200B}\u{200C}",
    "Ø": "\u{200D}\u{200C}",
    "—": "\u{00AD}\u{200B}",
    ñ: "\u{2060}\u{200B}",
    à: "\u{200B}\u{FEFF}",
    è: "\u{2060}\u{200C}",
    é: "\u{200B}\u{200E}",
    ì: "\u{200E}\u{200C}",
    " ": "\u{180E}", // Stays the same across all dictionaries
    ",": "\u{FEFF}\u{2060}", // Stays the same across all dictionaries
    "\n": "\u{FEFF}\u{200D}", // Stays the same across all dictionaries
    ".": "\u{FEFF}\u{00AD}", // Stays the same across all dictionaries
    í: "\u{FEFF}\u{FEFF}",
    ò: "\u{FEFF}\u{200E}",
    ó: "\u{200E}\u{200D}",
    ù: "\u{200E}\u{2060}",
    "$": "\u{200E}\u{00AD}",
    // "?": "\u{200E}\u{FEFF}", dedicated to switching between dictionaries
    "œ": "\u{200E}\u{200E}",
    "æ": "\u{200E}\u{200B}"
  };
  var dictionaryV1_2jaHira = {
    0: "\u{200C}\u{FEFF}",
    1: "\u{200C}\u{200E}",
    2: "\u{200D}\u{FEFF}",
    3: "\u{200D}\u{200E}",
    4: "\u{2060}\u{FEFF}",
    5: "\u{2060}\u{200E}",
    6: "\u{00AD}\u{FEFF}",
    7: "\u{00AD}\u{200E}",
    8: "\u{FEFF}\u{200B}",
    9: "\u{FEFF}\u{200C}",
    ぁ: "\u{200B}\u{200D}",
    あ: "\u{2060}\u{00AD}",
    ぃ: "\u{200D}\u{200D}",
    い: "\u{200C}\u{00AD}",
    ぅ: "\u{200B}\u{200B}",
    う: "\u{200D}\u{00AD}",
    ぇ: "\u{2060}\u{200D}",
    え: "\u{200C}\u{200D}",
    ぉ: "\u{200B}\u{2060}",
    お: "\u{00AD}\u{2060}",
    か: "\u{00AD}\u{200C}",
    が: "\u{200D}\u{200B}",
    き: "\u{200D}\u{2060}",
    ぎ: "\u{200B}\u{00AD}",
    く: "\u{200C}\u{200B}",
    ぐ: "\u{2060}\u{2060}",
    け: "\u{00AD}\u{200D}",
    げ: "\u{200C}\u{2060}",
    こ: "\u{200C}\u{200C}",
    ご: "\u{200B}\u{200C}",
    さ: "\u{200D}\u{200C}",
    ざ: "\u{00AD}\u{200B}",
    し: "\u{2060}\u{200B}",
    じ: "\u{200B}\u{FEFF}",
    す: "\u{2060}\u{200C}",
    ず: "\u{200B}\u{200E}",
    せ: "\u{200E}\u{200C}",
    " ": "\u{180E}", // Stays the same across all dictionaries
    ",": "\u{FEFF}\u{2060}", // Stays the same across all dictionaries
    "\n": "\u{FEFF}\u{200D}", // Stays the same across all dictionaries
    ".": "\u{FEFF}\u{00AD}", // Stays the same across all dictionaries
    ぜ: "\u{FEFF}\u{FEFF}",
    そ: "\u{FEFF}\u{200E}",
    ぞ: "\u{200E}\u{200D}",
    た: "\u{200E}\u{2060}",
    だ: "\u{200E}\u{00AD}",
    // "?": "\u{200E}\u{FEFF}", dedicated to switching between dictionaries
    ち: "\u{200E}\u{200E}",
    ぢ: "\u{200E}\u{200B}"
  };
  var dictionaryV1_2jaHira2 = {
    0: "\u{200C}\u{FEFF}",
    1: "\u{200C}\u{200E}",
    2: "\u{200D}\u{FEFF}",
    3: "\u{200D}\u{200E}",
    4: "\u{2060}\u{FEFF}",
    5: "\u{2060}\u{200E}",
    6: "\u{00AD}\u{FEFF}",
    7: "\u{00AD}\u{200E}",
    8: "\u{FEFF}\u{200B}",
    9: "\u{FEFF}\u{200C}",
    っ: "\u{200B}\u{200D}",
    つ: "\u{2060}\u{00AD}",
    づ: "\u{200D}\u{200D}",
    て: "\u{200C}\u{00AD}",
    で: "\u{200B}\u{200B}",
    と: "\u{200D}\u{00AD}",
    ど: "\u{2060}\u{200D}",
    な: "\u{200C}\u{200D}",
    に: "\u{200B}\u{2060}",
    ぬ: "\u{00AD}\u{2060}",
    ね: "\u{00AD}\u{200C}",
    の: "\u{200D}\u{200B}",
    は: "\u{200D}\u{2060}",
    ぎ: "\u{200B}\u{00AD}",
    ば: "\u{200C}\u{200B}",
    ぱ: "\u{2060}\u{2060}",
    ひ: "\u{00AD}\u{200D}",
    び: "\u{200C}\u{2060}",
    ぴ: "\u{200C}\u{200C}",
    ご: "\u{200B}\u{200C}",
    ふ: "\u{200D}\u{200C}",
    ぶ: "\u{00AD}\u{200B}",
    ぷ: "\u{2060}\u{200B}",
    へ: "\u{200B}\u{FEFF}",
    べ: "\u{2060}\u{200C}",
    ぺ: "\u{200B}\u{200E}",
    ほ: "\u{200E}\u{200C}",
    " ": "\u{180E}", // Stays the same across all dictionaries
    ",": "\u{FEFF}\u{2060}", // Stays the same across all dictionaries
    "\n": "\u{FEFF}\u{200D}", // Stays the same across all dictionaries
    ".": "\u{FEFF}\u{00AD}", // Stays the same across all dictionaries
    ぼ: "\u{FEFF}\u{FEFF}",
    ぽ: "\u{FEFF}\u{200E}",
    ま: "\u{200E}\u{200D}",
    み: "\u{200E}\u{2060}",
    む: "\u{200E}\u{00AD}",
    // "?": "\u{200E}\u{FEFF}", dedicated to switching between dictionaries
    め: "\u{200E}\u{200E}",
    も: "\u{200E}\u{200B}"
  };
  var dictionaryV1_2jaHira3 = {
    0: "\u{200C}\u{FEFF}",
    1: "\u{200C}\u{200E}",
    2: "\u{200D}\u{FEFF}",
    3: "\u{200D}\u{200E}",
    4: "\u{2060}\u{FEFF}",
    5: "\u{2060}\u{200E}",
    6: "\u{00AD}\u{FEFF}",
    7: "\u{00AD}\u{200E}",
    8: "\u{FEFF}\u{200B}",
    9: "\u{FEFF}\u{200C}",
    ゃ: "\u{200B}\u{200D}",
    や: "\u{2060}\u{00AD}",
    ゅ: "\u{200D}\u{200D}",
    ゆ: "\u{200C}\u{00AD}",
    ょ: "\u{200B}\u{200B}",
    よ: "\u{200D}\u{00AD}",
    ら: "\u{2060}\u{200D}",
    り: "\u{200C}\u{200D}",
    る: "\u{200B}\u{2060}",
    れ: "\u{00AD}\u{2060}",
    ろ: "\u{00AD}\u{200C}",
    ゎ: "\u{200D}\u{200B}",
    わ: "\u{200D}\u{2060}",
    ゐ: "\u{200B}\u{00AD}",
    ゑ: "\u{200C}\u{200B}",
    を: "\u{2060}\u{2060}",
    ん: "\u{00AD}\u{200D}",
    ゔ: "\u{200C}\u{2060}",
    ゕ: "\u{200C}\u{200C}",
    ゖ: "\u{200B}\u{200C}",
    "゙ ": "\u{200D}\u{200C}",
    " ": "\u{00AD}\u{200B}",
    "゛": "\u{2060}\u{200B}",
    "゜": "\u{200B}\u{FEFF}",
    ゝ: "\u{2060}\u{200C}",
    ゞ: "\u{200B}\u{200E}",
    ゟ: "\u{200E}\u{200C}",
    " ": "\u{180E}", // Stays the same across all dictionaries
    ",": "\u{FEFF}\u{2060}", // Stays the same across all dictionaries
    "\n": "\u{FEFF}\u{200D}", // Stays the same across all dictionaries
    ".": "\u{FEFF}\u{00AD}", // Stays the same across all dictionaries
    県: "\u{FEFF}\u{FEFF}",
    政: "\u{FEFF}\u{200E}",
    保: "\u{200E}\u{200D}",
    意: "\u{200E}\u{2060}",
    会: "\u{200E}\u{00AD}",
    // "?": "\u{200E}\u{FEFF}", dedicated to switching between dictionaries
    入: "\u{200E}\u{200E}",
    力: "\u{200E}\u{200B}"
  };
  var dictionaryV1_2izs = {
    0: "\u{200C}\u{FEFF}",
    1: "\u{200C}\u{200E}",
    2: "\u{200D}\u{FEFF}",
    3: "\u{200D}\u{200E}",
    4: "\u{2060}\u{FEFF}",
    5: "\u{2060}\u{200E}",
    6: "\u{00AD}\u{FEFF}",
    7: "\u{00AD}\u{200E}",
    8: "\u{FEFF}\u{200B}",
    9: "\u{FEFF}\u{200C}",
    '§': "\u{200B}\u{200D}",
    '£': "\u{2060}\u{00AD}",
    '€': "\u{200D}\u{200D}",
    '¥': "\u{200C}\u{00AD}",
    '©': "\u{200B}\u{200B}",
    '®': "\u{200D}\u{00AD}",
    '°': "\u{2060}\u{200D}",
    '¶': "\u{200C}\u{200D}",
    '\u{200C}': "\u{200B}\u{2060}",
    '\u{FEFF}': "\u{00AD}\u{2060}",
    '\u{200E}': "\u{00AD}\u{200C}",
    '\u{200D}': "\u{200D}\u{200B}",
    '\u{200B}': "\u{200D}\u{2060}",
    '\u{00AD}': "\u{200B}\u{00AD}",
    '\u{2060}': "\u{200C}\u{200B}",
    '\u{180E}': "\u{2060}\u{2060}"
    // ん: "\u{00AD}\u{200D}",
    // ゔ: "\u{200C}\u{2060}",
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
    // // "?": "\u{200E}\u{FEFF}", dedicated to switching between dictionaries
    // 入: "\u{200E}\u{200E}",
    // 力: "\u{200E}\u{200B}"
  };
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
