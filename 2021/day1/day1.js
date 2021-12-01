const readFile = require('../../helper');

const report = readFile().split('\n').map(Number);

function part1(input) {
	let count = 0;

	input.forEach((scan, index) => {
		if (index > 0 && scan > input[index - 1]) {
			count++;
		}
	});

	return count;
}

function part2(input) {
	const slidingWindow = input
		.map((_, index) => {
			if (index < input.length - (input.length % 3)) {
				return input.slice(index, index + 3);
			}

			return [];
		})
		.filter((item) => item.length === 3)
		.map((item) => {
			const [first, second, third] = item;

			return first + second + third;
		});

	return part1(slidingWindow);
}

console.log('Part 1: ', part1(report), 'Part 2: ', part2(report));
