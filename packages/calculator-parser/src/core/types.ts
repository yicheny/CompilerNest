export type Token = string;

export type ASTNode =
  | { type: 'NumberLiteral'; value: number }
  | { type: 'BinaryExpr'; operator: string; left: ASTNode; right: ASTNode };


