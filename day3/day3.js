const readFile = require('../helper.js');

const inputMatrix = readFile()
  .split('\n')
  .map((value) => value.split(''));

const rowLength = inputMatrix[0].length;

function findStops(deltaX, deltaY) {
  let counter = 0;
  let x = 0;
  let y = 0;

  while (inputMatrix[y]) {
    if (inputMatrix[y][x % rowLength] === '#') {
      counter++;
    }

    x += deltaX;
    y += deltaY;
  }

  return counter;
}

function part1() {
  return findStops(3, 1);
}

function part2() {
  return (
    findStops(1, 1) *
    findStops(3, 1) *
    findStops(5, 1) *
    findStops(7, 1) *
    findStops(1, 2)
  );
}

console.log('Part 1: ', part1(), 'Part 2: ', part2());
