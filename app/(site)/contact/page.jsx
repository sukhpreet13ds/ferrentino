import { getContent } from "../../../lib/data";
import ContactClient from "../../../components/contact/ContactClient";

export default function ContactPage() {
  const data = getContent("contact", {});
  return <ContactClient data={data} />;
}
