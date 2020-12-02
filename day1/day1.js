const readFile = require('../helper.js');

const input = readFile().split('\n');

function part1() {
  const entryPlaceholder = new Map();

  input.forEach((value) => {
    entryPlaceholder.set((2020 - value).toString(), value);
  });

  const entry1 = input.find((key) => entryPlaceholder.has(key));

  return entry1 * entryPlaceholder.get(entry1);
}

console.log('Part 1: ', part1());
