import _ from 'lodash';
import { readFile } from './utils.js';

const genDiff = (file1, file2) => {
  const object1 = readFile(file1);
  const object2 = readFile(file2);
  const unitedKeys = _.union(_.keys(object1), _.keys(object2));
  const sortedKeys = _.sortBy(unitedKeys);
  const lines = [];
  lines.push('{\n');
  for (const key of sortedKeys) {
    if (!_.has(object2, key)) {
      lines.push(`\t- ${key}: ${object1[key]}\n`);
    } else if (!_.has(object1, key)) {
      lines.push(`\t+ ${key}: ${object2[key]}\n`);
    } else if (object1[key] !== object2[key]) {
      lines.push(`\t- ${key}: ${object1[key]}\n`);
      lines.push(`\t+ ${key}: ${object2[key]}\n`);
    } else {
      lines.push(`\t  ${key}: ${object1[key]}\n`);
    }
  }
  lines.push('}');
  const diff = lines.join('');
  return diff;
};

export default genDiff;