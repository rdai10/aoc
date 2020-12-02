const readFile = require('../helper.js');

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
  let totalProduct = '';

  input.forEach((value) => {
    const product = getComplementProduct(2020 - value);

    if (!isNaN(product)) {
      totalProduct = product * parseInt(value);
    }
  });

  return totalProduct;
}

console.log('Part 1: ', part1(), 'Part 2: ', part2());
