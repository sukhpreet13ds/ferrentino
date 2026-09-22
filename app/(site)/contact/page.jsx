import { getContent } from "../../../lib/data";
import ContactClient from "../../../components/contact/ContactClient";

export default async function ContactPage() {
  const data = await getContent("contact", {});
  return <ContactClient data={data} />;
}
