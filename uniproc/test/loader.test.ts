import { expect, test } from 'bun:test';
import path from 'node:path';
import { loadAllArticleEntityList } from '@src/loader';

test('load all articles from content/ without exception', async () => {
    const contentPath = path.join(process.cwd(), '..', 'content');

    const articles = await loadAllArticleEntityList(contentPath);

    // TODO 明確なassertionを書く
    articles.forEach((article) => {
        expect(article.title).toBeTruthy();
        expect(article.frontmatter).toBeTruthy();
        expect(article.body).toBeTruthy();
    });
});
