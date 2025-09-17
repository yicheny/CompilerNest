import { tokenize, parse, evaluate } from './core/index.js';

const input = '20 + 3 * (4 - 1)';
const tokens = tokenize(input);
console.log('Tokens:', tokens);

const ast = parse(tokens);
console.log('AST:', JSON.stringify(ast, null, 2));

const result = evaluate(ast);
console.log('Result:', result);

// import { fromSimple } from './core';
// import type { SimpleNode } from './core/types.js';
//
// const simple: SimpleNode = ['+', 2, ['*', 3, ['-', 4, 1]]];
// console.dir(fromSimple(simple), { depth: null });