const readFile = require('../../helper');

const input = readFile().split('\n');

function getComplementProduct(sum) {
  const dataMapping = new Map();

  input.forEach((value) => {
    dataMapping.set((sum - value).toString(), value);
  });

  const complement = input.find((key) => dataMapping.has(key));

  return complement * dataMapping.get(complement);
}

function part1() {
  return getComplementProduct(2020);
}

function part2() {
  for (value of input) {
    const product = getComplementProduct(2020 - value);

    if (!isNaN(product)) {
      return product * parseInt(value);
    }
  }
}

console.log('Part 1: ', part1(), 'Part 2: ', part2());
