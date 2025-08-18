import { Skill } from "../types";

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 95, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "JavaScript", level: 95, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "Vue.js", level: 75, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "SASS/SCSS", level: 85, category: "frontend" },

  // Backend
  { name: "Node.js", level: 90, category: "backend" },
  { name: "Express.js", level: 85, category: "backend" },
  { name: "Python", level: 80, category: "backend" },
  { name: "PostgreSQL", level: 85, category: "backend" },
  { name: "MongoDB", level: 80, category: "backend" },
  { name: "GraphQL", level: 75, category: "backend" },

  // Tools
  { name: "Git & GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 80, category: "tools" },
  { name: "AWS", level: 75, category: "tools" },
  { name: "Jest", level: 85, category: "tools" },
  { name: "Vite", level: 90, category: "tools" },
  { name: "Webpack", level: 80, category: "tools" },

  // Design
  { name: "Figma", level: 85, category: "design" },
  { name: "UI/UX Design", level: 80, category: "design" },
  { name: "Adobe Creative Suite", level: 75, category: "design" },
];
