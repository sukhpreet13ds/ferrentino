import { getContent } from "../../../lib/data";
import ProjectsListClient from "../../../components/projects/ProjectsListClient";

export default function ProjectsPage() {
  const data = getContent("projects", { items: [] });
  return <ProjectsListClient data={data} />;
}
