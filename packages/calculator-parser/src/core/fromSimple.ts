import type { ASTNode, SimpleNode, Operator } from './types.js';

function isOperator(value: unknown): value is Operator {
  return value === '+' || value === '-' || value === '*' || value === '/';
}

export function fromSimple(simple: SimpleNode): ASTNode {
  if (typeof simple === 'number') {
    return { type: 'NumberLiteral', value: simple };
  }

  if (Array.isArray(simple) && simple.length === 3) {
    const [op, left, right] = simple as [unknown, unknown, unknown];
    if (!isOperator(op)) {
      throw new Error('Invalid operator in simple AST: ' + String(op));
    }
    const leftNode = fromSimple(left as SimpleNode);
    const rightNode = fromSimple(right as SimpleNode);
    return { type: 'BinaryExpr', operator: op, left: leftNode, right: rightNode };
  }

  throw new Error('Invalid simple AST format');
}


