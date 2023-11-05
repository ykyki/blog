import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { loadAllArticles } from './loader';

const contentPath = path.join(process.cwd(), '..', 'content');

const articles = await loadAllArticles(contentPath);
console.log(articles.map((article) => article.frontmatter));

const tree = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkGfm, { singleTilde: false })
    .use(remarkMath, { singleDollarTextMath: true })
    .parse(articles[3].source);

// console.log(tree);
// console.log(tree.children);
console.log(tree.children[0]);
// console.log(tree.children[1]);
// console.log(tree.children[2]);
// for (let i = 0; i < 7; i++) {
//     console.log(tree.children[i]);
// }
// console.log(JSON.stringify(tree.children, null, 2));
