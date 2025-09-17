import { describe, it, expect } from 'vitest';
import { fromSimple } from '../src/core/fromSimple.js';
import type { ASTNode, SimpleNode } from '../src/core/types.js';

function toSimple(node: ASTNode): any {
  if (node.type === 'NumberLiteral') return node.value;
  return [node.operator, toSimple(node.left), toSimple(node.right)];
}

describe('fromSimple 反解析', () => {
  it('数字', () => {
    const simple: SimpleNode = 42;
    const ast = fromSimple(simple);
    expect(ast).toEqual({ type: 'NumberLiteral', value: 42 });
  });

  it('二元表达式', () => {
    const simple: SimpleNode = ['+', 2, ['*', 3, 4]];
    const ast = fromSimple(simple);
    expect(toSimple(ast)).toEqual(['+', 2, ['*', 3, 4]]);
  });

  it('嵌套括号等价结构', () => {
    const simple: SimpleNode = ['+', 2, ['*', 3, ['-', 4, 1]]];
    const ast = fromSimple(simple);
    expect(toSimple(ast)).toEqual(['+', 2, ['*', 3, ['-', 4, 1]]]);
  });

  it('非法操作符时报错', () => {
    const simple: any = ['^', 2, 3];
    expect(() => fromSimple(simple)).toThrowError(/Invalid operator/);
  });

  it('非法结构时报错', () => {
    const simple: any = ['+', 2];
    expect(() => fromSimple(simple)).toThrowError(/Invalid simple AST format/);
  });
});


