const readFile = require('../../helper');

const _ = require('lodash');

const positions = readFile().split(',').map(Number);

const comparator = (a, b) => {
	if (a < b) {
		return -1;
	}

	if (b < a) {
		return 1;
	}

	return 0;
};

const sum = (values) => _.reduce(values, (sum, n) => sum + n, 0);

function findPossiblePositions(upperRange) {
	return Array(upperRange + 1)
		.fill(0)
		.map((_, index) => index);
}

function findTotalFuelAtConstantRate(possiblePosition) {
	const fuel = positions.map((curPosition) =>
		Math.abs(curPosition - possiblePosition)
	);

	return sum(fuel);
}

function findTotalFuelAtIncrementalRate(possiblePosition) {
	const fuel = positions.map((curPosition) => {
		const steps = findPossiblePositions(
			Math.abs(curPosition - possiblePosition)
		);

		return sum(steps);
	});

	return sum(fuel);
}

function findShortestPath(toatlFuelByRate) {
	const currentPositionUpper = positions.sort(comparator).reverse()[0];
	const possiblePositions = findPossiblePositions(currentPositionUpper);

	const allOutcome = possiblePositions
		.map((position) => toatlFuelByRate(position))
		.sort(comparator);

	return allOutcome[0];
}

console.log(
	'Part 1: ',
	findShortestPath(findTotalFuelAtConstantRate),
	'Part 2: ',
	findShortestPath(findTotalFuelAtIncrementalRate)
);
