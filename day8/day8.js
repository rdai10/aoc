const readFile = require('../helper.js');

const input = readFile()
  .split('\n')
  .map((instructionSet) => {
    const [operation, argument] = instructionSet.split(' ');

    return { operation, argument: parseInt(argument) };
  });

function executeInstruction(history) {
  let { newInstruction, accumulator, executedInstructions } = history;

  if (!executedInstructions.has(newInstruction)) {
    executedInstructions.add(newInstruction);

    const instruction = input[newInstruction];

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

    return executeInstruction({
      newInstruction,
      accumulator,
      executedInstructions,
    });
  } else {
    return history;
  }
}

function part1() {
  let newInstruction = 0;
  let accumulator = 0;
  let executedInstructions = new Set();

  const history = executeInstruction({
    newInstruction,
    accumulator,
    executedInstructions,
  });

  return history.accumulator;
}

console.log('Part 1: ', part1());
