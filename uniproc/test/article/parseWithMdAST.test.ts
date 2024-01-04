import { describe, expect, test } from 'bun:test';
import { ArticleParser } from '@src/article/parseWithMdAST';

const MINIMAL_FRONTMATTER = ({
    title = 'The title',
    slug = 'minimal-frontmatter',
    createdAt = '2020-02-03',
    updatedAt = '2020-02-03',
}) => `---
title: "${title}"
slug: "${slug}"
createdAt: "${createdAt}"
updatedAt: "${updatedAt}"
tags: []
---
`;

describe('frontmatterのパース成功', () => {
    const tests = [
        {
            name: '最小構成',
            source: MINIMAL_FRONTMATTER({}),
        },
    ] satisfies { name: string; source: string }[];

    for (const { name, source } of tests) {
        test(name, () => {
            const parser = new ArticleParser(source);

            expect(parser.frontmatter).toBeDefined();
        });
    }
});

describe('frontmatterのパース失敗', () => {
    const tests = [
        {
            name: '存在しない',
            source: 'with no frontmatter',
        },
        {
            name: '閉じていない',
            source: `---
title: "The title"
date: 2021-01-01`,
        },
        {
            name: 'frontmatterの前に余分な文字列がある',
            source: `Hello${MINIMAL_FRONTMATTER}`,
        },
        {
            name: 'frontmatterの前に余分な改行がある',
            source: `\n${MINIMAL_FRONTMATTER}`,
        },
        {
            name: 'slugが空文字列',
            source: MINIMAL_FRONTMATTER({ slug: '' }),
        },
        {
            name: 'slugが大文字を含む',
            source: MINIMAL_FRONTMATTER({ slug: 'Hello-World' }),
        },
    ] satisfies { name: string; source: string }[];

    for (const { name, source } of tests) {
        test(name, () => {
            const parser = new ArticleParser(source);

            expect(() => parser.frontmatter).toThrow();
        });
    }
});

describe('parse list', () => {
    describe('success', () => {
        const tests = [
            {
                name: 'リスト1',
                source: `- list1
            `,
            },
            {
                name: 'リスト1',
                source: `
- list1
- list2
`.trim(),
            },
            {
                name: 'ネストしたリスト',
                source: `
- list1
  - list1.1
  - list1.2
- list2
- list3
  - list3.1
    - list3.1.1
    - list3.1.2
      - list3.1.2.1
  - list3.2
- list4
`.trim(),
            },
        ];

        for (const { name, source } of tests) {
            test(name, () => {
                const parser = new ArticleParser(source);

                expect(parser.root).toBeDefined();
            });
        }
    });
});
