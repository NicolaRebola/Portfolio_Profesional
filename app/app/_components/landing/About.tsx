export default function About(
  { title, description}: { title: string, description: string }
) {
  return (
    <section id="about" className="my-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      <span className="text-gray-500 italic">{description}</span>
    </section>
  );
}