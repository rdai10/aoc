const readFile = require('../../helper.js');

const input = readFile()
  .replace(/\n{1}/g, ' ')
  .split(/\s{2,}/)
  .map((group) =>
    group.split(' ').map((memberAnswer) => {
      const answerSet = new Set();

      memberAnswer.split('').forEach((answer) => answerSet.add(answer));

      return answerSet;
    })
  );

function performUnionOperation(a, b) {
  const union = new Set();

  for (const entry of a) {
    union.add(entry);
  }

  for (const entry of b) {
    union.add(entry);
  }

  return union;
}

function performIntersectionOperation(a, b) {
  const intersection = new Set();

  for (const entry of a) {
    if (b.has(entry)) {
      intersection.add(entry);
    }
  }

  return intersection;
}

function findTotalAnswers(answers) {
  return answers.reduce((acc, answerSet) => acc + answerSet.size, 0);
}

function part1() {
  const allCustomsFormAnswers = input.map((group) =>
    group.reduce((acc, answerSet) => performUnionOperation(acc, answerSet))
  );

  return findTotalAnswers(allCustomsFormAnswers);
}

function part2() {
  const sharedCustomsFormAnswers = input.map((group) =>
    group.reduce((acc, answerSet) =>
      performIntersectionOperation(acc, answerSet)
    )
  );

  return findTotalAnswers(sharedCustomsFormAnswers);
}

console.log('Part 1: ', part1(), 'Part 2: ', part2());
