export default class Article {
    private title: string;
    private source: string;

    constructor(title: string, source: string) {
        this.title = title;
        this.source = source;
    }

    getTitle(): string {
        return this.title;
    }

    getSource(): string {
        return this.source;
    }
}
