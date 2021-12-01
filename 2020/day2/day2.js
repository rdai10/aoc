const readFile = require('../../helper.js');

const input = readFile().split('\n');

function generateCaptureGroups(password) {
  const regex = /(?<lowerBound>\d+)-(?<upperBound>\d+)\s+(?<policyLetter>[a-z]):\s+(?<password>\w*)/;

  return password.match(regex).groups;
}

function validatePasswordByOccurance(password) {
  const captureGroups = generateCaptureGroups(password);

  const actualOccurance = captureGroups.password
    .split('')
    .filter((char) => char === captureGroups.policyLetter).length;

  return (
    captureGroups.lowerBound <= actualOccurance &&
    actualOccurance <= captureGroups.upperBound
  );
}

function validatePasswordByPosition(password) {
  const captureGroups = generateCaptureGroups(password);

  const firstPosition = captureGroups.password[captureGroups.lowerBound - 1];
  const secondPosition = captureGroups.password[captureGroups.upperBound - 1];

  return (
    firstPosition !== secondPosition &&
    (firstPosition === captureGroups.policyLetter ||
      secondPosition === captureGroups.policyLetter)
  );
}

function part1() {
  return input.filter((password) => validatePasswordByOccurance(password))
    .length;
}

function part2() {
  return input.filter((password) => validatePasswordByPosition(password))
    .length;
}

console.log('Part 1: ', part1(), 'Part 2: ', part2());
