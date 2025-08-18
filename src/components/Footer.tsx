import React from "react";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container-custom">
        <div className="py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Portafolio
              </h3>
              <p className="text-gray-400 dark:text-gray-500 mb-6">
                {t("footer.description")}
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/AntRed1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 dark:bg-gray-900 rounded-lg text-gray-300 hover:text-white hover:bg-primary-600 transition-all duration-200"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/anthonyrojasv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 dark:bg-gray-900 rounded-lg text-gray-300 hover:text-white hover:bg-primary-600 transition-all duration-200"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://x.com/Arojas2520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 dark:bg-gray-900 rounded-lg text-gray-300 hover:text-white hover:bg-primary-600 transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="mailto:anthonyatras@gmail.com"
                  className="p-3 bg-gray-800 dark:bg-gray-900 rounded-lg text-gray-300 hover:text-white hover:bg-primary-600 transition-all duration-200"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                {t("footer.quickLinks")}
              </h4>
              <ul className="space-y-2">
                {[
                  { label: t("nav.home"), href: "#home" },
                  { label: t("nav.about"), href: "#about" },
                  { label: t("nav.projects"), href: "#projects" },
                  { label: t("nav.skills"), href: "#skills" },
                  { label: t("nav.contact"), href: "#contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(
                          link.href.slice(1)
                        );
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                {t("footer.contact")}
              </h4>
              <div className="space-y-2 text-gray-400 dark:text-gray-500">
                <p>anthonyatras@gmail.com</p>
                <p>+1 (555) 123-4567</p>
                <p>República Dominicana</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} Portafolio. {t("footer.madeWith")}{" "}
              <Heart className="inline w-4 h-4 text-red-500 mx-1" />
              {t("footer.by")} Anthony Rojas
            </p>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-400 dark:text-gray-500 hover:text-white transition-colors duration-200"
            >
              <span className="text-sm">{t("footer.backToTop")}</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
