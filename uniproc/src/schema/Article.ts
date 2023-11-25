import { ArticleComponent, Heading } from './ArticleComponent';
import { Frontmatter } from './Frontmatter';

export type Article = {
    title: string;
    frontmatter: Frontmatter;
};

export type ArticleBody = {
    headings: Heading[];
    components: ArticleComponent[];
};
