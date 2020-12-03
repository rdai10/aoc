const readFile = require('../helper.js');

const inputMatrix = readFile()
  .split('\n')
  .map((value) => value.split(''));

const rowLength = inputMatrix[0].length;

function part1() {
  let counter = 0;
  let x = 0;
  let y = 0;

  for (let row = 0; row < inputMatrix.length - 1; row++) {
    x += 3;
    y += 1;

    if (inputMatrix[y][x % rowLength] === '#') {
      counter++;
    }
  }

  return counter;
}

console.log('Part 1: ', part1());
