const readFile = require('../../helper.js');

const input = readFile()
  .split('\n')
  .map((instructionSet) => {
    const [operation, argument] = instructionSet.split(' ');

    return { operation, argument: parseInt(argument) };
  });

function executeInstruction(history, program) {
  let { newInstruction, accumulator, executedInstructions } = history;

  if (!executedInstructions.has(newInstruction) && program[newInstruction]) {
    executedInstructions.add(newInstruction);

    const instruction = program[newInstruction];

    switch (instruction.operation) {
      case 'acc':
        accumulator = accumulator + instruction.argument;
        newInstruction++;
        break;
      case 'jmp':
        newInstruction = newInstruction + instruction.argument;
        break;
      case 'nop':
        newInstruction++;
        break;
      default:
        return;
    }

    return executeInstruction(
      {
        newInstruction,
        accumulator,
        executedInstructions,
      },
      program
    );
  } else {
    return history;
  }
}

function getInstructionHistory(program) {
  let newInstruction = 0;
  let accumulator = 0;
  let executedInstructions = new Set();

  return executeInstruction(
    {
      newInstruction,
      accumulator,
      executedInstructions,
    },
    program
  );
}

function findCorruptInstruction(instructionHistory) {
  const newInstruction = instructionHistory.pop();

  if (newInstruction) {
    const newOperation =
      input[newInstruction].operation === 'jmp'
        ? 'nop'
        : input[newInstruction].operation === 'nop'
        ? 'jmp'
        : input[newInstruction].operation;

    const newInput = [...input];

    newInput[newInstruction] = {
      operation: newOperation,
      argument: newInput[newInstruction].argument,
    };

    const newHistory = getInstructionHistory(newInput);

    if (newHistory.executedInstructions.size !== newInput.length) {
      console.log(instructionHistory)
      return findCorruptInstruction(instructionHistory);
    } else {
      // never gets here
      return newHistory;
    }
  }
}

function part1() {
  return getInstructionHistory(input).accumulator;
}

function part2() {
  const instructionHistory = Array.from(
    getInstructionHistory(input).executedInstructions
  );

  findCorruptInstruction(instructionHistory);
}

console.log('Part 1: ', part1(), 'Part 2: ', part2());
