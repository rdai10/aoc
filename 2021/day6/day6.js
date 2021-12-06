const readFile = require('../../helper');

const _ = require('lodash');

const lanternfish = readFile()
	.split(',')
	.map((fish) => Number(fish));

function groupFishByTimer() {
	const school = Array(9).fill(0);

	lanternfish.forEach((fish) => {
		school[fish] += 1;
	});

	return school;
}

function calculateFishPopulation(duration) {
	const school = groupFishByTimer();

	for (let days = 1; days <= duration; days++) {
		const resetCount = school[0];

		school.shift();

		school[6] += resetCount;
		school.push(resetCount);
	}

	let population = 0;

	school.forEach((count) => (population += count));

	return population;
}

console.log(
	'Part 1: ',
	calculateFishPopulation(80),
	'Part 2: ',
	calculateFishPopulation(256)
);
