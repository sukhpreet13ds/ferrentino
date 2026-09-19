import { notFound } from "next/navigation";
import { getContent } from "../../../../lib/data";
import AreaDetailClient from "../../../../components/areas/AreaDetailClient";

// Content is admin-editable JSON; always render fresh on every request so
// edits show up immediately instead of only after a rebuild. (No
// generateStaticParams here on purpose — that would bake these specific
// slugs into static HTML at build time regardless of this setting.)
export const dynamic = "force-dynamic";

export default async function AreaDetailPage({ params }) {
  const { slug } = await params;
  const data = getContent("areas", { items: [] });
  const area = (data.items || []).find((item) => item.slug === slug);

  if (!area) {
    notFound();
  }

  return (
    <AreaDetailClient
      area={area}
      stats={data.stats}
      specialtyServices={data.specialtyServices}
      specialtyServicesTitle={data.specialtyServicesTitle}
      specialtyServicesDesc={data.specialtyServicesDesc}
      blueprintTitle={data.blueprintTitle}
      blueprintDesc={data.blueprintDesc}
      blueprintSteps={data.blueprintSteps}
    />
  );
}
