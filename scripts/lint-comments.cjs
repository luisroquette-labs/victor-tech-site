const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
const ts = require('typescript');

const files = execFileSync('git', ['ls-files', '-z']).toString().split('\0').filter(Boolean);
const failures = [];

for (const file of files) {
  if (file === 'next-env.d.ts') continue;
  if (!/\.(?:ts|tsx|js|jsx|mjs|cjs|css|ya?ml|svg)$/.test(file) || !fs.existsSync(file)) continue;
  const source = fs.readFileSync(file, 'utf8');
  const offsets = [];
  if (file.endsWith('.css')) {
    let quote = '';
    for (let i = 0; i < source.length; i++) {
      if (quote) {
        if (source[i] === '\\') i++;
        else if (source[i] === quote) quote = '';
      } else if (source[i] === '"' || source[i] === "'") {
        quote = source[i];
      } else if (source.slice(i, i + 2) === '/*') {
        offsets.push(i);
        i = source.indexOf('*/', i + 2);
        if (i < 0) break;
        i++;
      }
    }
  } else if (/\.(?:yaml|yml)$/.test(file)) {
    for (const match of source.matchAll(/^[^\n]*$/gm)) {
      let quote = '';
      for (let i = 0; i < match[0].length; i++) {
        const c = match[0][i];
        if (quote) {
          if (c === quote) quote = '';
        } else if (c === '"' || c === "'") {
          quote = c;
        } else if (c === '#' && (i === 0 || /\s/.test(match[0][i - 1]))) {
          offsets.push(match.index + i);
          break;
        }
      }
    }
  } else if (file.endsWith('.svg')) {
    for (const match of source.matchAll(/<!--[\s\S]*?-->/g)) offsets.push(match.index);
  } else {
    const kind = file.endsWith('tsx') || file.endsWith('jsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
    const masked = source.split('');
    if (kind === ts.ScriptKind.TSX) {
      const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, kind);
      const visit = (node) => {
        if (ts.isJsxText(node)) {
          for (let i = node.pos; i < node.end; i++) if (masked[i] !== '\n') masked[i] = ' ';
        }
        ts.forEachChild(node, visit);
      };
      visit(tree);
    }
    const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, kind, masked.join(''));
    for (let token = scanner.scan(); token !== ts.SyntaxKind.EndOfFileToken; token = scanner.scan()) {
      if (token === ts.SyntaxKind.SingleLineCommentTrivia || token === ts.SyntaxKind.MultiLineCommentTrivia) {
        if (file === 'next.config.mjs' && scanner.getTokenText() === "/** @type {import('next').NextConfig} */") continue;
        offsets.push(scanner.getTokenPos());
      }
    }
    if (file === 'components/ElectricLava.tsx') {
      for (const shader of source.matchAll(/\b(?:VERT|FRAG)\s*=\s*`([^`]*)`/g)) {
        for (const comment of shader[1].matchAll(/\/\/|\/\*/g)) offsets.push(shader.index + shader[0].indexOf('`') + 1 + comment.index);
      }
    }
  }
  for (const offset of offsets) {
    const line = source.slice(0, offset).split('\n').length;
    failures.push(`${file}:${line}`);
  }
}

if (failures.length) {
  console.error(`Comments are forbidden (baseline: 0):\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log('Comment lint passed (baseline: 0).');
}
