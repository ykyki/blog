import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeStringify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import { loadAllArticles } from 'loader';

const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkRehype)
    .use(rehypeStringify);

const contentPath = path.join(process.cwd(), '..', 'content');

const articles = await loadAllArticles(contentPath);
// console.log(articles[0]);

const processorResult = await processor.process(articles[0].getSource());
console.log(processorResult);
