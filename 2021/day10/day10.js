const readFile = require('../../helper');

const _ = require('lodash');

const syntax = readFile()
	.split(/\n/)
	.map((item) => item.split(''));

const startingBrace = ['(', '[', '<', '{'];
const pointsTable = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137
};

function findClosingCharacter(char) {
	switch (char) {
		case '(':
			return ')';
		case '[':
			return ']';
		case '{':
			return '}';
		case '<':
			return '>';
		default:
			new Error('Invalid character!');
	}
}

function part1() {
	const stack = [];
	const corrupted = [];

	syntax.forEach((row) =>
		row.forEach((char) => {
			if (startingBrace.includes(char)) {
				stack.push(char);
			} else {
				if (findClosingCharacter(stack.pop()) !== char) {
					corrupted.push(char);
				}
			}
		})
	);

	return _.reduce(corrupted, (sum, n) => sum + pointsTable[n], 0);
}

console.log('Part 1: ', part1());
