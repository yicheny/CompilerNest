#!/usr/bin/env node
import { tokenize, parse, evaluate } from './index.js';

function main() {
  const input = process.argv.slice(2).join(' ').trim();
  if (!input) {
    console.error('Usage: calc "2 + 3 * (4 - 1)"');
    process.exit(1);
  }
  const tokens = tokenize(input);
  const ast = parse(tokens);
  const result = evaluate(ast);
  console.log(result);
}

main();
