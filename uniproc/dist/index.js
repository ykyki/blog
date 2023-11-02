import path from "node:path";
import fs from "node:fs/promises";
export class Article {
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
const contentPath = path.join(process.cwd(), "..", "content");
const articlePath = path.join(contentPath, "2021");
export const readAllArticles = async () => {
    const files = await fs.readdir(articlePath);
    // TODO ひとつでも失敗が発生したときにエラーになってしまう。失敗が発生したとしても継続できるようにする
    const articles = await Promise.all(files
        .map((filename) => path.join(articlePath, filename))
        .map(async (filepath) => new Article(filepath.split("/").pop(), await fs.readFile(filepath, "utf-8"))));
    return articles;
};
console.log(articlePath);
readAllArticles().then((articles) => {
    console.log(articles);
});
