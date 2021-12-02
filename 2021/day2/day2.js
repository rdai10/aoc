const readFile = require('../../helper');

const _ = require('lodash');

const course = readFile()
	.split('\n')
	.map((step) => step.split(' '));

function processDirections() {
	const directions = _.groupBy(course, ([direction]) => direction);

	for (const direction in directions) {
		directions[direction] = directions[direction].map(([, unit]) =>
			Number(unit)
		);
	}

	return directions;
}

function sumPositions(positions) {
	let sum = 0;

	positions.forEach((position) => (sum += position));

	return sum;
}

function part1() {
	const directions = processDirections();

	const forward = sumPositions(directions.forward);
	const up = sumPositions(directions.up);
	const down = sumPositions(directions.down);

	return forward * (down - up);
}

function part2() {
	let aim = 0;
	let horizontal = 0;
	let depth = 0;

	course.forEach(([direction, position]) => {
		const positionNum = Number(position);

		switch (direction) {
			case 'forward':
				horizontal += positionNum;
				depth += aim * positionNum;
				break;
			case 'up':
				aim -= positionNum;
				break;
			case 'down':
				aim += positionNum;
				break;
			default:
				throw new Error('Invalid direction');
		}
	});

	return horizontal * depth;
}

console.log('Part 1: ', part1(), 'Part 2: ', part2());
