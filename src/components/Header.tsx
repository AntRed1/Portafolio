import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Sun,
  Moon,
  Globe,
  Twitter,
  Sparkles,
  Coffee,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [language, setLanguage] = useState("es");
  const [isDark, setIsDark] = useState(false);

  const menuItems = [
    { id: "home", label: language === "es" ? "Inicio" : "Home" },
    { id: "about", label: language === "es" ? "Acerca" : "About" },
    { id: "projects", label: language === "es" ? "Proyectos" : "Projects" },
    { id: "skills", label: language === "es" ? "Habilidades" : "Skills" },
    { id: "contact", label: language === "es" ? "Contacto" : "Contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/AntRed1",
      icon: Github,
      color: "hover:text-gray-800 dark:hover:text-gray-200",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/anthonyrojasv/",
      icon: Linkedin,
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      name: "Twitter",
      href: "https://x.com/Arojas2520",
      icon: Twitter,
      color: "hover:text-slate-800 dark:hover:text-slate-300",
    },
    {
      name: "Discord",
      href: "https://discord.com/users/deathred25",
      icon: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.010c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      ),
      color: "hover:text-indigo-600 dark:hover:text-indigo-400",
    },
    {
      name: "Buy me a coffee",
      href: "https://buymeacoffee.com/anthonyatrw",
      icon: Coffee,
      color: "hover:text-yellow-600 dark:hover:text-yellow-400",
    },
    {
      name: "Email",
      href: "mailto:anthonyatras@gmail.com",
      icon: Mail,
      color: "hover:text-red-600 dark:hover:text-red-400",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple scroll spy logic
      const sections = ["home", "about", "projects", "skills", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(sectionId);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      {/* Glassmorphism Background */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/30 shadow-lg shadow-black/5"
            : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm"
        }`}
        style={{
          background: isScrolled
            ? "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        }}
      />

      {/* Animated shimmer effect */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] animate-shimmer" />
      )}

      <div className="container mx-auto px-6 max-w-7xl relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo with enhanced styling */}
          <div
            className="flex items-center group cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                <Sparkles className="text-white" size={20} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
            <div className="ml-3">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Anthony Rojas
              </span>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Full Stack Developer
              </div>
            </div>
          </div>

          {/* Desktop Navigation with enhanced effects */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25"
                    : "text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white/60 dark:hover:bg-slate-800/60"
                }`}
              >
                {/* Background glow for active item */}
                {activeSection === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                )}

                <span className="relative z-10">{item.label}</span>

                {/* Hover effect */}
                {activeSection !== item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                )}
              </button>
            ))}
          </nav>

          {/* Controls with enhanced styling */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="group relative p-3 rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all duration-300 hover:scale-105"
              title={
                language === "es" ? "Switch to English" : "Cambiar a Español"
              }
            >
              <Globe
                size={18}
                className="text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300"
              />
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs rounded-full font-bold shadow-lg">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="group relative p-3 rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all duration-300 hover:scale-105"
              title={isDark ? "Light Mode" : "Dark Mode"}
            >
              <div className="relative">
                {isDark ? (
                  <Sun
                    size={18}
                    className="text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300"
                  />
                ) : (
                  <Moon
                    size={18}
                    className="text-indigo-600 group-hover:text-indigo-500 transition-colors duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
            </button>

            {/* Social Links */}
            <div className="flex items-center space-x-1 ml-2 pl-2 border-l border-slate-300/50 dark:border-slate-600/50">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-2.5 rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all duration-300 hover:scale-110 ${social.color}`}
                  title={social.name}
                >
                  <social.icon
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-700/60 transition-all duration-300 hover:scale-105"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative">
              {isMenuOpen ? (
                <X size={20} className="text-slate-700 dark:text-slate-300" />
              ) : (
                <Menu
                  size={20}
                  className="text-slate-700 dark:text-slate-300"
                />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Menu with enhanced design */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-6 mt-4 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 shadow-2xl">
            {/* Mobile Navigation */}
            <div className="px-6 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
                        activeSection === item.id
                          ? "bg-white"
                          : "bg-indigo-400 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                    {item.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile Controls */}
            <div className="px-6 mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center justify-between">
                {/* Theme and Language */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-all duration-300"
                  >
                    <Globe size={16} />
                    <span className="text-sm font-medium">
                      {language.toUpperCase()}
                    </span>
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300"
                  >
                    {isDark ? (
                      <Sun size={18} className="text-yellow-500" />
                    ) : (
                      <Moon size={18} className="text-indigo-600" />
                    )}
                  </button>
                </div>

                {/* Social Links */}
                <div className="flex items-center space-x-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300 hover:scale-110 ${social.color}`}
                    >
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(200%) skewX(-12deg); }
          }
          .animate-shimmer {
            animation: shimmer 3s infinite;
          }
        `,
        }}
      />
    </header>
  );
};

export default Header;
