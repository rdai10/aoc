const readFile = require('../../helper');

const input = readFile().split('\n');

const calculateFuel = mass => Math.floor(mass / 3) - 2;

const calculateFuelFromTotalMass = mass => {
  let totalFuel = 0;
  let currentFuel = calculateFuel(mass);

  while (currentFuel > 0) {
    totalFuel += currentFuel;

    currentFuel = calculateFuel(currentFuel);
  }

  return totalFuel;
};

const fuelNeeded = (input, fn) => {
  let fuel = 0;

  input.forEach(mass => (fuel += fn(mass)));

  return fuel;
};

console.log(
  `part 1: ${fuelNeeded(input, calculateFuel)}`,
  `part 2: ${fuelNeeded(input, calculateFuelFromTotalMass)}`
);
