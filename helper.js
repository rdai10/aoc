const fs = require('fs');

module.exports = function readFile() {
  return fs.readFileSync('input.txt', 'utf8');
};
