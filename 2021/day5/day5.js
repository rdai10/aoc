const readFile = require('../../helper');

const _ = require('lodash');

const vents = readFile()
	.split(/\n/)
	.map((line) =>
		line
			.split(' -> ')
			.map((coordinate) => coordinate.split(',').map(Number))
	);

const horizontalOrVerticalVents = vents.filter(
	([[startX, startY], [endX, endY]]) => startX === endX || startY === endY
);

function calculateAllPointsFromDiagonal(line) {
	const [[startX, startY], [endX, endY]] = line;
	const dx = endX - startX;
	const dy = endY - startY;

	let points = [[endX, endY]];
	let pointX = startX;
	let pointY = startY;

	while (pointX !== endX && pointY !== endY) {
		points.push([pointX, pointY]);

		pointX = dx < 0 ? pointX - 1 : pointX + 1;
		pointY = dy < 0 ? pointY - 1 : pointY + 1;
	}

	return points;
}

function calculateAllPointsFromLine(line) {
	const [[startX, startY], [endX, endY]] = line;

	let points = [];

	if (startX === endX) {
		let starting = startY;
		let ending = endY;

		if (starting > ending) {
			starting = endY;
			ending = startY;
		}

		for (let i = starting; i <= ending; i++) {
			points.push([startX, i]);
		}
	}

	if (startY === endY) {
		let starting = startX;
		let ending = endX;

		if (starting > ending) {
			starting = endX;
			ending = startX;
		}

		for (let i = starting; i <= ending; i++) {
			points.push([i, startY]);
		}
	}

	return points;
}

function trackPoints(vents, pointsFn, points = new Map()) {
	const addPointToPoints = (line) => {
		pointsFn(line).forEach((point) => {
			const pointCoordinates = point.join(',');

			if (points.has(pointCoordinates)) {
				const count = points.get(pointCoordinates);

				points.set(pointCoordinates, count + 1);
			} else {
				points.set(pointCoordinates, 1);
			}
		});
	};

	vents.forEach(addPointToPoints);

	return points;
}

function countOverlap(pointsTracked) {
	let counter = 0;

	for (const point of pointsTracked) {
		const [_, count] = point;

		if (count > 1) {
			counter += 1;
		}
	}

	return counter;
}

function part1() {
	const points = trackPoints(
		horizontalOrVerticalVents,
		calculateAllPointsFromLine
	);

	return countOverlap(points);
}

function part2() {
	const diagonalVents = _.difference(vents, horizontalOrVerticalVents);

	const horizontalAndVertialPointsTracked = trackPoints(
		horizontalOrVerticalVents,
		calculateAllPointsFromLine
	);

	const points = trackPoints(
		diagonalVents,
		calculateAllPointsFromDiagonal,
		horizontalAndVertialPointsTracked
	);

	return countOverlap(points);
}

console.log('Part 1: ', part1(), 'Part 2: ', part2());
