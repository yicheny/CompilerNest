import { describe, it, expect } from 'vitest';
import { evaluate } from '../src/core/evaluate.js';
import { parse } from '../src/core/parse.js';
import { tokenize } from '../src/core/tokenize.js';
import { fromSimple } from '../src/core/fromSimple.js';
import type { ASTNode } from '../src/core/types.js';


describe('evaluate', () => {
  it('数字字面量直接返回', () => {
    const ast: ASTNode = { type: 'NumberLiteral', value: 42 };
    expect(evaluate(ast)).toBe(42);
  });

  it('基础四则运算组合（来自简单表示）', () => {
    const ast = fromSimple(['+', 2, ['*', 3, 4]]);
    expect(evaluate(ast)).toBe(14);
  });

  it('括号影响优先级（来自解析器）', () => {
    const ast = parse(tokenize('(2 + 3) * 4'));
    expect(evaluate(ast)).toBe(20);
  });

  it('左结合：减法', () => {
    const ast = parse(tokenize('10 - 3 - 2'));
    expect(evaluate(ast)).toBe(5);
  });

  it('左结合：除法', () => {
    const ast = parse(tokenize('20 / 5 / 2'));
    expect(evaluate(ast)).toBe(2);
  });

  it('除以 0 的行为（遵循 JS 语义）', () => {
    const ast = parse(tokenize('1 / 0'));
    expect(evaluate(ast)).toBe(Infinity);
  });

  it('非法操作符抛错', () => {
    const ast: ASTNode = {
      type: 'BinaryExpr',
      operator: '^' as unknown as '+',
      left: { type: 'NumberLiteral', value: 2 },
      right: { type: 'NumberLiteral', value: 3 },
    };
    expect(() => evaluate(ast)).toThrowError(/Invalid AST node/);
  });

  it('复杂嵌套', () => {
    const ast = parse(tokenize('2 + (3 * (4 - 1))'));
    expect(evaluate(ast)).toBe(11);
  });
});
