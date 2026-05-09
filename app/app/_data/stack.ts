import type { StackGroup } from "@/app/_types/portfolio";

export const stack: StackGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    items: [
      { id: "angular", name: "Angular" },
      { id: "flutter", name: "Flutter" },
      { id: "react-next", name: "React / Next.js" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    items: [
      { id: "nodejs", name: "Node.js (Express / LoopBack / Fastify)" },
      { id: "python", name: "Python (Flask)" },
      { id: "dotnet", name: ".NET (.NET Framework)" },
      { id: "java", name: "Java (Spring)" },
    ],
  },
  {
    id: "data",
    title: "Data",
    items: [
      { id: "mongodb", name: "MongoDB" },
      { id: "postgres", name: "PostgreSQL" },
      { id: "sqlserver", name: "SQL Server" },
      { id: "sqlite", name: "SQLite" },
      { id: "redis", name: "Redis" },
      { id: "qdrant", name: "Qdrant" },
      { id: "statistics", name: "Statistics" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    items: [
      { id: "docker", name: "Docker" },
      { id: "dcron", name: "DKron" },
      { id: "kafka", name: "Kafka" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud / Infrastructure",
    items: [
      { id: "aws", name: "AWS" },
      { id: "azure", name: "Azure" },
      { id: "k8s", name: "Kubernetes" },
    ],
  },
  {
    id: "ai",
    title: "AI",
    items: [
      { id: "prompting", name: "Prompting" },
      { id: "llms", name: "LLMs" },
      { id: "algorithms", name: "Algorithms" },
      { id: "rag", name: "RAG" },
    ],
  },
];