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

type StackGroupId = "frontend" | "backend" | "data" | "tools" | "cloud" | "ai";

type StackTech = {
  id: string;
  name: string;
};

type StackGroup = {
  id: StackGroupId;
  title: string;
  items: StackTech[];
};

type BlogPlaceholder = {
  id: string;
  title: { es: string; en: string };
  excerpt: { es: string; en: string };
}

export type {
  SocialLink,
  Stat,
  ExperienceItem,
  StackGroup,
  StackGroupId,
  StackTech,
  BlogPlaceholder,
  ExperienceItemId,
};