import { describe, expect, test } from 'bun:test';
import { ArticleParser } from '@src/article/parseWithMdAST';

const MINIMAL_FRONTMATTER = `---
title: ""
date: "2020-02-03"
tags: []
---
`;

describe('frontmatterのパース成功', () => {
    const tests = [
        {
            name: '最小構成',
            source: MINIMAL_FRONTMATTER,
        },
    ] satisfies { name: string; source: string }[];

    tests.forEach(({ name, source }) => {
        test(name, () => {
            const parser = new ArticleParser(source);

            expect(parser.frontmatter).toBeDefined();
        });
    });
});

describe('frontmatterのパース失敗', () => {
    const tests = [
        {
            name: '存在しない',
            source: `with no frontmatter`,
        },
        {
            name: '閉じていない',
            source: `---
title: "The title"
date: 2021-01-01`,
        },
        {
            name: 'frontmatterの前に余分な改行がある',
            source: 'Hello\n' + MINIMAL_FRONTMATTER,
        },
        {
            name: 'frontmatterの前に余分な文字列がある',
            source: '\n' + MINIMAL_FRONTMATTER,
        },
    ] satisfies { name: string; source: string }[];

    tests.forEach(({ name, source }) => {
        test(name, () => {
            const parser = new ArticleParser(source);

            expect(() => parser.frontmatter).toThrow();
        });
    });
});
