const readFile = require('../../helper');

const vents = readFile()
	.split(/\n/)
	.map((line) =>
		line
			.split(' -> ')
			.map((coordinate) => coordinate.split(',').map(Number))
	);

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

function trackPoints(vents) {
	const points = new Map();

	const addPointToPoints = (line) => {
		calculateAllPointsFromLine(line).forEach((point) => {
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

function part1() {
	let counter = 0;

	const horizontalOrVerticalVents = vents.filter(
		([[startX, startY], [endX, endY]]) => startX === endX || startY === endY
	);

	const pointsTracked = trackPoints(horizontalOrVerticalVents);

	for (const point of pointsTracked) {
		const [_, count] = point;

		if (count > 1) {
			counter += 1;
		}
	}

	return counter;
}

console.log('Part 1: ', part1());
