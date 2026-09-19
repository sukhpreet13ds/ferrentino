import { getContent } from "../../../lib/data";
import TestimonialsClient from "../../../components/testimonials/TestimonialsClient";

export default function TestimonialsPage() {
  const data = getContent("testimonials", { stories: [], reviews: [] });
  return <TestimonialsClient data={data} />;
}
