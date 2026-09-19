import { getContent } from "../../../lib/data";
import EstimatorClient from "../../../components/estimator/EstimatorClient";

export default function EstimatorPage() {
  const config = getContent("estimator", {
    hero: {},
    catalog: [],
    globalAddons: [],
    contingency: {},
    permitFormulas: {},
    modal: {}
  });
  return <EstimatorClient config={config} />;
}
