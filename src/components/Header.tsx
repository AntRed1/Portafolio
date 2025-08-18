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
} from "lucide-react";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy([
    "home",
    "about",
    "projects",
    "skills",
    "contact",
  ]);
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const menuItems = [
    { id: "home", label: t("nav.home") },
    { id: "about", label: t("nav.about") },
    { id: "projects", label: t("nav.projects") },
    { id: "skills", label: t("nav.skills") },
    { id: "contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Portafolio
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-primary-500 ${
                  activeSection === item.id
                    ? "text-primary-500"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "es" ? "en" : "es")}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              title={
                language === "es" ? "Switch to English" : "Cambiar a Español"
              }
            >
              <Globe size={18} />
              <span className="ml-1 text-xs font-medium">
                {language.toUpperCase()}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              title={isDark ? "Light Mode" : "Dark Mode"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Social Links */}
            <a
              href="https://github.com/AntRed1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors duration-200"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/anthonyrojasv/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors duration-200"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://x.com/Arojas2520"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700">
            <div className="py-4 px-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-3 px-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-primary-500"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Controls */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setLanguage(language === "es" ? "en" : "es")}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors duration-200"
                  >
                    <Globe size={18} />
                    <span className="ml-1 text-xs">
                      {language.toUpperCase()}
                    </span>
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors duration-200"
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <a
                    href="https://github.com/AntRed1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors duration-200"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/anthonyrojasv/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors duration-200"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="https://x.com/Arojas2520"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
