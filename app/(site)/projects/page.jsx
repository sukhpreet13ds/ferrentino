import { getContent } from "../../../lib/data";
import ProjectsListClient from "../../../components/projects/ProjectsListClient";

export default async function ProjectsPage() {
  const data = await getContent("projects", { items: [] });
  return <ProjectsListClient data={data} />;
}
