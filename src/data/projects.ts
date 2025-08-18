import { Project } from "../types";

export const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "Plataforma de comercio electrónico completa con carrito de compras, pasarela de pagos y panel de administración.",
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express"],
    githubUrl: "https://github.com/AntRed1/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    category: "fullstack",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Aplicación de gestión de tareas con autenticación, colaboración en tiempo real y diferentes vistas.",
    image:
      "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "TypeScript", "Firebase", "Material-UI"],
    githubUrl: "https://github.com/AntRed1/task-app",
    liveUrl: "https://task-manager-demo.com",
    category: "frontend",
  },
  {
    id: 3,
    title: "API Rest Completa",
    description:
      "API RESTful con autenticación JWT, documentación Swagger y pruebas automatizadas.",
    image:
      "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "Jest"],
    githubUrl: "https://github.com/AntRed1/api-rest",
    category: "backend",
  },
  {
    id: 4,
    title: "Dashboard Analytics",
    description:
      "Dashboard interactivo con gráficos en tiempo real, filtros avanzados y exportación de datos.",
    image:
      "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React", "D3.js", "Tailwind CSS", "Chart.js"],
    githubUrl: "https://github.com/AntRed1/dashboard",
    liveUrl: "https://analytics-dashboard-demo.com",
    category: "frontend",
  },
  {
    id: 5,
    title: "Social Media App",
    description:
      "Red social con posts, comentarios, sistema de likes y chat en tiempo real.",
    image:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["React Native", "Node.js", "Socket.io", "MongoDB"],
    githubUrl: "https://github.com/AntRed1/social-app",
    category: "mobile",
  },
  {
    id: 6,
    title: "Learning Platform",
    description:
      "Plataforma educativa con cursos, videos, exámenes y seguimiento de progreso.",
    image:
      "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=800",
    technologies: ["Next.js", "Prisma", "PostgreSQL", "NextAuth"],
    githubUrl: "https://github.com/AntRed1/learning-platform",
    liveUrl: "https://learning-demo.com",
    category: "fullstack",
  },
];
