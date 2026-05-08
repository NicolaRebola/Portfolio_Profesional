import { BlogPlaceholder } from "@/app/_types/portfolio";

export default function Blog(
  { title, description, items }: { title: string, description: string, items: BlogPlaceholder[] }
) {
  return (
    <section className="my-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      <span className="text-gray-500 italic">{description}</span>
      <ul>
        {items.map((item: BlogPlaceholder) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}