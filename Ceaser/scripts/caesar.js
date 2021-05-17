// main function - applies ceasar cipher to text
const caesar = () => {
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
  const keyNumber = parseInt(document.getElementById("key-number").value);

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
      letterIndex = alphabet.indexOf(letter);
      // shift letter by keyNumber places
      let newLetter = alphabet[(letterIndex + keyNumber) % 22];
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

// resets form
const resetHandler = () => {
  document.getElementById("encripted").innerHTML = "";
};

// handles the "+" key
const incrementHandler = () => {
  let number = document.getElementById("key-number").value;
  if (number >= 0 && number < 21) {
    document.getElementById("key-number").value++;
    caesar();
  }
};

// handles the "-" key
const decrementHandler = () => {
  let number = document.getElementById("key-number").value;
  if (number > 0 && number <= 21) {
    document.getElementById("key-number").value--;
    caesar();
  }
};

// execute main function on "Enter" key
document.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    if (!(e.target.value <= 21 && e.target.value >= 0)) {
      alert("המפתח יכול להיות רק מספר בין 0 ל-21");
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
