import { Heading, Root } from './ArticleComponent';
import { Frontmatter } from './Frontmatter';

export type Article = {
    title: string;
    frontmatter: Frontmatter;
    headings: Heading[];
    root: Root;
};
