const readFile = require('../helper.js');

const input = readFile()
  .replace(/\n{1}/g, ' ')
  .split(/\s{2,}/)
  .map((group) => {
    const answerSet = new Set();

    group
      .replace(/\s/g, '')
      .split('')
      .forEach((answer) => answerSet.add(answer));

    return answerSet;
  });

function part1() {
  return input.reduce((acc, answerSet) => {
    return acc + answerSet.size;
  }, 0);
}

console.log('Part 1: ', part1());
