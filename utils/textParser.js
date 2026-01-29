// function parseCommand(text = "") {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/^\./, "");
// }

// module.exports = { parseCommand };


function parseInput(text = "") {
  const clean = text
    .toLowerCase()
    .trim()
    .replace(/^\./, "");

  const parts = clean.split(" ");
  return {
    command: parts[0],
    args: parts.slice(1) // array
  };
}

module.exports = { parseInput };
