import { getContent } from "../../../lib/data";
import AboutClient from "../../../components/about/AboutClient";

export default function AboutPage() {
  const data = getContent("about", {});
  return <AboutClient data={data} />;
}
