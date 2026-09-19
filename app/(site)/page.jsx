import { getContent } from "../../lib/data";
import HomeClient from "../../components/home/HomeClient";

export default function HomePage() {
  const home = getContent("home", {});
  const servicesData = getContent("services", { items: [] });
  const projectsData = getContent("projects", { items: [] });

  const services = servicesData.items || [];
  const projects = (projectsData.items || []).slice(0, 5).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    image: p.heroImage,
  }));

  return <HomeClient data={home} services={services} projects={projects} />;
}
