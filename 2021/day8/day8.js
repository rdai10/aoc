const readFile = require('../../helper');

const _ = require('lodash');

const patterns = readFile()
	.split('\n')
	.map((pattern) => pattern.split(' | ').map((letter) => letter.split(' ')));

const signals = patterns.map(([signals]) => signals);
const outputValues = patterns.map(([_, output]) => output);

const displayCombo = {
	0: ['a', 'b', 'c', 'e', 'f', 'g'], // 6
	1: ['c', 'f'], // 2 ✔️
	2: ['a', 'c', 'd', 'e', 'g'], // 5
	3: ['a', 'c', 'd', 'f', 'g'], // 5
	4: ['b', 'c', 'd', 'f'], // 4 ✔️
	5: ['a', 'b', 'd', 'f', 'g'], // 5
	6: ['a', 'b', 'd', 'e', 'f', 'g'], // 6
	7: ['a', 'c', 'f'], // 3 ✔️
	8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'], // 7 ✔️
	9: ['a', 'b', 'c', 'd', 'f', 'g'] // 6
};

function part1() {
	const uniqueSegments = _.flatten(
		outputValues.map((entry) =>
			entry.map((value) => {
				if (
					value.length === 2 ||
					value.length === 4 ||
					value.length === 3 ||
					value.length === 7
				) {
					return value;
				}

				return null;
			})
		)
	).filter((val) => val !== null);

	return uniqueSegments.length;
}

console.log('Part 1: ', part1());
