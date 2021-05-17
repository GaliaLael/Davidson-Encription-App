const frequency = () => {
  const alphabet = [
    "א",
    "ב",
    "ג",
    "ד",
    "ה",
    "ו",
    "ז",
    "ח",
    "ט",
    "י",
    "כ",
    "ל",
    "מ",
    "נ",
    "ס",
    "ע",
    "פ",
    "צ",
    "ק",
    "ר",
    "ש",
    "ת",
  ];
  const finalLetters = ["ך", "ם", "ן", "ף", "ץ"];
  const nonFinals = ["כ", "מ", "נ", "פ", "צ"];

  // message to check
  const input = document.getElementById("text-input").value;
  document.getElementById("frequency-analysis").innerHTML = "";

  const length = input.length;
  let nonLetter = 0;
  let freq = {
    א: 0,
    ב: 0,
    ג: 0,
    ד: 0,
    ה: 0,
    ו: 0,
    ז: 0,
    ח: 0,
    ט: 0,
    י: 0,
    כ: 0,
    ל: 0,
    מ: 0,
    נ: 0,
    ס: 0,
    ע: 0,
    פ: 0,
    צ: 0,
    ק: 0,
    ר: 0,
    ש: 0,
    ת: 0,
  };

  for (var i = 0; i < length; i++) {
    let letter = input.charAt(i);

    // ignore non-letter characters
    if (!alphabet.includes(letter) && !finalLetters.includes(letter)) {
      // count total of non-letters
      nonLetter++;
      continue;
    }
    // convert final letters to non-final letters
    if (finalLetters.includes(letter)) {
      letter = nonFinals[finalLetters.indexOf(letter)];
    }
    // add letter to count
    if (freq[letter]) {
      freq[letter]++;
    } else {
      freq[letter] = 1;
    }
  }

  // calculate and output percentage
  let output = "";
  // no Hebrew letters
  if (nonLetter === length) {
    alert("אין בהודעה אותיות בעברית!");
  } else {
    for (let p in freq) {
      let percentage = freq[p] * (100 / (length - nonLetter));
      // output += "\n" + p + ": " + percentage.toFixed(1);
      let node = document.createElement("div");
      let textnode = document.createTextNode(
        "\n" + p + ": " + percentage.toFixed(1)
      );
      node.appendChild(textnode);
      document.getElementById("frequency-analysis").appendChild(node);
    }
  }
};

// const resetHandler = () => {
//   document.getElementById("frequency-analysis").innerHTML = "";
// };
