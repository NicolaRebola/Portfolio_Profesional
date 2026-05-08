import { Stat } from "@/app/_types/portfolio";

export default function Blog(
  { title, description, items }: { title: string, description: string, items: Stat[] }
) {
  return (
    <section id="stats" className="my-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      <span className="text-gray-500 italic">{description}</span>
      <ul className="list-disc list-inside w-full">
        {items.map((item: Stat) => (
          <li key={item.labelKey}>
            <h3>{item.labelKey}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}