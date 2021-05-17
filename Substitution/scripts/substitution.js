// global variables
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

// main function - applies substitution cipher to text
const substitution = () => {
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
  const shouldBeFinal = ["כ", "מ", "נ", "פ", "צ"];

  // message to encript
  const input = document.getElementById("text-input").value;
  const cipherKey = document.getElementById("key").value.split("");

  const length = input.length;
  let output = "";

  // iterate over message
  for (i = 0; i < length; i++) {
    letter = input.charAt(i);

    // letter is not Hebrew -> don't change
    if (!(alphabet.includes(letter) || finalLetters.includes(letter))) {
      output = output.concat(letter);
    } else {
      // convert final letters to regular letters
      let letterIndex = finalLetters.indexOf(letter);
      if (letterIndex !== -1) {
        // change ascii
        letter = String.fromCharCode(
          finalLetters[letterIndex].charCodeAt(0) + 1
        );
      }
      // apply cipher key to letter
      letterIndex = alphabet.indexOf(letter);
      let newLetter = cipherKey[letterIndex];
      output = output.concat(newLetter);
    }
  }

  // ************ DEAL WITH FINAL LETTERS ********************
  // last letter of input
  const last = output.charAt(output.length - 1);
  if (shouldBeFinal.includes(last)) {
    newLetter = finalLetters[shouldBeFinal.indexOf(last)];
    output = output.substring(0, output.length - 1).concat(newLetter);
  }
  // iterate over rest of output and replace final letters
  for (i = length - 1; i > 0; i--) {
    // letter before a non-letter should be final
    if (
      !alphabet.includes(output.charAt(i)) &&
      !finalLetters.includes(output.charAt(i)) &&
      shouldBeFinal.includes(output.charAt(i - 1)) &&
      output.charAt(i) !== '"' &&
      output.charAt(i) !== "'"
    ) {
      newLetter = finalLetters[shouldBeFinal.indexOf(output.charAt(i - 1))];
      output = output.substring(0, i - 1) + newLetter + output.substring(i);
    }
  }

  document.getElementById("encripted").innerHTML = output;
};

// key must consist of 22 unique letters
const encriptKeyHandler = () => {
  const cipherKey = document.getElementById("key").value.split("");
  if (cipherKey.length !== 22) {
    alert("המפתח צריך להכיל 22 אותיות שונות");
  } else if (document.getElementById("text-input").value === "") {
    alert("אין הודעה להצפין");
  } else {
    substitution();
  }
};

// handles the shuffle key button
const shuffleHandler = () => {
  document.getElementById("error").innerHTML = "";
  var currentIndex = 22,
    temp,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temp = alphabet[currentIndex];
    alphabet[currentIndex] = alphabet[randomIndex];
    alphabet[randomIndex] = temp;

    const cipherKey = alphabet.join("");

    document.getElementById("key").value = cipherKey;
  }

  document.getElementById("key").innerHTML = alphabet;
  substitution();
};

// resets all fields of form
const resetHandler = () => {
  document.getElementById("encripted").innerHTML = "";
  document.getElementById("error").innerHTML = "";
};

// checks for double letters and non-Hebrew letters
const keyValidationCheck = () => {
  document.getElementById("key").classList.remove("error-border");
  document.getElementById("error").innerHTML = "";
  const input = document.getElementById("key");
  let passed = true;
  input.addEventListener("input", (e) => {
    let key = e.target.value.split("");

    let seen = {};
    for (i = 0; i < key.length; i++) {
      // check if letter is Hebrew
      if (!alphabet.includes(key[key.length - 1])) {
        document.getElementById("error").classList.add("error-style");
        document.getElementById("error").removeAttribute("hidden");
        document.getElementById("error").innerHTML = "רק אותיות בעברית";
        passed = false;
      }
      // check input for duplicates
      if (seen[key[i]]) {
        document.getElementById("error").classList.add("error-style");
        document.getElementById("error").removeAttribute("hidden");
        document.getElementById("error").innerHTML = "אות זו כבר נבחרה";
        passed = false;
      }
      seen[key[i]] = true;
    }
  });
  return passed;
};

// copy encripted message to clipboard
const copyTextHandler = () => {
  let copyText = document.getElementById("encripted");

  /* select the text field */
  copyText.select();
  /* for mobile devices*/
  copyText.setSelectionRange(0, 99999);

  document.execCommand("copy");
};
