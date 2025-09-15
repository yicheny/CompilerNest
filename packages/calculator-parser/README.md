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

### CLI 详细用法

- 在包目录内运行（推荐本地开发时使用）：
```bash
pnpm run build
pnpm run start -- "2 + 3 * (4 - 1)"
# 等价于：
node dist/cli.js "2 + 3 * (4 - 1)"
```

- 在 monorepo 根目录通过 workspace 运行（无需切换目录）：
```bash
pnpm -w -F @compilernest/calculator-parser build
pnpm -w -F @compilernest/calculator-parser exec calc "2 + 3 * (4 - 1)"
```

- 不带参数时会打印用法并以非零状态退出：
```text
Usage: calc "2 + 3 * (4 - 1)"
```

- 更多示例：
```bash
pnpm run start -- "1 + 2 + 3"          # 6
pnpm run start -- "10 * (2 + 3)"       # 50
pnpm run start -- "18 / (3 * (2 + 1))" # 2
```

- 作为库使用：
```ts
import { tokenize, parse, evaluate } from '@compilernest/calculator-parser';

const tokens = tokenize('2 + 3 * (4 - 1)');
const ast = parse(tokens);
const result = evaluate(ast); // 11
```

> 说明：该包为 ES Module（package.json 中 `type: "module"`），需要 Node.js ≥ 18。

## 扩展建议
- 一元负号（负数）
- 幂运算 `^`
- 将解释器替换为代码生成（输出 JS 字符串并执行）
