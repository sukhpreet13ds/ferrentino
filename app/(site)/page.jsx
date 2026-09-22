import { getContent } from "../../lib/data";
import HomeClient from "../../components/home/HomeClient";

export default async function HomePage() {
  const [home, servicesData, projectsData] = await Promise.all([
    getContent("home", {}),
    getContent("services", { items: [] }),
    getContent("projects", { items: [] }),
  ]);

  const services = servicesData.items || [];
  const projects = (projectsData.items || []).slice(0, 5).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    image: p.heroImage,
  }));

  return <HomeClient data={home} services={services} projects={projects} />;
}
