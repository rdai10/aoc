const readFile = require('../helper.js');

const input = readFile()
  .replace(/\n{1}/g, ' ')
  .split(/\s{2,}/)
  .map((passport) => {
    return processPassport(
      passport.split(' ').map((field) => field.split(':'))
    );
  });

function processPassport(matrix) {
  const passport = {};

  for (const [key, value] of matrix) {
    passport[key] = value;
  }

  passport['fieldLength'] = matrix.length;

  return passport;
}

function part1() {
  return input.filter(
    (passport) =>
      passport.fieldLength === 8 ||
      (passport.fieldLength === 7 && !passport.cid)
  ).length;
}

console.log('Part 1: ', part1());
