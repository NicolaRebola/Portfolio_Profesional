import { getDictionary } from "../_i18n/getDictionary";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export default async function HomePage({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return (
    <div>
      <h1>{dict.home.title}</h1>
      <p>Language: {lang}</p>
    </div>
  );
}
