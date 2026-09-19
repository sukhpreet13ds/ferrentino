import { notFound } from "next/navigation";
import { getContent } from "../../../../lib/data";
import ServiceDetailClient from "../../../../components/services/ServiceDetailClient";

// Content is admin-editable JSON; always render fresh on every request so
// edits show up immediately instead of only after a rebuild. (No
// generateStaticParams here on purpose — that would bake these specific
// slugs into static HTML at build time regardless of this setting.)
export const dynamic = "force-dynamic";

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const data = getContent("services", { items: [] });
  const service = (data.items || []).find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <ServiceDetailClient
      service={service}
      process={data.process}
      whyUs={data.whyUs}
      testimonial={data.testimonial}
    />
  );
}
