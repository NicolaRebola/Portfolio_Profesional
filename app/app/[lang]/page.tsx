import { blog } from "../_data/blog";
import { experience } from "../_data/experience";
import { socialLinks } from "../_data/social";
import { stack } from "../_data/stack";
import { stats } from "../_data/stats";
import { getDictionary } from "../_i18n/getDictionary";
import type { BlogPlaceholder, ExperienceItem, ExperienceItemId, SocialLink, StackItem, Stat } from "../_types/portfolio";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export default async function HomePage({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  
  const getExperienceDescription = (itemId: ExperienceItemId) => {
    return dict.experience.items[itemId].description;
  }

  return (
    <div>
      <h1>{dict.home.title}</h1>
      <p>Language: {lang}</p>
      <section className="my-2">
        <h2 className="text-2xl font-bold">{dict.experience.title}</h2>
        <li>
          {experience.map((post: ExperienceItem) => (
            <div key={post.role}>
              <h2>{post.role}</h2>
              <p>{post.period}</p>
              <p>{getExperienceDescription(post.itemId)}</p>
            </div>
          ))}
        </li>
      </section>
      <section className="my-2">
        <h2 className="text-2xl font-bold">{dict.stack.title}</h2>
        <li>
          {stack.map((post: StackItem) => (
            <div key={post.category}>
              <h2>{post.category}</h2>
            </div>
          ))}
        </li>
      </section>
      <section className="my-2">
        <h2 className="text-2xl font-bold">{dict.stats.title}</h2>
        <ul>
          {stats.map((post: Stat) => (
            <div key={post.labelKey}>
              <h2>{post.labelKey}</h2>
            </div>
          ))}
        </ul>
      </section>
      <section className="my-2">
        <h2 className="text-2xl font-bold">{dict.contact.title}</h2>
        <li>
          {socialLinks.map((post: SocialLink) => (
            <div key={post.label}>
              <a href={post.url}>{post.label}</a>
            </div>
          ))}
        </li>
      </section>

      <section className="my-2">
        <h2 className="text-2xl font-bold">{dict.blog.title}</h2>
        <li>
          {blog.map((post: BlogPlaceholder) => (
            <div key={post.title}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </div>
          ))}
        </li>
      </section>
    </div>
  );
}
