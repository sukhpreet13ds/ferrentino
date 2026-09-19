import { getContent } from "../../../lib/data";
import AskToExpertClient from "../../../components/ask-to-expert/AskToExpertClient";

export default function AskToExpertPage() {
  const data = getContent("ask-to-expert", { articles: [] });
  return <AskToExpertClient data={data} />;
}
