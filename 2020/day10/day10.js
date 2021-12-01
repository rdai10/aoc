const readFile = require('../../helper.js');

const input = readFile()
  .split('\n')
  .map((rating) => parseInt(rating))
  .sort((a, b) => a - b);

function getJoltageDistribution() {
  const joltageDistribution = new Map();

  for (let i = 0; i <= input.length; i++) {
    let difference = 0;

    if (i === 0) {
      difference = input[i];
    } else if (i === input.length) {
      difference = 3;
    } else {
      difference = input[i] - input[i - 1];
    }

    difference = difference.toString();

    if (joltageDistribution.has(difference)) {
      const count = joltageDistribution.get(difference);

      joltageDistribution.set(difference, count + 1);
    } else {
      joltageDistribution.set(difference, 1);
    }
  }

  return joltageDistribution;
}

function part1() {
  const joltageDistribution = getJoltageDistribution();

  return joltageDistribution.get('1') * joltageDistribution.get('3');
}

console.log('Part 1: ', part1());
