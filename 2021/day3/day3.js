const readFile = require('../../helper');

const _ = require('lodash');

const report = readFile()
	.split('\n')
	.map((row) => Array.from(row));

function convertTODecimal(binary) {
	return parseInt(binary, 2);
}

function part1() {
	const gamma = [];
	const epsilon = [];

	_.unzip(report).forEach((row) => {
		const ones = row.filter((val) => val === '1').length;
		const zeroes = row.length - ones;

		if (ones > zeroes) {
			gamma.push(1);
			epsilon.push(0);
		} else {
			gamma.push(0);
			epsilon.push(1);
		}
	});

	return (
		convertTODecimal(gamma.join('')) * convertTODecimal(epsilon.join(''))
	);
}

console.log('Part 1: ', part1());
