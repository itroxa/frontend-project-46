import _ from 'lodash';
import readFile from './utils.js';

const genDiff = (file1, file2) => {
  const object1 = readFile(file1);
  const object2 = readFile(file2);
  const unitedKeys = _.union(_.keys(object1), _.keys(object2));
  const sortedKeys = _.sortBy(unitedKeys);
  const lines = sortedKeys.map((key) => {
    if (!_.has(object2, key)) {
      return `\t- ${key}: ${object1[key]}\n`;
    }
    if (!_.has(object1, key)) {
      return `\t+ ${key}: ${object2[key]}\n`;
    }
    if (object1[key] !== object2[key]) {
      return `\t- ${key}: ${object1[key]}\n\t+ ${key}: ${object2[key]}\n`;
    }
    return `\t  ${key}: ${object1[key]}\n`;
  });
  return ['{\n', ...lines, '}'].join('');
};

export default genDiff;
