import { getContent } from "../../../lib/data";
import ServicesListClient from "../../../components/services/ServicesListClient";

export default async function ServicesPage() {
  const data = await getContent("services", { items: [] });
  return <ServicesListClient data={data} />;
}
