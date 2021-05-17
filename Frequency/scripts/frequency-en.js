const frequency = () => {
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

  // message to check
  const input = document.getElementById("text-input").value;
  document.getElementById("frequency-analysis").innerHTML = "";

  const length = input.length;
  let nonLetter = 0;
  let freq = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  };

  for (var i = 0; i < length; i++) {
    let letter = input.charAt(i);

    // ignore non-letter characters
    if (!alphabet.includes(letter) && !capitals.includes(letter)) {
      // count total of non-letters
      nonLetter++;
      continue;
    }
    // convert capitals to non-capitals
    if (capitals.includes(letter)) {
      letter = alphabet[capitals.indexOf(letter)];
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
  // no English letters
  if (nonLetter === length) {
    alert("This message does not contain English letters!");
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
