import { getContent } from "../../../lib/data";
import ArticleClient from "../../../components/article/ArticleClient";

export default function ArticlePage() {
  const data = getContent("article", {});
  return <ArticleClient data={data} />;
}
