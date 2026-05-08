type SocialLink = {
  id: string;
  label: string;
  url: string;
  icon: string;
}

type Stat = {
  id: "software" | "dataAI" | "people" | "process";
  value: string;
}

type ExperienceItemId = 'data-analyst' | 'full-stack-developer' | 'tech-lead';

type ExperienceItem = {
  itemId: ExperienceItemId;
  role: string;
  period: string;
}

type StackItem = {
  category: string;
}

type BlogPlaceholder = {
  title: string;
  excerpt: string;
}

export type { SocialLink, Stat, ExperienceItem, StackItem, BlogPlaceholder, ExperienceItemId };