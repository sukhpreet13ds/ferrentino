import { getContent } from "../../../lib/data";
import TestimonialsClient from "../../../components/testimonials/TestimonialsClient";

export default async function TestimonialsPage() {
  const data = await getContent("testimonials", { stories: [], reviews: [] });
  return <TestimonialsClient data={data} />;
}
