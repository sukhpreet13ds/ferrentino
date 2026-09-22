import { getContent } from "../../../lib/data";
import AreaWeServeListClient from "../../../components/areas/AreaWeServeListClient";

export default async function AreaWeServePage() {
  const data = await getContent("areas", { items: [] });
  return <AreaWeServeListClient data={data} />;
}
