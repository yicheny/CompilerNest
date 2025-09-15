import type { Token } from './types.js';

// 词法分析器，非常简单：
// 1. 使用正则表达式匹配输入字符串中的数字、运算符和括号
export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  const regex = /\s*([0-9]+|\+|\-|\*|\/|\(|\))\s*/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    tokens.push(match[1]);
  }
  return tokens;
}


