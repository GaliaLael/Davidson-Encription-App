// global variables
const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const capitals = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// main function - applies substitution cipher to text
const substitution = () => {
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const capitals = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  // message to encript
  const input = document.getElementById("text-input").value;
  const cipherKey = document.getElementById("key").value.split("");

  const length = input.length;
  let output = "";

  // iterate over message
  for (i = 0; i < length; i++) {
    letter = input.charAt(i);
    let capital = false;

    // letter is not English -> don't change
    if (!alphabet.includes(letter) && !capitals.includes(letter)) {
      output = output.concat(letter);
    } else {
      // apply cipher key to letter
      if (capitals.includes(letter)) {
        capital = true;
      }
      letterIndex = capital
        ? capitals.indexOf(letter)
        : alphabet.indexOf(letter);
      // change to capitals by using ascii table differenct
      let newLetter = capital
        ? String.fromCharCode(cipherKey[letterIndex].charCodeAt(0) - 32)
        : cipherKey[letterIndex];
      output = output.concat(newLetter);
    }
  }

  document.getElementById("encripted").innerHTML = output;
};

// key must consist of 22 unique letters
const encriptKeyHandler = () => {
  const cipherKey = document.getElementById("key").value.split("");
  if (cipherKey.length !== 26) {
    alert("Key shoud consist of 26 unique letters");
  } else if (document.getElementById("text-input").value === "") {
    alert("No message to encript!");
  } else {
    substitution();
  }
};

// handles the shuffle key button
const shuffleHandler = () => {
  document.getElementById("error").innerHTML = "";
  var currentIndex = 26,
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

// checks for double letters and non-English letters
const keyValidationCheck = () => {
  document.getElementById("key").classList.remove("error-border");
  document.getElementById("error").innerHTML = "";
  const input = document.getElementById("key");
  let passed = true;
  input.addEventListener("input", (e) => {
    let key = e.target.value.split("");

    let seen = {};
    for (i = 0; i < key.length; i++) {
      // check if letter is English
      if (
        !alphabet.includes(key[key.length - 1]) &&
        !capitals.includes(key(key.length - 1))
      ) {
        document.getElementById("key").classList.add("error-border");
        document.getElementById("error").classList.add("error-style");
        document.getElementById("error").innerHTML =
          "Only English letters allowed!";
        passed = false;
      }
      // check input for duplicates
      if (seen[key[i]]) {
        document.getElementById("error").classList.add("error-style");
        document.getElementById("error").innerHTML =
          "letter has already been chosen";
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
