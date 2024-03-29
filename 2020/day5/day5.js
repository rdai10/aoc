const readFile = require('../../helper.js');

const COL = 'col';
const ROW = 'row';

const input = readFile()
  .split('\n')
  .map((boardingPass) => {
    const formattedBoradingPass = {};

    formattedBoradingPass[ROW] = boardingPass.slice(0, 7);
    formattedBoradingPass[COL] = boardingPass.slice(7, 10);

    return formattedBoradingPass;
  });

function findPos(pos, positionType = COL) {
  let lowerHalf = 'L';
  let range = {
    lowerBound: 0,
    upperBound: 7,
  };

  if (positionType === ROW) {
    lowerHalf = 'F';
    range = {
      lowerBound: 0,
      upperBound: 127,
    };
  }

  pos.split('').forEach((char) => {
    if (char === lowerHalf) {
      range.upperBound =
        range.upperBound - Math.ceil((range.upperBound - range.lowerBound) / 2);
    } else {
      range.lowerBound =
        range.lowerBound + Math.ceil((range.upperBound - range.lowerBound) / 2);
    }
  });

  if (range.lowerBound === range.upperBound) {
    return range.lowerBound;
  }
}

function findSeatId(row, col) {
  return row * 8 + col;
}

function sortSeatIdsInDecendingOrder() {
  return input
    .map((boardingPass) => {
      const row = findPos(boardingPass.row, ROW);
      const col = findPos(boardingPass.col, COL);

      return findSeatId(row, col);
    })
    .sort((a, b) => b - a);
}

function part1() {
  return sortSeatIdsInDecendingOrder()[0];
}

function part2() {
  const sortedSeatIds = sortSeatIdsInDecendingOrder();

  return (
    sortedSeatIds.find((id, index) => {
      if (index !== 0 && index !== sortedSeatIds.length) {
        return sortedSeatIds[index - 1] - 1 !== id;
      } else {
        return false;
      }
    }) + 1
  );
}

console.log('Part 1: ', part1(), 'Part 2:', part2());
