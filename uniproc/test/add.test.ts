import { expect, test } from 'bun:test';
import { ArticleParser } from '../src/article/parseWithMdAST';

test('adds 1 + 2 to equal 6', () => {
    expect(1 + 2 + 3).toBe(6);
});

test('run parser', () => {
    const parser = new ArticleParser(
        `# Title
    - list a
        - list a1
        - list a2
    - list b
    `,
    );

    console.log(parser.body);
});
