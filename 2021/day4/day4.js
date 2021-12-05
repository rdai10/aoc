const readFile = require('../../helper');

const _ = require('lodash');
const {find} = require('lodash');

const bingoSubSystem = readFile().split(/\n\n/);

const numbers = bingoSubSystem.shift().split(',');

const boards = bingoSubSystem.map((row) =>
	row
		.split(/\n/)
		.map((numbers) => numbers.split(' ').filter((number) => number !== ''))
);

const boardWidth = boards[0][0].length;
const boardLength = boards[0].length;

const bingoNumbers = [];

function findMinNumberToBingo() {
	if (boardWidth === boardLength || boardWidth < boardLength) {
		return boardWidth;
	}

	return boardLength;
}

function checkBoards() {
	for (let i = findMinNumberToBingo(); i < numbers.length; i++) {
		boards.forEach((board, index) => {
			checkRow(board, i, index);
			checkCol(board, i, index);
		});
	}
}

function checkRow(board, numberIndex, boardIndex) {
	board.forEach((row) => {
		const intersection = _.intersection(row, numbers.slice(0, numberIndex));

		if (intersection.length === boardWidth) {
			bingoNumbers.push({
				bingo: intersection,
				bingoNumberIndex: numberIndex - 1,
				boardIndex
			});
		}
	});
}

function checkCol(board, numberIndex, boardIndex) {
	_.unzip(board).forEach((col) => {
		const intersection = _.intersection(col, numbers.slice(0, numberIndex));

		if (intersection.length === boardLength) {
			bingoNumbers.push({
				bingo: intersection,
				bingoNumberIndex: numberIndex - 1,
				boardIndex
			});
		}
	});
}

function part1() {
	checkBoards();

	const [{boardIndex, bingoNumberIndex}] = bingoNumbers;

	const winningBoard = _.flatten(boards[boardIndex]);

	const unmarkedNumbers = _.pullAll(
		winningBoard,
		numbers.slice(0, bingoNumberIndex + 1)
	).map(Number);
	const unmarkedSum = _.reduce(unmarkedNumbers, (sum, n) => sum + n, 0);

	const numberCalled = Number(numbers[bingoNumberIndex]);

	return unmarkedSum * numberCalled;
}

console.log('Part 1: ', part1());
