import { getContent } from "../../../lib/data";
import ContractorClient from "../../../components/contractor/ContractorClient";

export default function ContractorPage() {
  const data = getContent("contractor", {});
  return <ContractorClient data={data} />;
}
