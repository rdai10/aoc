const readFile = require('../../helper');

const report = readFile().split('\n').map(Number);

function part1() {
	let count = 0;

	report.forEach((scan, index) => {
		if (index > 0 && scan > report[index - 1]) {
			count++;
		}
	});

	return count;
}

console.log('Part 1: ', part1());
