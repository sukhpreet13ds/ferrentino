import { getContent } from "../../../lib/data";
import ServicesListClient from "../../../components/services/ServicesListClient";

export default function ServicesPage() {
  const data = getContent("services", { items: [] });
  return <ServicesListClient data={data} />;
}
