const readFile = require('../../helper');

const _ = require('lodash');

const report = readFile()
	.split('\n')
	.map((row) => Array.from(row));

function convertToDecimal(binary) {
	const decimal = parseInt(binary, 2);

	if (isNaN(decimal)) {
		throw new Error('Cannot convert to decimal');
	}

	return decimal;
}

function findMostAndLeastBits(matrix, filterForMost = true) {
	const most = [];
	const least = [];

	_.unzip(matrix).forEach((row, filterForMost = true) => {
		const ones = row.filter((val) => val === '1').length;
		const zeroes = row.length - ones;

		if (ones > zeroes) {
			most.push('1');
			least.push('0');
		} else if (ones === zeroes) {
			if (filterForMost) {
				most.push('1');
				least.push('0');
			} else {
				most.push('0');
				least.push('1');
			}
		} else {
			most.push('0');
			least.push('1');
		}
	});

	return [most, least];
}

function filterOutBitValues(bitValue, matrix, filterForMost = true, index = 0) {
	const reportSubset = matrix.filter((row) => row[index] === bitValue);

	if (reportSubset.length > 1) {
		const newIndex = index + 1;

		const [most, least] = findMostAndLeastBits(reportSubset, filterForMost);

		return filterOutBitValues(
			filterForMost ? most[newIndex] : least[newIndex],
			reportSubset,
			filterForMost,
			newIndex
		);
	} else {
		return _.flatten(reportSubset);
	}
}

function part1() {
	const [gamma, epsilon] = findMostAndLeastBits(report);

	return (
		convertToDecimal(gamma.join('')) * convertToDecimal(epsilon.join(''))
	);
}

function part2() {
	const [most, least] = findMostAndLeastBits(report);

	const oGeneratorRating = filterOutBitValues(most[0], report, true);
	const co2ScrubberRating = filterOutBitValues(least[0], report, false);

	return (
		convertToDecimal(oGeneratorRating.join('')) *
		convertToDecimal(co2ScrubberRating.join(''))
	);
}

console.log('Part 1: ', part1(), 'Part 2: ', part2());
