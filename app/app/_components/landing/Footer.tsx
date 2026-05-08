import { SocialLink } from "@/app/_types/portfolio";
import Link from "next/link";

export default function Footer(
  { contacts }: { contacts: SocialLink[] }
) {
  return (
    <section id="footer" className="my-2 border-t p-4 flex flex-row gap-4">
      {contacts.map((contact: SocialLink) => (
        <li key={contact.id} className="border-x mx-2 px-4">
          <Link href={contact.url}>{contact.label}</Link>
        </li>
      ))}
    </section>
  );
}