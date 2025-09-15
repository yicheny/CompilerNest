import type { Token, ASTNode } from './types.js';

// 解析器（递归下降）思路：
// - 三层优先级（高 → 低）：
//   1) Factor：数字 或 括号里的表达式
//   2) Term：用 * / 把多个 Factor 串起来
//   3) Expression：用 + - 把多个 Term 串起来
// - 工作方法：先 peek 看一眼（不前进），符合就 consume 吃掉（前进）。
//   在 while 循环里不断把左边结果与新读到的右边结果合并，形成左结合的语法树。
export function parse(tokens: Token[]): ASTNode {
  let pos = 0;

  // peek：查看当前 token，不移动游标；用于判断接下来走哪条分支
  function peek(): string | undefined {
    return tokens[pos];
  }
  // consume：返回当前 token 并将游标前进一位（pos++）；用于“消费”一个 token
  function consume(): string {
    return tokens[pos++]!;
  }

  // 处理加减（最低优先级，左结合）
  function parseExpression(): ASTNode {
    let node = parseTerm();
    while (peek() === '+' || peek() === '-') {
      const op = consume();
      const right = parseTerm();
      node = { type: 'BinaryExpr', operator: op, left: node, right };
    }
    return node;
  }

  // 处理乘除（高于加减，左结合）
  function parseTerm(): ASTNode {
    let node = parseFactor();
    while (peek() === '*' || peek() === '/') {
      const op = consume();
      const right = parseFactor();
      node = { type: 'BinaryExpr', operator: op, left: node, right };
    }
    return node;
  }

  // 处理数字与括号（最高优先级）
  function parseFactor(): ASTNode {
    const current = peek();
    if (current && /\d+/.test(current)) {
      return { type: 'NumberLiteral', value: Number(consume()) };
    }
    if (current === '(') {
      consume();
      const expr = parseExpression();
      if (peek() !== ')') throw new Error('Expected )');
      consume();
      return expr;
    }
    throw new Error('Unexpected token: ' + current);
  }

  return parseExpression();
}


