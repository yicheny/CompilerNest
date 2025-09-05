# @compilernest/calculator-parser

一个简易的算术表达式处理器，包含：
- 词法分析（Lexer）
- 语法分析（Parser）
- 解释执行（Interpreter）

支持运算：`+ - * /` 与括号。

## 安装与使用
- 构建与演示：
```bash
pnpm -w -F @compilernest/calculator-parser build
pnpm -w -F @compilernest/calculator-parser demo
```

- CLI：
```bash
pnpm -w -F @compilernest/calculator-parser build
pnpm -w -F @compilernest/calculator-parser exec calc "2 + 3 * (4 - 1)"
```

- 作为库使用：
```ts
import { tokenize, parse, evaluate } from '@compilernest/calculator-parser';

const tokens = tokenize('2 + 3 * (4 - 1)');
const ast = parse(tokens);
const result = evaluate(ast); // 11
```

## 扩展建议
- 一元负号（负数）
- 幂运算 `^`
- 将解释器替换为代码生成（输出 JS 字符串并执行）
