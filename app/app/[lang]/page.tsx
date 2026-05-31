import About from "../_components/landing/About";
import Blog from "../_components/landing/Blog";
import Experience from "../_components/landing/Experience";
import Footer from "../_components/landing/Footer";
import Hero from "../_components/landing/Hero";
import Nav from "../_components/landing/Nav";
import Stack from "../_components/landing/Stack";
import { experience } from "../_data/experience";
import { socialLinks } from "../_data/social";
import { stack } from "../_data/stack";
import { getDictionary } from "../_i18n/getDictionary";
import type { ExperienceItemId } from "../_types/portfolio";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export default async function HomePage({ params }: { params: Promise<{ lang: "es" | "en" }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  
  const getExperienceDescription = (itemId: ExperienceItemId) => {
    return dict.experience.items[itemId];
  }

  const mappedExperience = experience.map((item) => ({
    ...item,
    content: getExperienceDescription(item.itemId)
  }));

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col overflow-x-hidden">
      <Nav lang={lang} nav={dict.nav} />
      <Hero
        tag={dict.hero.eyebrow}
        titlePlain={dict.hero.title}
        titleGradient={dict.hero.subtitle}
        description={dict.hero.description}
        ctaPrimary={{ label: dict.hero.ctaPrimary.label, href: dict.hero.ctaPrimary.href }}
        ctaSecondary={{ label: dict.hero.ctaSecondary.label, href: dict.hero.ctaSecondary.href }}
      />
      <About
        eyebrow={dict.nav.about}
        headline={dict.about.headline}
        description={dict.about.description}
        paragraphs={dict.about.paragraphs}
        pillars={dict.about.pillars}
      />
      <Experience
        title={dict.experience.title}
        description={dict.experience.description}
        items={mappedExperience}
      />
      <Stack title={dict.stack.title} description={dict.stack.description} items={stack} />
      <Blog
        title={dict.blog.title}
        description={dict.blog.description}
        comingSoon={dict.blog.comingSoon}
        banner={dict.blog.banner}
      />
      <Footer
        title={dict.footer.title}
        rights={dict.footer.rights}
        contacts={socialLinks}
      />
    </div>
  );
}
