export type Token = string;

export type ASTNode =
  | { type: 'NumberLiteral'; value: number }
  | { type: 'BinaryExpr'; operator: string; left: ASTNode; right: ASTNode };

export type Operator = '+' | '-' | '*' | '/';

export type SimpleNode =
  | number
  | [Operator, SimpleNode, SimpleNode];


