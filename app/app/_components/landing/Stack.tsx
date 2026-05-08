import { StackItem } from "@/app/_types/portfolio";

export default function Stack(
  { title, description, items }: { title: string, description: string, items: StackItem[] }
) {
  return (
    <section id="stack" className="my-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      <span className="text-gray-500 italic">{description}</span>
      <ul>
        {items.map((item: StackItem) => (
          <li key={item.category}>
            <h3>{item.category}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}