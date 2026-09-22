import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Gallery from "../../components/Gallery";
import RouteObserver from "../../components/RouteObserver";
import { getContent } from "../../lib/data";

// Content is admin-editable JSON on disk; force every page under this layout
// to render per-request so edits made in /admin show up immediately instead
// of only after a full production rebuild.
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }) {
  const site = await getContent("site", {});
  const gallery = await getContent("gallery", { images: [] });

  return (
    <>
      <RouteObserver />
      <Navbar site={site} />
      {children}
      <Gallery images={gallery.images} />
      <Footer site={site} />
    </>
  );
}
