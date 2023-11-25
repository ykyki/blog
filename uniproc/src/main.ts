import path from 'node:path';
import { loadAllArticleEntities } from '@src/loader';

const contentPath = path.join(process.cwd(), '..', 'content');

const articles = await loadAllArticleEntities(contentPath);
// console.log(articles.map((article) => article.frontmatter));

const article = articles[3];

console.log('------------------');

// console.log(tree);
// console.log(tree.children);
// console.log(tree.children[0]);
// console.log(tree.children[1]);
// console.log(tree.children[2]);
// for (let i = 0; i < 7; i++) {
//     console.log(tree.children[i]);
// }
// console.log(JSON.stringify(tree.children, null, 2));

// visit(tree, (node) => {
//     console.log(node);
// });

article.body.components.forEach((c, i) => {
    console.log('index', i, 'component', c);
});
