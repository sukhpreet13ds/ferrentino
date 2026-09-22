import { getContent } from "../../../lib/data";
import ArticleClient from "../../../components/article/ArticleClient";

export default async function ArticlePage() {
  const data = await getContent("article", {});
  return <ArticleClient data={data} />;
}
