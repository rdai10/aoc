const readFile = require('../../helper');

const _ = require('lodash');

const patterns = readFile()
	.split('\n')
	.map((pattern) => pattern.split(' | ').map((letter) => letter.split(' ')));

const displayCombo = {
	0: 'abcefg', // 6
	1: 'cf', // 2 ✔️
	2: 'acdeg', // 5
	3: 'acdfg', // 5
	4: 'bcdf', // 4 ✔️
	5: 'abdfg', // 5
	6: 'abdefg', // 6
	7: 'acf', // 3 ✔️
	8: 'abcdefg', // 7 ✔️
	9: 'abcdfg' // 6
};

function part1() {
	const outputValues = patterns.map(([_, output]) => output);

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

function decodeSignal(signal) {
	const mapping = {};

	const cf = signal.find((val) => val.length === 2).split('');
	const acf = signal.find((val) => val.length === 3).split('');
	const bcdf = signal.find((val) => val.length === 4).split('');

	// compare cf & acf, find a
	mapping['a'] = _.xor(cf, acf)[0];
	mapping['c'] = cf;
	mapping['f'] = cf;

	// compare cf and bcdf
	mapping['b'] = _.xor(cf, bcdf);
	mapping['d'] = _.xor(cf, bcdf);

	// compare acdeg, acdfg, and abdfg, find d, b and g
	const length5 = signal
		.filter((val) => val.length === 5)
		.map((item) => item.split(''));
	// merge unique values with acf
	const [[dg], length5Rest] = _.partition(
		length5.map((item) => _.xor(item, acf)),
		(val) => val.length === 2
	);

	mapping['d'] = _.intersection(dg, mapping['d'])[0];
	mapping['b'] = mapping['b'].filter((val) => val !== mapping['d'])[0];
	mapping['g'] = dg.filter((val) => val !== mapping['d'])[0];

	// merge unique values with bdg, find c, f
	const [[c], [efb]] = _.partition(
		length5Rest.map((item) =>
			_.xor(item, [mapping['b'], mapping['d'], mapping['g']])
		),
		(val) => val.length === 1
	);

	mapping['c'] = c[0];
	mapping['f'] = mapping['f'].filter((val) => val !== mapping['c'])[0];

	// find e
	mapping['e'] = efb.filter(
		(val) => val !== mapping['b'] && val !== mapping['f']
	)[0];

	return mapping;
}

function decodeOutput(output, mapping) {
	return output.map((val) =>
		val
			.split('')
			.map((char) => {
				for (const letter in mapping) {
					if (char === mapping[letter]) {
						return letter;
					}
				}
			})
			.sort()
	);
}

function part2() {
	const outputDigits = patterns.map(([signal, output]) => {
		const decodedOutput = decodeOutput(output, decodeSignal(signal));

		return decodedOutput
			.map((val) => {
				for (const number in displayCombo) {
					if (displayCombo[number] === val.join('')) {
						return number;
					}
				}
			})
			.join('');
	});

	return _.reduce(outputDigits.map(Number), (sum, n) => sum + n, 0);
}

console.log('Part 1: ', part1(), 'Part 2: ', part2());
