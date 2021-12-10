const readFile = require('../../helper');

const _ = require('lodash');

const heightmap = readFile()
	.split(/\n/)
	.map((item) => item.split(''));

const checkUp = (number, index, rowNumber) =>
	number < heightmap[rowNumber - 1][index];
const checkDown = (number, index, rowNumber) =>
	number < heightmap[rowNumber + 1][index];
const checkLeft = (number, index, row) => number < row[index - 1];
const checkRight = (number, index, row) => number < row[index + 1];

function part1() {
	const lowPoints = {};

	heightmap.forEach((row, rowNumber) => {
		row.forEach((number, index) => {
			if (index === 0) {
				if (checkRight(number, index, row)) {
					// first row
					if (rowNumber === 0) {
						if (checkDown(number, index, rowNumber)) {
							lowPoints[`${rowNumber}, ${index}`] = number;
						}
					}
					// last row
					else if (rowNumber === heightmap.length - 1) {
						if (checkUp(number, index, rowNumber)) {
							lowPoints[`${rowNumber}, ${index}`] = number;
						}
					} else {
						if (
							checkUp(number, index, rowNumber) &&
							checkDown(number, index, rowNumber)
						) {
							lowPoints[`${rowNumber}, ${index}`] = number;
						}
					}
				}

				return;
			}

			if (index === row.length - 1) {
				if (checkLeft(number, index, row)) {
					// first row
					if (rowNumber === 0) {
						if (checkDown(number, index, rowNumber)) {
							lowPoints[`${rowNumber}, ${index}`] = number;
						}
					}
					// last row
					else if (rowNumber === heightmap.length - 1) {
						if (checkUp(number, index, rowNumber)) {
							lowPoints[`${rowNumber}, ${index}`] = number;
						}
					} else {
						if (
							checkUp(number, index, rowNumber) &&
							checkDown(number, index, rowNumber)
						) {
							lowPoints[`${rowNumber}, ${index}`] = number;
						}
					}
				}

				return;
			}

			if (
				checkRight(number, index, row) &&
				checkLeft(number, index, row)
			) {
				// first row
				if (rowNumber === 0) {
					if (checkDown(number, index, rowNumber)) {
						lowPoints[`${rowNumber}, ${index}`] = number;
					}
				} // last row
				else if (rowNumber === heightmap.length - 1) {
					if (checkUp(number, index, rowNumber)) {
						lowPoints[`${rowNumber}, ${index}`] = number;
					}
				} else {
					if (
						checkUp(number, index, rowNumber) &&
						checkDown(number, index, rowNumber)
					) {
						lowPoints[`${rowNumber}, ${index}`] = number;
					}
				}
			}
		});
	});

	const points = Object.values(lowPoints).map(Number);

	return _.reduce(points, (sum, n) => sum + n, 0) + points.length;
}

console.log('Part 1: ', part1());
