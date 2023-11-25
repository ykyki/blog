import { expect, test, describe } from 'bun:test';
import path from 'node:path';
import { loadAllArticleEntities, loadAllArticles } from '@src/loader';

const contentPath = path.join(process.cwd(), '..', 'content');

describe('loadAllArticleEntities', () => {
    test('成功', async () => {
        expect(async () => {
            await loadAllArticleEntities(contentPath);
        }).not.toThrow();
    });

    describe('各要素の読み込みに成功', async () => {
        const articles = await loadAllArticleEntities(contentPath);

        articles.forEach((article) => {
            test(article.path, () => {
                // TODO 明確なassertionを書く
                expect(article.title).toBeTruthy();
                expect(article.frontmatter).toBeTruthy();
                expect(article.body).toBeTruthy();
            });
        });
    });
});

describe('loadAllArticles', () => {
    test('成功', async () => {
        expect(async () => {
            await loadAllArticles(contentPath);
        }).not.toThrow();
    });
});
