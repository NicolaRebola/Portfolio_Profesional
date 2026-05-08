import About from "../_components/landing/About";
import Blog from "../_components/landing/Blog";
import Experience from "../_components/landing/Experience";
import Footer from "../_components/landing/Footer";
import Hero from "../_components/landing/Hero";
import Nav from "../_components/landing/Nav";
import Stack from "../_components/landing/Stack";
import Stats from "../_components/landing/Stats";
import { blog } from "../_data/blog";
import { experience } from "../_data/experience";
import { socialLinks } from "../_data/social";
import { stack } from "../_data/stack";
import { stats } from "../_data/stats";
import { getDictionary } from "../_i18n/getDictionary";
import type { ExperienceItemId } from "../_types/portfolio";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export default async function HomePage({ params }: { params: { lang: string } }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  
  const getExperienceDescription = (itemId: ExperienceItemId) => {
    return dict.experience.items[itemId].description;
  }

  const mappedExperience = experience.map((item) => ({
    ...item,
    description: getExperienceDescription(item.itemId)
  }));

  const mappedStats = stats.map((s) => ({
    ...s,
    label: dict.stats.labels[s.id],
  }));

  return (
    <div className="flex flex-col gap-4 p-5">
      <Nav/>
      <Hero
        tag={dict.hero.eyebrow}
        titlePlain={dict.hero.title}
        titleGradient={dict.hero.subtitle}
        subtitle={dict.hero.subtitle}
        ctaPrimary={{ label: dict.hero.ctaPrimary.label, href: dict.hero.ctaPrimary.href }}
        ctaSecondary={{ label: dict.hero.ctaSecondary.label, href: dict.hero.ctaSecondary.href }}
      />
      <About
        title={dict.about.title}
        description={dict.about.description}
        paragraphs={dict.about.paragraphs}
        statsTitle={dict.stats.title}
        stats={mappedStats}
        pillars={dict.about.pillars}
      />
      <Experience title={dict.experience.title} description={dict.experience.description} items={mappedExperience} />
      <Stack title={dict.stack.title} description={dict.stack.description} items={stack} />
      <Stats
        title={dict.stats.title}
        description={dict.stats.description}
        items={stats}
        labels={dict.stats.labels}
      />
      <Blog title={dict.blog.title} description={dict.blog.description} items={blog} />
      <Footer contacts={socialLinks} />
    </div>
  );
}
