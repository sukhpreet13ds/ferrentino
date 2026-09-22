import { getContent } from "../../../lib/data";
import EstimatorClient from "../../../components/estimator/EstimatorClient";

export default async function EstimatorPage() {
  const config = await getContent("estimator", {
    hero: {},
    catalog: [],
    globalAddons: [],
    contingency: {},
    permitFormulas: {},
    modal: {}
  });
  return <EstimatorClient config={config} />;
}
