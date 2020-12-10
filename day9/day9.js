const { start } = require('repl');
const readFile = require('../helper.js');

const input = readFile().split('\n');

const PREAMBLE_START_INDEX = 0;
const PREAMBLE_END_INDEX = 24;
const NUM_START_INDEX = 25;

function validateNumber(preambleStart, preambleEnd, numStart) {
  const startingNumber = input[numStart];
  const sumMapping = new Map();

  for (let i = preambleStart; i <= preambleEnd; i++) {
    sumMapping.set((startingNumber - input[i]).toString(), input[i]);
  }

  const valid = input
    .slice(preambleStart, preambleEnd)
    .some((key) => sumMapping.has(key));

  if (valid) {
    preambleStart++;
    preambleEnd++;
    numStart++;

    return validateNumber(preambleStart, preambleEnd, numStart);
  } else {
    return numStart;
  }
}

function findInvalidNumberIndex() {
  let preambleStart = PREAMBLE_START_INDEX;
  let preambleEnd = PREAMBLE_END_INDEX;
  let numStart = NUM_START_INDEX;

  return validateNumber(preambleStart, preambleEnd, numStart);
}

function findContiguousIndices(startingIndex, sum) {
  let contiguousSum = parseInt(input[startingIndex]);
  let nextIndex = startingIndex;

  while (contiguousSum < sum) {
    nextIndex++;

    contiguousSum += parseInt(input[nextIndex]);
  }

  if (contiguousSum > sum) {
    startingIndex++;

    return findContiguousIndices(startingIndex, sum);
  } else {
    return { startingIndex, endIndex: nextIndex };
  }
}

function findContiguousNumbers() {
  const invalidNumber = parseInt(part1());

  const { startingIndex, endIndex } = findContiguousIndices(0, invalidNumber);

  const contiguousNumbers = [];

  for (let i = startingIndex; i <= endIndex; i++) {
    contiguousNumbers.push(input[i]);
  }

  return contiguousNumbers;
}

function part1() {
  const invalidIndex = findInvalidNumberIndex();

  return input[invalidIndex];
}

function part2() {
  const contiguousNumbers = findContiguousNumbers().sort();

  const smallest = contiguousNumbers[0];
  const largest = contiguousNumbers[contiguousNumbers.length - 1];

  return parseInt(smallest) + parseInt(largest);
}

console.log('Part 1: ', part1(), 'Part 2: ', part2());
