const readFile = require('../helper.js');

const input = readFile().split('\n');

function part1() {
  const validPasswords = input.filter((password) => validatePassword(password));

  return validPasswords.length;
}

function validatePassword(password) {
  const regex = /(?<lowerBound>\d+)-(?<upperBound>\d+)\s+(?<policy>[a-z]):\s+(?<password>.*\w)/;

  const captureGroups = password.match(regex).groups;

  const actualOccurance = captureGroups.password
    .split('')
    .filter((char) => char === captureGroups.policy).length;

  return (
    captureGroups.lowerBound <= actualOccurance &&
    actualOccurance <= captureGroups.upperBound
  );
}

console.log('Part 1: ', part1());
