const readFile = require('../../helper');

const _ = require('lodash');

const report = readFile()
	.split('\n')
	.map((row) => Array.from(row));

function convertTODecimal(binary) {
	return parseInt(binary, 2);
}

function findMostAndLeastBits(matrix) {
	const most = [];
	const least = [];

	_.unzip(matrix).forEach((row) => {
		const ones = row.filter((val) => val === '1').length;
		const zeroes = row.length - ones;

		if (ones > zeroes) {
			most.push(1);
			least.push(0);
		} else {
			most.push(0);
			least.push(1);
		}
	});

	return [most, least];
}

function filterOutBitValues(bitValue, matrix, filterForMost = true, index = 0) {
	const reportSubset = matrix.filter(
		(row) => Number(row[index]) === bitValue
	);

	if (reportSubset.length > 1) {
		const newIndex = index + 1;

		if (reportSubset.length === 2) {
			return filterOutBitValues(
				filterForMost ? 1 : 0,
				reportSubset,
				filterForMost,
				newIndex
			);
		} else {
			const [most, least] = findMostAndLeastBits(reportSubset);

			return filterOutBitValues(
				filterForMost ? most[newIndex] : least[newIndex],
				reportSubset,
				filterForMost,
				newIndex
			);
		}
	} else {
		return _.flatten(reportSubset);
	}
}

function part1() {
	const [gamma, epsilon] = findMostAndLeastBits(report);

	return (
		convertTODecimal(gamma.join('')) * convertTODecimal(epsilon.join(''))
	);
}

function part2() {
	const [most, least] = findMostAndLeastBits(report);

	const oxygenGeneratorRating = filterOutBitValues(most[0], report, true);
	const co2ScrubberRating = filterOutBitValues(least[0], report, false);

	return (
		convertTODecimal(oxygenGeneratorRating.join('')) *
		convertTODecimal(co2ScrubberRating.join(''))
	);
}

console.log('Part 1: ', part1(), 'Part 2: ', part2());
