import path from 'node:path';
import { loadAllArticleEntities } from '@src/loader';

const contentPath = path.join(process.cwd(), '..', 'content');

const articles = await loadAllArticleEntities(contentPath);
const article = articles[3];

console.log('------------------');

article.root.children
    .filter((c) => c.type === 'heading')
    .forEach((c, i) => {
        console.log('index', i, 'component', c);
    });
// for (const [i, c] of article.root.children.filter((c) => c.type === 'heading').entries()) {
//         console.log('index', i, 'component', c);
// }
