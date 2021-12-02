const readFile = require('../../helper');

// convert string to number from the start
const program = readFile()
	.split(',')
	.map((item) => Number(item));

// restore puzzle input to the "1202" program alarm state
program[1] = 12;
program[2] = 2;

// shallow copy of program and mutate this object
const input = program.concat();

const addIntcode = (program, pointer) => {
	const index1 = program[pointer + 1];
	const index2 = program[pointer + 2];

	return program[index1] + program[index2];
};

const multiplyIntcode = (program, pointer) => {
	const index1 = program[pointer + 1];
	const index2 = program[pointer + 2];

	return program[index1] * program[index2];
};

const processOpcode = (program, pointer) => {
	let output = null;

	switch (program[pointer]) {
		case 1:
			output = addIntcode(program, pointer);

			break;
		case 2:
			output = multiplyIntcode(program, pointer);

			break;
		// program finished
		case 99:
			break;
		default:
			console.log('Something went wrong!');
	}

	return output;
};

const runOpcode = () => {
	for (let n = 0; n + 4 < input.length; n += 4) {
		const outputIndex = input[n + 3];

		input[outputIndex] = processOpcode(input, n);
	}

	return input[0];
};

const checkOutputValue = (output) => {
	let noun = null;
	let verb = null;

	for (let n = 0; n + 4 < program.length; n += 4) {
		console.log(processOpcode(program, n));
		if (output === processOpcode(program, n)) {
			noun = program[n + 1];
			verb = program[n + 2];

			break;
		}
	}

	// final answer should be 100 * noun + verb
	return 100 * noun + verb;
};

console.log(
	`Value at position 0: ${runOpcode()}`,
	`Part 2: ${checkOutputValue(19690720)}`
);
