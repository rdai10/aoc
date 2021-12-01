const readFile = require('../../helper.js');

const BIRTH_YEAR_FIELD = 'byr';
const COUNTRY_ID_FIELD = 'cid';
const EXPIRATION_YR_FIELD = 'eyr';
const EYE_COLOR_FIELD = 'ecl';
const HAIR_COLOR_FIELD = 'hcl';
const HEIGHT_FIELD = 'hgt';
const ISSUE_YEAR_FIELD = 'iyr';
const PASSPORT_ID_FIELD = 'pid';

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

  return passport;
}

function getPassportsWithCompleteInformation() {
  return input.filter(
    (passport) =>
      passport[BIRTH_YEAR_FIELD] &&
      passport[EXPIRATION_YR_FIELD] &&
      passport[EYE_COLOR_FIELD] &&
      passport[HAIR_COLOR_FIELD] &&
      passport[HEIGHT_FIELD] &&
      passport[ISSUE_YEAR_FIELD] &&
      passport[PASSPORT_ID_FIELD]
  );
}

function validateFieldValue(name, value) {
  const intValue = parseInt(value);

  switch (name) {
    case BIRTH_YEAR_FIELD:
      return 1920 <= intValue && intValue <= 2002;
    case COUNTRY_ID_FIELD: 
      return true;
    case EXPIRATION_YR_FIELD:
      return 2020 <= intValue && intValue <= 2030;
    case EYE_COLOR_FIELD:
      return /^(amb|blu|brn|gry|grn|hzl|oth$)/.test(value);
    case HAIR_COLOR_FIELD:
      return /^#[a-f\d]{6}$/.test(value);
    case HEIGHT_FIELD:
      if (value.endsWith('cm')) {
        const heightInCM = parseInt(value.replace('cm', ''));

        return 150 <= heightInCM && heightInCM <= 193;
      } else if (value.endsWith('in')) {
        const heightInIN = parseInt(value.replace('in', ''));

        return 59 <= heightInIN && heightInIN <= 76;
      } else {
        return false;
      }
    case ISSUE_YEAR_FIELD:
      return 2010 <= intValue && intValue <= 2020;
    case PASSPORT_ID_FIELD:
      return /^\d{9}$/.test(value);
    default:
      return false;
  }
}

function part1() {
  return getPassportsWithCompleteInformation().length;
}

function part2() {
  const passportsWithCompleteInformation = getPassportsWithCompleteInformation();

  const validationResults = passportsWithCompleteInformation.map((entry) => {
    const fields = Object.entries(entry);

    return fields.every((field) => {
      const [key, value] = field;

      return validateFieldValue(key, value);
    });
  });

  return validationResults.filter((result) => result === true).length;
}

console.log('Part 1: ', part1(), 'Part 2: ', part2());
