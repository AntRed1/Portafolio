import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  es: {
    // Header
    "nav.home": "Inicio",
    "nav.about": "Sobre mí",
    "nav.projects": "Proyectos",
    "nav.skills": "Habilidades",
    "nav.contact": "Contacto",

    // Hero
    "hero.greeting": "Hola, soy",
    "hero.name": "Anthony Rojas",
    "hero.title": "Arquitecto de Software y Cloud",
    "hero.description":
      "Diseño y desarrollo soluciones digitales completas, integrando arquitectura de software, infraestructura cloud en Azure y AWS, automatización DevOps y tecnologías modernas como React, Angular y Node.js. Transformo ideas en sistemas escalables, seguros y altamente eficientes, optimizando tanto el desarrollo como la operación.",
    "hero.viewProjects": "Ver Proyectos",
    "hero.downloadCV": "Descargar CV",
    "hero.available": "Disponible",

    // About
    "about.title": "Sobre Mí",
    "about.subtitle":
      "Soy un arquitecto de software apasionado por crear soluciones digitales que impacten de manera positiva",
    "about.myStory": "Mi Historia",
    "about.description1":
      "Con más de 3 años de experiencia en desarrollo web y arquitectura de software, he liderado proyectos desde startups hasta grandes empresas, diseñando sistemas escalables, seguros y mantenibles.",
    "about.description2":
      "Mi interés por la tecnología comenzó en la universidad, donde descubrí cómo la programación puede resolver problemas reales. Desde entonces, me he especializado en arquitectura cloud, DevOps y desarrollo Full Stack, siempre aprendiendo y adaptándome a nuevas tecnologías.",
    "about.description3":
      "Fuera del código, contribuyo a proyectos de código abierto, escribo artículos técnicos y exploro nuevas tendencias en cloud, seguridad y desarrollo de software.",
    "about.whyWorkWithMe": "¿Por qué trabajar conmigo?",
    "about.fullStackDev": "Arquitectura y Desarrollo Full Stack",
    "about.fullStackDesc":
      "Experiencia completa en diseño de arquitectura, desarrollo frontend y backend, integrando mejores prácticas de cloud y DevOps",
    "about.creativeSolutions": "Soluciones Innovadoras",
    "about.creativeSolutionsDesc":
      "Diseño de soluciones creativas y escalables para resolver problemas complejos con eficiencia",
    "about.teamwork": "Trabajo en Equipo",
    "about.teamworkDesc":
      "Colaboración efectiva en equipos ágiles y multidisciplinarios, liderando y guiando buenas prácticas",
    "about.continuousLearning": "Aprendizaje Continuo",
    "about.continuousLearningDesc":
      "Siempre actualizándome con las últimas tendencias en cloud, arquitectura, seguridad y desarrollo",

    // Projects
    "projects.title": "Mis Proyectos",
    "projects.subtitle":
      "Una selección de proyectos que demuestran mis habilidades y pasión por el desarrollo",
    "projects.all": "Todos",
    "projects.frontend": "Frontend",
    "projects.fullstack": "Full Stack",
    "projects.backend": "Backend",
    "projects.mobile": "Mobile",

    // En el objeto translations.es:
    "skills.cloud.title": "Cloud & DevOps",
    "skills.automation.title": "Automatización & CI/CD",
    "skills.development.title": "Desarrollo",
    "skills.monitoring.title": "Monitoreo & Observabilidad",
    "skills.database.title": "Bases de Datos",
    "skills.systems.title": "Sistemas & Fintech",
    "skills.security.title": "Seguridad & Cumplimiento",
    "skills.management.title": "Gestión & Metodologías",

    // Skills
    "skills.title": "Habilidades Técnicas",
    "skills.subtitle": "Tecnologías y herramientas que domino",
    "skills.cloud": [
      "Azure (Pipelines, AKS, Monitor, Key Vault)",
      "AWS (EC2, S3, RDS, IAM)",
      "Docker & Kubernetes",
      "Terraform",
      "GitHub Actions",
    ],
    "skills.automation": [
      "ARM Templates",
      "PowerShell & Bash",
      "Azure CLI",
      "NGINX",
      "Azure DevOps & Maven",
      "npm & scripting",
    ],
    "skills.development": [
      "Java 8+",
      "Spring Boot",
      "Angular & React",
      "TypeScript / JavaScript",
      "HTML5 & CSS3",
      "REST APIs & Microservicios",
    ],
    "skills.monitoring": [
      "Dynatrace",
      "SCOM & SolarWinds",
      "Azure Monitor & Log Analytics",
      "Dashboards y alertas de rendimiento",
    ],
    "skills.database": [
      "Oracle",
      "SQL Server",
      "IBM DB2 & AS400",
      "MySQL & PostgreSQL",
      "Optimización de consultas críticas",
    ],
    "skills.systems": [
      "Linux & Unix",
      "AS400 & IBM Bus Service",
      "Integración con medios de pago",
      "Alta disponibilidad & continuidad operativa",
    ],
    "skills.security": [
      "Gestión de identidades",
      "Políticas en la nube",
      "Mitigación de riesgos",
      "Cumplimiento normativo y auditorías",
    ],
    "skills.management": [
      "ITIL & Control de Cambios",
      "Jira, Scrum, Kanban, Agile",
      "Gestión de releases & equipos cross-funcionales",
    ],

    // Contact
    "contact.title": "Contacto",
    "contact.subtitle":
      "¿Tienes un proyecto en mente? Me encantaría escucharlo y ayudarte a hacerlo realidad",
    "contact.info": "Información de Contacto",
    "contact.infoDesc":
      "No dudes en contactarme para discutir oportunidades de colaboración o simplemente para saludar.",
    "contact.email": "Email",
    "contact.phone": "Teléfono",
    "contact.location": "Ubicación",
    "contact.sendMessage": "Envíame un mensaje",
    "contact.name": "Nombre",
    "contact.subject": "Asunto",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.sending": "Enviando...",
    "contact.success": "¡Mensaje enviado exitosamente! Te contactaré pronto.",
    "contact.namePlaceholder": "Tu nombre",
    "contact.subjectPlaceholder": "Asunto del mensaje",
    "contact.messagePlaceholder": "Cuéntame sobre tu proyecto...",

    // Footer
    "footer.description":
      "Arquitecto de Software y Cloud apasionado por crear soluciones digitales innovadoras y escalables que generen impacto.",
    "footer.quickLinks": "Enlaces Rápidos",
    "footer.contact": "Contacto",
    "footer.madeWith": "Hecho con",
    "footer.by": "por",
    "footer.backToTop": "Volver arriba",
  },
  en: {
    // Header
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.name": "Anthony Rojas",
    "hero.title": "Software & Cloud Architect",
    "hero.description":
      "I design and develop complete digital solutions, combining software architecture, cloud infrastructure on Azure and AWS, DevOps automation, and modern technologies like React, Angular, and Node.js. I turn ideas into scalable, secure, and highly efficient systems, optimizing both development and operations.",
    "hero.viewProjects": "View Projects",
    "hero.downloadCV": "Download CV",
    "hero.available": "Available",

    // About
    "about.title": "About Me",
    "about.subtitle":
      "I'm a software architect passionate about creating digital solutions that make a positive impact",
    "about.myStory": "My Story",
    "about.description1":
      "With over 3 years of experience in web development and software architecture, I have led projects from startups to large enterprises, designing scalable, secure, and maintainable systems.",
    "about.description2":
      "My interest in technology started in college, where I discovered how programming can solve real problems. Since then, I have specialized in cloud architecture, DevOps, and Full Stack development, constantly learning and adapting to new technologies.",
    "about.description3":
      "Outside of coding, I contribute to open source projects, write technical articles, and explore emerging trends in cloud, security, and software development.",
    "about.whyWorkWithMe": "Why work with me?",
    "about.fullStackDev": "Architecture & Full Stack Development",
    "about.fullStackDesc":
      "Comprehensive experience in architecture design, frontend and backend development, integrating best practices in cloud and DevOps",
    "about.creativeSolutions": "Innovative Solutions",
    "about.creativeSolutionsDesc":
      "Designing creative and scalable solutions to solve complex problems efficiently",
    "about.teamwork": "Teamwork",
    "about.teamworkDesc":
      "Effective collaboration in agile and multidisciplinary teams, leading and guiding best practices",
    "about.continuousLearning": "Continuous Learning",
    "about.continuousLearningDesc":
      "Always staying updated with the latest trends in cloud, architecture, security, and development",

    // Projects
    "projects.title": "My Projects",
    "projects.subtitle":
      "A selection of projects that demonstrate my skills and passion for development",
    "projects.all": "All",
    "projects.frontend": "Frontend",
    "projects.fullstack": "Full Stack",
    "projects.backend": "Backend",
    "projects.mobile": "Mobile",

    // En el objeto translations.en:
    "skills.cloud.title": "Cloud & DevOps",
    "skills.automation.title": "Automation & CI/CD",
    "skills.development.title": "Development",
    "skills.monitoring.title": "Monitoring & Observability",
    "skills.database.title": "Databases",
    "skills.systems.title": "Systems & Fintech",
    "skills.security.title": "Security & Compliance",
    "skills.management.title": "Management & Methodologies",

    // Skills
    "skills.title": "Technical Skills",
    "skills.subtitle": "Technologies and tools I master",
    "skills.cloud": [
      "Azure (Pipelines, AKS, Monitor, Key Vault)",
      "AWS (EC2, S3, RDS, IAM)",
      "Docker & Kubernetes",
      "Terraform",
      "GitHub Actions",
    ],
    "skills.automation": [
      "ARM Templates",
      "PowerShell & Bash",
      "Azure CLI",
      "NGINX",
      "Azure DevOps & Maven",
      "npm & scripting",
    ],
    "skills.development": [
      "Java 8+",
      "Spring Boot",
      "Angular & React",
      "TypeScript / JavaScript",
      "HTML5 & CSS3",
      "REST APIs & Microservices",
    ],
    "skills.monitoring": [
      "Dynatrace",
      "SCOM & SolarWinds",
      "Azure Monitor & Log Analytics",
      "Dashboards & performance alerts",
    ],
    "skills.database": [
      "Oracle",
      "SQL Server",
      "IBM DB2 & AS400",
      "MySQL & PostgreSQL",
      "Query optimization in critical systems",
    ],
    "skills.systems": [
      "Linux & Unix",
      "AS400 & IBM Bus Service",
      "Payment gateway integration",
      "High availability & business continuity",
    ],
    "skills.security": [
      "Identity management",
      "Cloud policies",
      "Risk mitigation",
      "Regulatory compliance & audits",
    ],
    "skills.management": [
      "ITIL & Change Control",
      "Jira, Scrum, Kanban, Agile",
      "Release management & cross-functional teams",
    ],

    // Contact
    "contact.title": "Contact",
    "contact.subtitle":
      "Have a project in mind? I'd love to hear about it and help you make it a reality",
    "contact.info": "Contact Information",
    "contact.infoDesc":
      "Feel free to contact me to discuss collaboration opportunities or just to say hello.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.sendMessage": "Send me a message",
    "contact.name": "Name",
    "contact.subject": "Subject",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully! I'll contact you soon.",
    "contact.namePlaceholder": "Your name",
    "contact.subjectPlaceholder": "Message subject",
    "contact.messagePlaceholder": "Tell me about your project...",

    // Footer
    "footer.description":
      "Software & Cloud Architect passionate about creating innovative and scalable digital solutions that make an impact.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.madeWith": "Made with",
    "footer.by": "by",
    "footer.backToTop": "Back to top",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("es");

  const t = (key: string): string | string[] => {
    return (
      translations[language][key as keyof (typeof translations)["es"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
