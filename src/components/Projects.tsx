import React, { useState, useRef, useEffect } from "react";
import {
  Github,
  ExternalLink,
  Search,
  Star,
  GitFork,
  Loader2,
  AlertTriangle,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../context/LanguageContext";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

interface ProjectWithLanguages extends GitHubRepo {
  languages: Record<string, number>;
  category: string;
  image?: string;
}

// Datos estáticos como fallback mejorados
const fallbackProjects: ProjectWithLanguages[] = [
  {
    id: 1,
    name: "Portfolio Website",
    description:
      "Modern portfolio website built with React and TypeScript featuring responsive design and dark mode",
    html_url: "https://github.com/AntRed1/portfolio",
    homepage: "https://antred1.dev",
    language: "TypeScript",
    languages_url: "",
    stargazers_count: 12,
    forks_count: 3,
    created_at: "2024-01-01",
    updated_at: "2024-08-15",
    topics: ["portfolio", "react", "typescript", "responsive", "dark-mode"],
    fork: false,
    languages: { TypeScript: 65, CSS: 25, HTML: 10 },
    category: "frontend",
  },
  {
    id: 2,
    name: "E-commerce Platform",
    description:
      "Full-stack e-commerce solution with React, Node.js, and MongoDB featuring payment integration and admin dashboard",
    html_url: "https://github.com/AntRed1/ecommerce",
    homepage: "https://shop.antred1.dev",
    language: "JavaScript",
    languages_url: "",
    stargazers_count: 28,
    forks_count: 7,
    created_at: "2024-02-01",
    updated_at: "2024-08-10",
    topics: ["ecommerce", "fullstack", "react", "nodejs", "mongodb", "stripe"],
    fork: false,
    languages: { JavaScript: 60, HTML: 20, CSS: 15, Python: 5 },
    category: "fullstack",
  },
  {
    id: 3,
    name: "Task Management Mobile",
    description:
      "Cross-platform mobile task management app built with React Native and Firebase",
    html_url: "https://github.com/AntRed1/task-app",
    homepage: null,
    language: "JavaScript",
    languages_url: "",
    stargazers_count: 15,
    forks_count: 4,
    created_at: "2024-03-01",
    updated_at: "2024-08-05",
    topics: [
      "mobile",
      "react-native",
      "firebase",
      "productivity",
      "cross-platform",
    ],
    fork: false,
    languages: { JavaScript: 75, Java: 15, Swift: 10 },
    category: "mobile",
  },
  {
    id: 4,
    name: "API Gateway Service",
    description:
      "Microservices API gateway with authentication, rate limiting, and monitoring built with Python FastAPI",
    html_url: "https://github.com/AntRed1/api-gateway",
    homepage: null,
    language: "Python",
    languages_url: "",
    stargazers_count: 35,
    forks_count: 12,
    created_at: "2024-04-01",
    updated_at: "2024-08-12",
    topics: ["api", "backend", "microservices", "python", "fastapi", "docker"],
    fork: false,
    languages: { Python: 85, Dockerfile: 10, Shell: 5 },
    category: "backend",
  },
  {
    id: 5,
    name: "Data Visualization Dashboard",
    description:
      "Interactive dashboard for data visualization using D3.js and React with real-time updates",
    html_url: "https://github.com/AntRed1/data-viz",
    homepage: "https://viz.antred1.dev",
    language: "JavaScript",
    languages_url: "",
    stargazers_count: 22,
    forks_count: 6,
    created_at: "2024-05-01",
    updated_at: "2024-08-08",
    topics: ["data-visualization", "d3js", "react", "dashboard", "charts"],
    fork: false,
    languages: { JavaScript: 70, CSS: 20, HTML: 10 },
    category: "frontend",
  },
  {
    id: 6,
    name: "Machine Learning Pipeline",
    description:
      "End-to-end ML pipeline for data processing, model training, and deployment using Python and MLflow",
    html_url: "https://github.com/AntRed1/ml-pipeline",
    homepage: null,
    language: "Python",
    languages_url: "",
    stargazers_count: 41,
    forks_count: 15,
    created_at: "2024-06-01",
    updated_at: "2024-08-14",
    topics: [
      "machine-learning",
      "python",
      "mlflow",
      "data-science",
      "tensorflow",
    ],
    fork: false,
    languages: { Python: 90, Jupyter: 8, Shell: 2 },
    category: "backend",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState<ProjectWithLanguages[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<
    ProjectWithLanguages[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [usingFallback, setUsingFallback] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [categories, setCategories] = useState<
    Array<{ id: string; label: string }>
  >([]);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const { t } = useLanguage();

  const maxRetries = 3;
  const retryDelays = [1000, 2000, 3000]; // Delays progresivos

  // Detectar estado de conexión
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Mapeo de lenguajes a categorías
  const languageToCategory: Record<string, string> = {
    JavaScript: "frontend",
    TypeScript: "frontend",
    React: "frontend",
    Vue: "frontend",
    Angular: "frontend",
    HTML: "frontend",
    CSS: "frontend",
    SCSS: "frontend",
    Python: "backend",
    Java: "backend",
    "C#": "backend",
    PHP: "backend",
    Ruby: "backend",
    Go: "backend",
    Rust: "backend",
    "Node.js": "backend",
    Swift: "mobile",
    Kotlin: "mobile",
    Dart: "mobile",
    Flutter: "mobile",
    "React Native": "mobile",
  };

  // Función para determinar categoría basada en lenguajes y topics
  const determineCategory = (
    languages: Record<string, number>,
    topics: string[]
  ): string => {
    // Primero verificar topics para casos específicos
    if (
      topics.some((topic) =>
        [
          "mobile",
          "android",
          "ios",
          "flutter",
          "react-native",
          "ionic",
          "xamarin",
        ].includes(topic.toLowerCase())
      )
    ) {
      return "mobile";
    }

    if (
      topics.some((topic) =>
        [
          "fullstack",
          "full-stack",
          "mern",
          "mean",
          "django",
          "rails",
          "laravel",
          "express",
        ].includes(topic.toLowerCase())
      )
    ) {
      return "fullstack";
    }

    if (
      topics.some((topic) =>
        [
          "backend",
          "api",
          "server",
          "database",
          "microservices",
          "fastapi",
          "django",
          "flask",
        ].includes(topic.toLowerCase())
      )
    ) {
      return "backend";
    }

    if (
      topics.some((topic) =>
        [
          "frontend",
          "ui",
          "ux",
          "web",
          "react",
          "vue",
          "angular",
          "dashboard",
        ].includes(topic.toLowerCase())
      )
    ) {
      return "frontend";
    }

    // Luego verificar por lenguajes principales
    const sortedLanguages = Object.entries(languages).sort(
      ([, a], [, b]) => b - a
    );

    // Detectar si es fullstack basado en combinación de lenguajes
    const hasBackendLang = sortedLanguages.some(([lang]) =>
      ["Python", "Java", "C#", "PHP", "Ruby", "Go", "Rust", "Node.js"].includes(
        lang
      )
    );
    const hasFrontendLang = sortedLanguages.some(([lang]) =>
      [
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "SCSS",
        "Vue",
        "React",
      ].includes(lang)
    );

    if (hasBackendLang && hasFrontendLang) {
      return "fullstack";
    }

    // Categorizar por lenguaje principal
    for (const [lang] of sortedLanguages.slice(0, 2)) {
      const category = languageToCategory[lang];
      if (category) return category;
    }

    return "fullstack"; // default
  };

  // Función para usar datos de fallback con mensaje apropiado
  const useFallbackData = (reason: string = "connection") => {
    console.log("Using fallback data due to:", reason);
    setUsingFallback(true);
    setProjects(fallbackProjects);

    const uniqueCategories = [
      ...new Set(fallbackProjects.map((p) => p.category)),
    ];
    const categoryLabels = [
      { id: "all", label: t("projects.all") || "All" },
      ...uniqueCategories.map((cat) => ({
        id: cat,
        label:
          t(`projects.${cat}`) || cat.charAt(0).toUpperCase() + cat.slice(1),
      })),
    ];

    setCategories(categoryLabels);

    // Mensajes de error más específicos
    const errorMessages = {
      connection:
        "GitHub API is temporarily unavailable. Showing sample projects.",
      timeout: "Request timed out. Showing sample projects while we retry.",
      rateLimit: "GitHub API rate limit exceeded. Showing sample projects.",
      offline: "You're offline. Showing cached sample projects.",
      error: "Unable to load GitHub data. Showing sample projects.",
    };

    setError(
      errorMessages[reason as keyof typeof errorMessages] || errorMessages.error
    );
  };

  // Función mejorada para reintentos con backoff exponencial
  const fetchWithRetry = async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Portfolio-Website",
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      throw error;
    }
  };

  // Función principal para obtener proyectos de GitHub
  const fetchGitHubProjects = async (attempt: number = 0): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      setRetryCount(attempt);

      // Verificar conexión
      if (!isOnline) {
        useFallbackData("offline");
        return;
      }

      console.log(
        `Fetching GitHub projects (attempt ${attempt + 1}/${maxRetries + 1})`
      );

      // Obtener repositorios públicos con retry
      const reposResponse = await fetchWithRetry(
        "https://api.github.com/users/AntRed1/repos?type=public&sort=updated&per_page=30"
      );

      // Manejar diferentes códigos de error
      if (!reposResponse.ok) {
        if (reposResponse.status === 403) {
          const resetHeader = reposResponse.headers.get("x-ratelimit-reset");
          console.warn(
            `GitHub API rate limit exceeded. Reset at: ${resetHeader}`
          );
          useFallbackData("rateLimit");
          return;
        }
        if (reposResponse.status === 429) {
          console.warn("Too many requests to GitHub API");
          useFallbackData("rateLimit");
          return;
        }
        throw new Error(
          `HTTP ${reposResponse.status}: ${reposResponse.statusText}`
        );
      }

      const repos = await reposResponse.json();

      // Verificar si la respuesta es válida
      if (!Array.isArray(repos)) {
        throw new Error("Invalid response format from GitHub API");
      }

      if (repos.length === 0) {
        console.warn("No repositories found");
        useFallbackData("error");
        return;
      }

      // Filtrar y procesar repositorios
      let ownRepos = repos.filter((repo) => !repo.fork && repo.description);

      // Si no hay repositorios con descripción, tomar algunos sin descripción
      if (ownRepos.length === 0) {
        ownRepos = repos.filter((repo) => !repo.fork).slice(0, 8);
      }

      // Procesar repositorios con datos básicos
      const projectsWithLanguages: ProjectWithLanguages[] = ownRepos.map(
        (repo) => {
          const languages = repo.language
            ? { [repo.language]: 100 }
            : { JavaScript: 60, HTML: 25, CSS: 15 };
          const category = determineCategory(languages, repo.topics || []);

          return {
            ...repo,
            languages,
            category,
          };
        }
      );

      // Éxito: actualizar estado
      setProjects(projectsWithLanguages);
      setUsingFallback(false);
      setRetryCount(0);

      // Generar categorías dinámicamente
      const uniqueCategories = [
        ...new Set(projectsWithLanguages.map((p) => p.category)),
      ];
      const categoryLabels = [
        { id: "all", label: t("projects.all") || "All" },
        ...uniqueCategories.map((cat) => ({
          id: cat,
          label:
            t(`projects.${cat}`) || cat.charAt(0).toUpperCase() + cat.slice(1),
        })),
      ];

      setCategories(categoryLabels);

      console.log(
        `Successfully loaded ${projectsWithLanguages.length} projects from GitHub`
      );
    } catch (error) {
      console.error(
        `Error fetching GitHub projects (attempt ${attempt + 1}):`,
        error
      );

      // Si aún podemos reintentar
      if (attempt < maxRetries) {
        const delay = retryDelays[attempt] || 3000;
        console.log(`Retrying in ${delay}ms...`);

        setError(
          `Connection failed. Retrying in ${delay / 1000}s... (${
            attempt + 1
          }/${maxRetries})`
        );

        setTimeout(() => {
          fetchGitHubProjects(attempt + 1);
        }, delay);
      } else {
        // Máximo de reintentos alcanzado
        console.error("Max retries exceeded, using fallback data");
        const errorType =
          error instanceof Error && error.message.includes("timeout")
            ? "timeout"
            : "connection";
        useFallbackData(errorType);
      }
    } finally {
      if (attempt >= maxRetries || !isOnline) {
        setLoading(false);
      }
    }
  };

  // Función manual para reintento
  const handleManualRetry = () => {
    setRetryCount(0);
    setError("");
    fetchGitHubProjects(0);
  };

  // Efecto principal para cargar proyectos
  useEffect(() => {
    fetchGitHubProjects(0);
  }, [t, isOnline]);

  // Filtrar proyectos
  useEffect(() => {
    let filtered = projects;

    // Filtrar por categoría
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (project) => project.category === selectedCategory
      );
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.topics?.some((topic) =>
            topic.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          Object.keys(project.languages).some((lang) =>
            lang.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, searchTerm]);

  // Componente de estado de carga mejorado
  if (loading) {
    return (
      <section
        id="projects"
        className="section-padding bg-gray-50 dark:bg-gray-800"
      >
        <div className="container-custom">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader2 className="animate-spin h-12 w-12 text-primary-500 mx-auto mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                Loading projects from GitHub...
              </p>
              {retryCount > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Attempt {retryCount + 1} of {maxRetries + 1}
                </p>
              )}
              {!isOnline && (
                <div className="flex items-center justify-center mt-2 text-orange-600 dark:text-orange-400">
                  <WifiOff size={16} className="mr-2" />
                  <span className="text-sm">You appear to be offline</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={ref}
      className="section-padding bg-gray-50 dark:bg-gray-800"
    >
      <div className="container-custom">
        <div
          className={`transition-all duration-1000 ${
            isInView ? "animate-fade-in-up" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {t("projects.title") || "My Projects"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t("projects.subtitle") ||
                "Explore my latest work and contributions on GitHub"}
            </p>

            {/* Estado de conexión y errores */}
            <div className="mt-4 space-y-2">
              {!isOnline && (
                <div className="inline-flex items-center p-3 bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200 rounded-lg">
                  <WifiOff size={16} className="mr-2 flex-shrink-0" />
                  <span className="text-sm">You're currently offline</span>
                </div>
              )}

              {error && (
                <div className="inline-flex items-center p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 rounded-lg max-w-lg mx-auto">
                  <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
                  <span className="text-sm flex-1">{error}</span>
                  {(error.includes("GitHub API") ||
                    error.includes("Connection failed")) &&
                    isOnline && (
                      <button
                        onClick={handleManualRetry}
                        className="ml-3 p-1 hover:bg-yellow-200 dark:hover:bg-yellow-800/30 rounded transition-colors"
                        title="Retry connection"
                      >
                        <RefreshCw size={14} />
                      </button>
                    )}
                </div>
              )}

              {isOnline && !error && !usingFallback && (
                <div className="inline-flex items-center text-green-600 dark:text-green-400 text-sm">
                  <Wifi size={16} className="mr-2" />
                  <span>Connected to GitHub</span>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={
                  t("projects.searchPlaceholder") || "Search projects..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass-card rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                    : "glass-card text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 hover:shadow-md"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                usingFallback={usingFallback}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: ProjectWithLanguages;
  usingFallback?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  usingFallback,
}) => {
  // Obtener los lenguajes principales
  const topLanguages = Object.entries(project.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([lang]) => lang);

  return (
    <div className="glass-card rounded-xl overflow-hidden glass-hover group relative">
      {usingFallback && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full font-medium">
            Sample
          </span>
        </div>
      )}

      <div className="relative">
        <div className="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h3 className="text-2xl font-bold mb-2 line-clamp-2">
              {project.name
                .replace(/-/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </h3>
            <div className="flex items-center justify-center space-x-4 text-sm opacity-90">
              <div className="flex items-center space-x-1">
                <Star size={14} />
                <span>{project.stargazers_count}</span>
              </div>
              <div className="flex items-center space-x-1">
                <GitFork size={14} />
                <span>{project.forks_count}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-4">
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-primary-500 transition-all duration-200 hover:scale-110"
            >
              <Github size={20} />
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:text-primary-500 transition-all duration-200 hover:scale-110"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {project.name
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {project.description || "No description available"}
        </p>

        {/* Languages */}
        <div className="flex flex-wrap gap-2 mb-4">
          {topLanguages.map((lang) => (
            <span
              key={lang}
              className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full font-medium"
            >
              {lang}
            </span>
          ))}
        </div>

        {/* Topics */}
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200"
            >
              <Github size={18} />
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors duration-200"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>

          <span className="text-xs text-gray-500 dark:text-gray-500">
            {new Date(project.updated_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Projects;
