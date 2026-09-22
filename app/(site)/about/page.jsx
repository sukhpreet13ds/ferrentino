import { getContent } from "../../../lib/data";
import AboutClient from "../../../components/about/AboutClient";

export default async function AboutPage() {
  const data = await getContent("about", {});
  return <AboutClient data={data} />;
}
