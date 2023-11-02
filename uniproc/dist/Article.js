export default class Article {
    title;
    source;
    constructor(title, source) {
        this.title = title;
        this.source = source;
    }
    getTitle() {
        return this.title;
    }
    getSource() {
        return this.source;
    }
}
