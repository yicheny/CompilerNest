import type { ASTNode } from './types.js';

// 执行器，非常简单：
// 1. 如果节点是数字，则返回数字
// 2. 如果节点是二元表达式，则计算左右子节点的值，并根据运算符返回结果
// 3. 否则抛出错误
export function evaluate(node: ASTNode): number {
  switch (node.type) {
    case 'NumberLiteral':
      return node.value;
    case 'BinaryExpr': {
      const left = evaluate(node.left);
      const right = evaluate(node.right);
      switch (node.operator) {
        case '+':
          return left + right;
        case '-':
          return left - right;
        case '*':
          return left * right;
        case '/':
          return left / right;
      }
    }
  }
  throw new Error('Invalid AST node');
}


