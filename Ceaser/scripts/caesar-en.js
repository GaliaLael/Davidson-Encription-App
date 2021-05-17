// main function - applies ceasar cipher to text
const caesar = () => {
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
  const keyNumber = parseInt(document.getElementById("key-number").value);

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

      let newLetter = capital
        ? capitals[(letterIndex + keyNumber) % 26]
        : alphabet[(letterIndex + keyNumber) % 26];
      output = output.concat(newLetter);
    }
  }

  document.getElementById("encripted").innerHTML = output;
};

// resets form
const resetHandler = () => {
  document.getElementById("encripted").innerHTML = "";
};

// handles the "+" key
const incrementHandler = () => {
  let number = document.getElementById("key-number").value;
  if (number >= 0 && number < 25) {
    document.getElementById("key-number").value++;
    caesar();
  }
};

// handles the "-" key
const decrementHandler = () => {
  let number = document.getElementById("key-number").value;
  if (number > 0 && number <= 25) {
    document.getElementById("key-number").value--;
    caesar();
  }
};

// execute main function on "Enter" key
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    if (!(e.target.value <= 25 && e.target.value >= 0)) {
      alert("Key shoud be between 0 and 25");
      e.target.value = 0;
    } else {
      caesar();
    }
  }
});

// copy encripted message to clipboard
const copyTextHandler = () => {
  let copyText = document.getElementById("encripted");

  /* select the text field */
  copyText.select();
  /* for mobile devices*/
  copyText.setSelectionRange(0, 99999);

  document.execCommand("copy");
};
