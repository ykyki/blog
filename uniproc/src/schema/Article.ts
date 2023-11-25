import { ArticleComponent, Heading } from '@src/schema/ArticleComponent';
import { Frontmatter } from '@src/schema/Frontmatter';

export type Article = {
    title: string;
    frontmatter: Frontmatter;
};

export type ArticleBody = {
    headings: Heading[];
    components: ArticleComponent[];
};
