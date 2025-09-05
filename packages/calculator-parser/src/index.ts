export type Token = string;

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  const regex = /\s*([0-9]+|\+|\-|\*|\/|\(|\))\s*/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(input)) !== null) {
    tokens.push(match[1]);
  }
  return tokens;
}

export type ASTNode =
  | { type: 'NumberLiteral'; value: number }
  | { type: 'BinaryExpr'; operator: string; left: ASTNode; right: ASTNode };

export function parse(tokens: Token[]): ASTNode {
  let pos = 0;

  function peek(): string | undefined {
    return tokens[pos];
  }
  function consume(): string {
    return tokens[pos++]!;
  }

  function parseExpression(): ASTNode {
    let node = parseTerm();
    while (peek() === '+' || peek() === '-') {
      const op = consume();
      const right = parseTerm();
      node = { type: 'BinaryExpr', operator: op, left: node, right };
    }
    return node;
  }

  function parseTerm(): ASTNode {
    let node = parseFactor();
    while (peek() === '*' || peek() === '/') {
      const op = consume();
      const right = parseFactor();
      node = { type: 'BinaryExpr', operator: op, left: node, right };
    }
    return node;
  }

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

export function evaluate(node: ASTNode): number {
  switch (node.type) {
    case 'NumberLiteral':
      return node.value;
    case 'BinaryExpr': {
      const left = evaluate(node.left);
      const right = evaluate(node.right);
      switch (node.operator) {
        case '+':
          return left + right;
        case '-':
          return left - right;
        case '*':
          return left * right;
        case '/':
          return left / right;
      }
    }
  }
  throw new Error('Invalid AST node');
}
