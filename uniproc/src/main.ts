import path from 'node:path';
import { loadAllArticleEntities } from '@src/loader';

const contentPath = path.join(process.cwd(), '..', 'content');

const articles = await loadAllArticleEntities(contentPath);
articles.forEach((a) => {
	console.log(a.frontmatter);
});

const article = articles[1];

// article.root.children
// 	// .filter((c) => c.type === 'heading')
// 	.forEach((c, i) => {
// 		console.log('index', i, 'component', c);
// 	});
