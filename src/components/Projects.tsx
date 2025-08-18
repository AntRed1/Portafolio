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
  Calendar,
  Tag,
} from "lucide-react";

// Mock hooks para el ejemplo (reemplaza con tus hooks reales)
const useInView = (ref) => {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return isInView;
};

const useLanguage = () => ({
  t: (key) => {
    const translations = {
      "projects.title": "My Projects",
      "projects.subtitle": "Explore my latest work and contributions on GitHub",
      "projects.all": "All",
      "projects.frontend": "Frontend",
      "projects.backend": "Backend",
      "projects.fullstack": "Full Stack",
      "projects.mobile": "Mobile",
      "projects.searchPlaceholder": "Search projects..."
    };
    return translations[key] || key;
  }
});

// Datos estáticos mejorados
const fallbackProjects = [
  {
    id: 1,
    name: "Modern Portfolio Website",
    description: "Responsive portfolio website built with React and TypeScript featuring dark mode, animations, and modern design patterns",
    html_url: "https://github.com/AntRed1/portfolio",
    homepage: "https://antred1.dev",
    language: "TypeScript",
    stargazers_count: 25,
    forks_count: 8,
    created_at: "2024-01-15",
    updated_at: "2024-08-15",
    topics: ["portfolio", "react", "typescript", "responsive", "dark-mode"],
    fork: false,
    languages: { TypeScript: 65, CSS: 25, HTML: 10 },
    category: "frontend",
  },
  {
    id: 2,
    name: "E-commerce Platform",
    description: "Full-stack e-commerce solution with React frontend, Node.js backend, and MongoDB database featuring payment integration",
    html_url: "https://github.com/AntRed1/ecommerce-platform",
    homepage: "https://shop-demo.antred1.dev",
    language: "JavaScript",
    stargazers_count: 42,
    forks_count: 15,
    created_at: "2024-02-01",
    updated_at: "2024-08-10",
    topics: ["ecommerce", "fullstack", "react", "nodejs", "mongodb", "stripe"],
    fork: false,
    languages: { JavaScript: 60, HTML: 20, CSS: 15, Python: 5 },
    category: "fullstack",
  },
  {
    id: 3,
    name: "Task Management App",
    description: "Cross-platform mobile task management application built with React Native and Firebase for iOS and Android",
    html_url: "https://github.com/AntRed1/task-manager",
    homepage: null,
    language: "JavaScript",
    stargazers_count: 18,
    forks_count: 6,
    created_at: "2024-03-01",
    updated_at: "2024-08-05",
    topics: ["mobile", "react-native", "firebase", "productivity", "cross-platform"],
    fork: false,
    languages: { JavaScript: 75, Java: 15, Swift: 10 },
    category: "mobile",
  },
  {
    id: 4,
    name: "API Gateway Service",
    description: "Microservices API gateway with authentication, rate limiting, monitoring, and load balancing built with Python FastAPI",
    html_url: "https://github.com/AntRed1/api-gateway",
    homepage: null,
    language: "Python",
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
    description: "Interactive real-time dashboard for data visualization using D3.js, React, and WebSocket connections",
    html_url: "https://github.com/AntRed1/data-viz-dashboard",
    homepage: "https://viz.antred1.dev",
    language: "JavaScript",
    stargazers_count: 31,
    forks_count: 9,
    created_at: "2024-05-01",
    updated_at: "2024-08-08",
    topics: ["data-visualization", "d3js", "react", "dashboard", "realtime"],
    fork: false,
    languages: { JavaScript: 70, CSS: 20, HTML: 10 },
    category: "frontend",
  },
  {
    id: 6,
    name: "Machine Learning Pipeline",
    description: "End-to-end ML pipeline for data processing, model training, evaluation, and deployment using Python and MLflow",
    html_url: "https://github.com/AntRed1/ml-pipeline",
    homepage: null,
    language: "Python",
    stargazers_count: 48,
    forks_count: 20,
    created_at: "2024-06-01",
    updated_at: "2024-08-14",
    topics: ["machine-learning", "python", "mlflow", "data-science", "tensorflow"],
    fork: false,
    languages: { Python: 90, Jupyter: 8, Shell: 2 },
    category: "backend",
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [categories, setCategories] = useState([]);
  
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { t } = useLanguage();

  // Mapeo de lenguajes a categorías
  const languageToCategory = {
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
    Swift: "mobile",
    Kotlin: "mobile",
    Dart: "mobile",
  };

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

  // Función para determinar categoría
  const determineCategory = (languages, topics) => {
    // Verificar topics primero
    const topicKeywords = {
      mobile: ["mobile", "android", "ios", "flutter", "react-native"],
      fullstack: ["fullstack", "full-stack", "mern", "mean", "ecommerce"],
      backend: ["backend", "api", "server", "database", "microservices"],
      frontend: ["frontend", "ui", "ux", "web", "react", "vue", "dashboard"]
    };

    for (const [category, keywords] of Object.entries(topicKeywords)) {
      if (topics.some(topic => 
        keywords.some(keyword => topic.toLowerCase().includes(keyword))
      )) {
        return category;
      }
    }

    // Verificar por lenguajes
    const sortedLanguages = Object.entries(languages).sort(([,a], [,b]) => b - a);
    const hasBackend = sortedLanguages.some(([lang]) => 
      ["Python", "Java", "C#", "PHP", "Ruby", "Go", "Rust"].includes(lang)
    );
    const hasFrontend = sortedLanguages.some(([lang]) => 
      ["JavaScript", "TypeScript", "HTML", "CSS", "React"].includes(lang)
    );

    if (hasBackend && hasFrontend) return "fullstack";

    for (const [lang] of sortedLanguages.slice(0, 2)) {
      const category = languageToCategory[lang];
      if (category) return category;
    }

    return "fullstack";
  };

  // Función para usar datos de fallback
  const useFallbackData = (reason = "connection") => {
    console.log("Using fallback data:", reason);
    setUsingFallback(true);
    setProjects(fallbackProjects);
    setLoading(false);
    
    const uniqueCategories = [...new Set(fallbackProjects.map(p => p.category))];
    const categoryLabels = [
      { id: "all", label: t("projects.all") },
      ...uniqueCategories.map(cat => ({
        id: cat,
        label: t(`projects.${cat}`) || cat.charAt(0).toUpperCase() + cat.slice(1)
      }))
    ];
    
    setCategories(categoryLabels);
    
    const errorMessages = {
      connection: "Showing sample projects - GitHub API temporarily unavailable",
      offline: "You're offline - Showing cached projects",
      rateLimit: "GitHub API rate limit reached - Showing sample projects",
      error: "Unable to load GitHub data - Showing sample projects"
    };
    
    setError(errorMessages[reason] || errorMessages.error);
  };

  // Función para obtener proyectos de GitHub
  const fetchGitHubProjects = async () => {
    try {
      setLoading(true);
      setError("");

      if (!isOnline) {
        useFallbackData("offline");
        return;
      }

      console.log("Fetching GitHub projects...");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      try {
        const response = await fetch(
          "https://api.github.com/users/AntRed1/repos?type=public&sort=updated&per_page=20",
          {
            signal: controller.signal,
            headers: {
              "Accept": "application/vnd.github.v3+json",
              "User-Agent": "Portfolio-Website"
            }
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          if (response.status === 403 || response.status === 429) {
            useFallbackData("rateLimit");
            return;
          }
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const repos = await response.json();

        if (!Array.isArray(repos) || repos.length === 0) {
          useFallbackData("error");
          return;
        }

        // Filtrar y procesar repositorios
        let filteredRepos = repos.filter(repo => !repo.fork);
        
        // Si hay pocos repos, tomar algunos con fork
        if (filteredRepos.length < 3) {
          filteredRepos = repos.slice(0, 8);
        }

        const projectsWithLanguages = filteredRepos.map(repo => {
          const languages = repo.language ? { [repo.language]: 100 } : { JavaScript: 70, HTML: 20, CSS: 10 };
          const category = determineCategory(languages, repo.topics || []);

          return {
            ...repo,
            languages,
            category,
            description: repo.description || `${repo.name.replace(/-/g, ' ')} - A GitHub repository`
          };
        });

        setProjects(projectsWithLanguages);
        setUsingFallback(false);
        setLoading(false);

        // Generar categorías
        const uniqueCategories = [...new Set(projectsWithLanguages.map(p => p.category))];
        const categoryLabels = [
          { id: "all", label: t("projects.all") },
          ...uniqueCategories.map(cat => ({
            id: cat,
            label: t(`projects.${cat}`) || cat.charAt(0).toUpperCase() + cat.slice(1)
          }))
        ];
        
        setCategories(categoryLabels);
        console.log(`Successfully loaded ${projectsWithLanguages.length} projects`);

      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }

    } catch (error) {
      console.error("Error fetching GitHub projects:", error);
      
      if (error.name === 'AbortError') {
        useFallbackData("connection");
      } else {
        useFallbackData("error");
      }
    }
  };

  // Función para reintento manual
  const handleManualRetry = () => {
    fetchGitHubProjects();
  };

  // Efecto para cargar proyectos
  useEffect(() => {
    // Usar fallback inmediatamente y luego intentar cargar desde GitHub
    useFallbackData("connection");
    
    // Intentar cargar desde GitHub después de un breve delay
    const timer = setTimeout(() => {
      if (isOnline) {
        fetchGitHubProjects();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [isOnline]);

  // Filtrar proyectos
  useEffect(() => {
    let filtered = projects;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.topics?.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase())) ||
        Object.keys(project.languages).some(lang => lang.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, searchTerm]);

  // Componente de carga inicial solo para casos muy específicos
  if (loading && projects.length === 0 && !error) {
    return (
      <section id="projects" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Loading projects...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("projects.title")}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {t("projects.subtitle")}
            </p>

            {/* Status indicators */}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {!isOnline && (
                <div className="flex items-center px-4 py-2 bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 rounded-full text-sm">
                  <WifiOff size={16} className="mr-2" />
                  Offline Mode
                </div>
              )}
              
              {error && (
                <div className="flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  <AlertTriangle size={16} className="mr-2" />
                  {error}
                  {isOnline && (
                    <button
                      onClick={handleManualRetry}
                      className="ml-3 p-1 hover:bg-blue-200 dark:hover:bg-blue-800/30 rounded-full transition-colors"
                    >
                      <RefreshCw size={14} />
                    </button>
                  )}
                </div>
              )}

              {isOnline && !error && !usingFallback && (
                <div className="flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 rounded-full text-sm">
                  <Wifi size={16} className="mr-2" />
                  Connected to GitHub
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder={t("projects.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 dark:bg-slate-800/70 shadow-lg transition-all duration-200"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/70 backdrop-blur-sm text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700/50 hover:text-blue-600 border border-slate-200 dark:border-slate-700 dark:bg-slate-800/50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                usingFallback={usingFallback}
                index={index}
              />
            ))}
          </div>

          {/* No results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white/70 backdrop-blur-sm border border-slate-200 dark:border-slate-700 dark:bg-slate-800/70 rounded-3xl p-12 max-w-md mx-auto shadow-xl">
                <Search className="h-16 w-16 text-slate-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  No projects found
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
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

// Componente de tarjeta de proyecto mejorado
const ProjectCard = ({ project, usingFallback, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const topLanguages = Object.entries(project.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      className={`group relative bg-white/70 backdrop-blur-sm border border-slate-200 dark:border-slate-700 dark:bg-slate-800/70 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sample badge */}
      {usingFallback && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-blue-500/90 text-white text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
            Sample
          </span>
        </div>
      )}

      {/* Header with gradient */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        ></div>
        
        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
              {project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h3>
            <div className="flex items-center space-x-4 text-white/90 text-sm">
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

          {/* Hover overlay */}
          <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex space-x-4">
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-slate-700 hover:text-blue-500 transition-all duration-200 hover:scale-110 shadow-lg"
              >
                <Github size={20} />
              </a>
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-slate-700 hover:text-blue-500 transition-all duration-200 hover:scale-110 shadow-lg"
                >
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Languages */}
        <div className="flex flex-wrap gap-2 mb-4">
          {topLanguages.map(([lang, percentage]) => (
            <div
              key={lang}
              className="flex items-center px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full font-medium border border-blue-200/50 dark:border-blue-700/50"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              {lang}
            </div>
          ))}
        </div>

        {/* Topics */}
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="flex items-center px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-lg border border-slate-200 dark:border-slate-600"
              >
                <Tag size={10} className="mr-1" />
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-4">
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors duration-200 p-1"
            >
              <Github size={18} />
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors duration-200 p-1"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>

          <div className="flex items-center text-xs text-slate-500 dark:text-slate-500">
            <Calendar size={12} className="mr-1" />
            {formatDate(project.updated_at)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;