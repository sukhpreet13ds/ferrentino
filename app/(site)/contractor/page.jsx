import { getContent } from "../../../lib/data";
import ContractorClient from "../../../components/contractor/ContractorClient";

export default async function ContractorPage() {
  const data = await getContent("contractor", {});
  return <ContractorClient data={data} />;
}
