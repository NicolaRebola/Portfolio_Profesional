import { ExperienceItem } from "@/app/_types/portfolio";

export default function Experience(
  { title, description, items }: { title: string, description: string, items: (ExperienceItem & { description: string })[] }
) {
  
  return (
    <section className="my-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      <span className="text-gray-500 italic">{description}</span>
        {items.map((item: ExperienceItem & { description: string }) => (
          <li key={item.itemId} className="w-full my-1 list-disc list-inside">
            <h3>{item.role}</h3>
            <p>{item.period}</p>
            <p>{item.description}</p>
          </li>
        ))}
    </section>
  );
}