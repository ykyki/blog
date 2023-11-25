import { expect, test, describe } from 'bun:test';
import path from 'node:path';
import { loadAllArticleEntityList } from '@src/loader';

const contentPath = path.join(process.cwd(), '..', 'content');

test('loadAllArticleEntityListに成功', async () => {
    expect(async () => {
        await loadAllArticleEntityList(contentPath);
    }).not.toThrow();
});

describe('各要素の読み込みに成功', async () => {
    const articles = await loadAllArticleEntityList(contentPath);

    articles.forEach((article) => {
        test(article.path, () => {
            // TODO 明確なassertionを書く
            expect(article.title).toBeTruthy();
            expect(article.frontmatter).toBeTruthy();
            expect(article.body).toBeTruthy();
        });
    });
});
