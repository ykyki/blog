import path from "node:path";
import { loadAllArticles } from "loader";
const contentPath = path.join(process.cwd(), "..", "content");
loadAllArticles(contentPath).then((articles) => {
    console.log(articles);
});
