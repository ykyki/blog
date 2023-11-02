export declare class Article {
    private title;
    private source;
    constructor(title: string, source: string);
    getTitle(): string;
    getSource(): string;
}
export declare const readAllArticles: () => Promise<Article[]>;
