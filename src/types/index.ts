export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: "frontend" | "fullstack" | "mobile" | "backend";
}

export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "design";
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}
