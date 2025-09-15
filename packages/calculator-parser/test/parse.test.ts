import { describe, it, expect } from 'vitest';
import { tokenize } from '../src/core/tokenize.js';
import { parse } from '../src/core/parse.js';
import type { ASTNode } from '../src/core/types.js';

function toSimple(node: ASTNode): any {
  if (node.type === 'NumberLiteral') return node.value;
  return [node.operator, toSimple(node.left), toSimple(node.right)];
}

describe('parse', () => {
  it('解析单个数字', () => {
    const ast = parse(tokenize('42'));
    expect(ast).toEqual({ type: 'NumberLiteral', value: 42 });
  });

  it('遵循优先级：乘法优先于加法', () => {
    const ast = parse(tokenize('2 + 3 * 4'));
    expect(toSimple(ast)).toEqual(['+', 2, ['*', 3, 4]]);
  });

  it('括号提升优先级', () => {
    const ast = parse(tokenize('(2 + 3) * 4'));
    expect(toSimple(ast)).toEqual(['*', ['+', 2, 3], 4]);
  });

  it('加减为左结合', () => {
    const ast = parse(tokenize('10 - 3 - 2'));
    expect(toSimple(ast)).toEqual(['-', ['-', 10, 3], 2]);
  });

  it('乘除为左结合', () => {
    const ast = parse(tokenize('20 / 5 / 2'));
    expect(toSimple(ast)).toEqual(['/', ['/', 20, 5], 2]);
  });

  it('嵌套括号', () => {
    const ast = parse(tokenize('2 + (3 * (4 - 1))'));
    expect(toSimple(ast)).toEqual(['+', 2, ['*', 3, ['-', 4, 1]]]);
  });

  it('遇到非法 token 抛错', () => {
    expect(() => parse(tokenize('2 + * 3'))).toThrowError(/Unexpected token/);
  });

  it('缺少右括号时抛错', () => {
    expect(() => parse(tokenize('(2 + 3'))).toThrowError(/Expected \)/);
  });
});


