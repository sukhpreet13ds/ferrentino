import { getContent } from "../../../lib/data";
import AskToExpertClient from "../../../components/ask-to-expert/AskToExpertClient";

export default async function AskToExpertPage() {
  const data = await getContent("ask-to-expert", { articles: [] });
  return <AskToExpertClient data={data} />;
}
