import type { BlogPlaceholder } from "@/app/_types/portfolio";

export const blog: BlogPlaceholder[] = [
  {
    id: "business-first",
    title: {
      en: "Why I start every project by refusing to write code",
      es: "Por qué empiezo cada proyecto negándome a escribir código",
    },
    excerpt: {
      en: "Business requirements first, technology second. A framework for identifying where software actually creates value.",
      es: "Negocio primero, tecnología segundo. Un marco para detectar dónde el software realmente crea valor.",
    },
  },
  {
    id: "angularjs-migration",
    title: {
      en: "Migrating a legacy AngularJS codebase without burning it down",
      es: "Migrar un AngularJS legacy sin prender fuego todo",
    },
    excerpt: {
      en: "Practical patterns for incremental migrations: what I learned refactoring production systems at scale.",
      es: "Patrones prácticos para migraciones incrementales: aprendizajes refactorizando sistemas en producción a escala.",
    },
  },
];