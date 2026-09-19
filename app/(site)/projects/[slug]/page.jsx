import { notFound } from "next/navigation";
import { getContent } from "../../../../lib/data";
import ProjectDetailClient from "../../../../components/projects/ProjectDetailClient";

// Content is admin-editable JSON; always render fresh on every request so
// edits show up immediately instead of only after a rebuild. (No
// generateStaticParams here on purpose — that would bake these specific
// slugs into static HTML at build time regardless of this setting.)
export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const data = getContent("projects", { items: [] });
  const items = data.items || [];
  const project = items.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const otherProjects = items.filter((item) => item.slug !== slug).slice(0, 2);

  return <ProjectDetailClient project={project} otherProjects={otherProjects} />;
}
