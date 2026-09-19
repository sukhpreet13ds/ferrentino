import { getContent } from "../../../lib/data";
import AreaWeServeListClient from "../../../components/areas/AreaWeServeListClient";

export default function AreaWeServePage() {
  const data = getContent("areas", { items: [] });
  return <AreaWeServeListClient data={data} />;
}
