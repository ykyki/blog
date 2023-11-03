import path from 'node:path';
import { loadAllArticles } from 'loader';

const contentPath = path.join(process.cwd(), '..', 'content');

const articles = await loadAllArticles(contentPath);
console.log(articles[0]);
