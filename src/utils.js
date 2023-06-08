import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';

const pathToFile = (file) => resolve(cwd(), file);

const readFile = (file) => JSON.parse(readFileSync(pathToFile(file)), 'utf-8');

export { readFile };