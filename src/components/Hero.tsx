import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Download,
  ExternalLink,
  X,
  FileText,
  User,
  Briefcase,
  Eye,
  Info,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import {
  downloadDocument,
  openDocumentInNewTab,
  getDocumentPath,
  debugPaths,
} from "../utils/paths";

const Hero = () => {
  const { t } = useLanguage();
  const [profileImage, setProfileImage] = useState<string>("");
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const githubUsername = "AntRed1";
  const cvFileName = "CV_ANTROJAS.pdf";
  const fallbackImage =
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300";

  useEffect(() => {
    const fetchGitHubProfile = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${githubUsername}`
        );

        if (response.ok) {
          const userData = await response.json();
          if (userData.avatar_url) {
            setProfileImage(userData.avatar_url);
            setImageError(false);
          } else {
            throw new Error("No avatar found");
          }
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        console.log("Error fetching GitHub profile:", error);
        setImageError(true);
        setProfileImage(fallbackImage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubProfile();
  }, [githubUsername]);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setProfileImage(fallbackImage);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewCV = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDownloadCV = async (event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }

    try {
      setIsDownloading(true);
      await downloadDocument(cvFileName);
    } catch (error) {
      console.error("Error downloading CV:", error);
      alert("Error al descargar el CV. Por favor, intenta nuevamente.");

      // Debug en caso de error
      if (import.meta.env.DEV) {
        debugPaths(cvFileName);
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOpenCVInNewTab = async () => {
    try {
      await openDocumentInNewTab(cvFileName);
    } catch (error) {
      console.error("Error opening CV:", error);
      alert("Error al abrir el CV. Por favor, intenta nuevamente.");
    }
  };

  return (
    <>
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16"
      >
        <div className="container-custom">
          <div className="text-center animate-fade-in-up">
            <div className="mb-6 relative">
              {/* Loading Skeleton */}
              {isLoading && (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto bg-gray-200 dark:bg-gray-700 animate-pulse border-4 border-white dark:border-gray-600 shadow-xl">
                  <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              )}

              {/* Profile Image */}
              {!isLoading && (
                <div className="relative inline-block">
                  <img
                    src={profileImage}
                    alt={`${githubUsername} - Foto de perfil de GitHub`}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto shadow-xl border-4 border-white dark:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    onError={handleImageError}
                    loading="eager"
                  />

                  {/* GitHub Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-gray-900 dark:bg-white rounded-full p-2 shadow-lg border-2 border-white dark:border-gray-800">
                    <svg
                      className="w-4 h-4 text-white dark:text-gray-900"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {/* Online Status Indicator */}
                  <div className="absolute top-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1 animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {t("hero.greeting")}
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                {t("hero.name")}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4">
              {t("hero.title")}
            </p>

            {/* Available Status */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full backdrop-blur-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-glow"></div>
                <span className="text-green-700 dark:text-green-400 text-sm font-medium">
                  {t("hero.available")}
                </span>
              </div>
            </div>

            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection("projects")}
                className="btn-primary inline-flex items-center gap-2 hover:scale-105 transition-transform duration-200"
              >
                {t("hero.viewProjects")}
                <ExternalLink size={20} />
              </button>

              {/* CV Button with Modal Functionality */}
              <div className="relative group">
                <button
                  onClick={handleViewCV}
                  disabled={isDownloading}
                  className="btn-secondary inline-flex items-center gap-2 hover:scale-105 transition-transform duration-200 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Eye size={20} />
                  {isDownloading ? "Descargando..." : t("hero.downloadCV")}

                  {/* Hover tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    Ver CV en modal
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                  </div>
                </button>

                {/* Download shortcut */}
                <button
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg disabled:opacity-25"
                  title="Descarga directa"
                >
                  <Download size={12} className="mx-auto" />
                </button>
              </div>
            </div>

            <div className="animate-bounce-slow">
              <button
                onClick={() => scrollToSection("about")}
                className="p-2 text-gray-400 dark:text-gray-500 hover:text-primary-500 transition-colors duration-200 hover:scale-110"
              >
                <ChevronDown size={32} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de CV */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-5xl max-h-[95vh] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-gray-700/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Curriculum Vitae
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Briefcase className="text-blue-500" size={16} />
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      Desarrollador Full Stack & DevOps
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl flex items-center justify-center transition-colors duration-200 group"
              >
                <X
                  className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                  size={20}
                />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex-1 overflow-y-auto">
              {/* PDF Viewer Container */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 mb-6 min-h-[600px] flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50">
                <iframe
                  src={`${getDocumentPath(
                    cvFileName
                  )}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                  className="w-full h-[600px] rounded-lg border-0"
                  title="Curriculum Vitae - Antonio Rojas"
                />
              </div>

              {/* CV Info */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                    <FileText size={16} />
                    Formato Profesional
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    CV actualizado en formato PDF con toda la información
                    profesional
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200/50 dark:border-green-800/50">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                    <Briefcase size={16} />
                    Experiencia Completa
                  </h4>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Historial laboral, proyectos y logros profesionales
                    detallados
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200/50 dark:border-purple-800/50">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2 flex items-center gap-2">
                    <Info size={16} />
                    Información Actualizada
                  </h4>
                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                    Última actualización con certificaciones y tecnologías
                    recientes
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>💼 CV completo y actualizado - Listo para oportunidades</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={16} />
                  {isDownloading ? "Descargando..." : "Descargar"}
                </button>
                <button
                  onClick={handleOpenCVInNewTab}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200 font-medium shadow-lg"
                >
                  <ExternalLink size={16} />
                  Abrir en nueva pestaña
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
