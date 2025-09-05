# CompilerNest

一个用于学习与实践编译原理的 monorepo，包含解析器、解释器与编译器相关项目。

## 包一览
- `@compilernest/calculator-parser`: 简易算术表达式的词法分析、语法分析与解释执行（支持 `+ - * /` 与括号）。

## 使用方式
- 安装依赖：
```bash
pnpm install
```
- 运行计算器示例：
```bash
pnpm -w -F @compilernest/calculator-parser build
pnpm -w -F @compilernest/calculator-parser demo
```
- 使用 CLI：
```bash
pnpm -w -F @compilernest/calculator-parser build
pnpm -w -F @compilernest/calculator-parser exec calc "2 + 3 * (4 - 1)"
```

## 规划

## 环境要求
- Node.js >= 18.12.0（推荐 18.18.0）
- pnpm 已安装
- JSX 解析器
- 代码生成与 mini 编译器
- 中间表示与优化实验
