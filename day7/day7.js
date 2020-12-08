const { group } = require('console');
const readFile = require('../helper.js');

const input = {};

readFile()
  .replace(/( bags| bag)/g, '')
  .split('\n')
  .forEach((rule) => {
    const [key, values] = rule.split(' contain');

    input[key] = values
      .replace('.', '')
      .split(',')
      .map((value) => {
        const regex = /(?<count>\d)\s(?<id>\w+\s\w+)|(?<other>no other)/;
        const groups = value.trim().match(regex).groups;

        if (groups.other) {
          return '';
        } else {
          return { id: groups.id, count: groups.count };
        }
      });
  });
