import React, { useRef, useState } from "react";
import {
  Code,
  Lightbulb,
  Users,
  Zap,
  Award,
  Shield,
  Eye,
  ExternalLink,
  Download,
  Star,
  Info,
  X,
  FileText,
  CheckCircle,
} from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../context/LanguageContext";

interface Certification {
  id: string;
  name: string;
  fileName: string;
  verified: boolean;
}

interface Specialty {
  id: string;
  name: string;
  icon: React.ElementType;
}

const About = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const { t } = useLanguage();
  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Configuración de certificaciones con archivos reales
  const certifications: Certification[] = [
    {
      id: "az-305",
      name: "Azure Solutions Architect Expert (AZ-305)",
      fileName: "AZ-305.pdf",
      verified: true,
    },
    {
      id: "az-400",
      name: "Azure DevOps Engineer Expert (AZ-400)",
      fileName: "AZ-400.pdf",
      verified: true,
    },
    {
      id: "az-104",
      name: "Azure Administrator Associate (AZ-104)",
      fileName: "AZ-104.pdf",
      verified: true,
    },
    {
      id: "az-900",
      name: "Azure Fundamentals (AZ-900)",
      fileName: "AZ-900.pdf",
      verified: true,
    },
    {
      id: "docker",
      name: "Docker Certified",
      fileName: "Docker.pdf",
      verified: true,
    },
    {
      id: "lpi",
      name: "LPI Linux Essentials",
      fileName: "LPI_Linux.pdf",
      verified: true,
    },
    {
      id: "devops",
      name: "Professional DevOps",
      fileName: "Professional_DevOps.pdf",
      verified: true,
    },
  ];

  const specialties: Specialty[] = [
    {
      id: "cloud",
      name: "Arquitectura Cloud en Microsoft Azure",
      icon: Shield,
    },
    {
      id: "devops",
      name: "Automatización CI/CD y DevOps",
      icon: Zap,
    },
    {
      id: "management",
      name: "Gestión de Cambios e Incidentes",
      icon: Users,
    },
    {
      id: "fintech",
      name: "Integración Bancaria y Fintech",
      icon: Code,
    },
    {
      id: "security",
      name: "Despliegues Seguros y Observabilidad",
      icon: Eye,
    },
  ];

  const highlights = [
    {
      icon: Code,
      title: t("about.fullStackDev"),
      description: t("about.fullStackDesc"),
    },
    {
      icon: Lightbulb,
      title: t("about.creativeSolutions"),
      description: t("about.creativeSolutionsDesc"),
    },
    {
      icon: Users,
      title: t("about.teamwork"),
      description: t("about.teamworkDesc"),
    },
    {
      icon: Zap,
      title: t("about.continuousLearning"),
      description: t("about.continuousLearningDesc"),
    },
  ];

  const handleCertificationClick = (certification: Certification) => {
    setSelectedCertification(certification);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertification(null);
  };

  const handleDownloadCertification = (
    certification: Certification,
    event?: React.MouseEvent
  ) => {
    if (event) {
      event.stopPropagation();
    }
    // Descargar PDF
    const pdfUrl = `/docs/${certification.fileName}`;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = certification.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    if (selectedCertification) {
      const pdfUrl = `/docs/${selectedCertification.fileName}`;
      window.open(pdfUrl, "_blank");
    }
  };

  return (
    <>
      <section
        id="about"
        ref={ref}
        className="section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900/50 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>

        <div className="container-custom relative z-10">
          <div
            className={`transition-all duration-1000 ${
              isInView ? "animate-fade-in-up" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {t("about.title")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {t("about.subtitle")}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {t("about.myStory")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t("about.description1")}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t("about.description2")}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t("about.description3")}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <span className="px-3 py-1 bg-blue-100/70 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm font-medium backdrop-blur-sm">
                    React Expert
                  </span>
                  <span className="px-3 py-1 bg-green-100/70 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-sm font-medium backdrop-blur-sm">
                    Node.js
                  </span>
                  <span className="px-3 py-1 bg-yellow-100/70 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 rounded-full text-sm font-medium backdrop-blur-sm">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 bg-purple-100/70 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-full text-sm font-medium backdrop-blur-sm">
                    UI/UX Design
                  </span>
                </div>
              </div>

              <div>
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Trabajando en código"
                  className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
            </div>

            {/* Certificaciones y Especialidades */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Certificaciones */}
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Award className="text-blue-500 mr-3" size={28} />
                  Certificaciones
                </h3>

                <div className="space-y-4">
                  {certifications.map((certification) => (
                    <div
                      key={certification.id}
                      onClick={() => handleCertificationClick(certification)}
                      className="group flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 cursor-pointer hover:bg-white/80 dark:hover:bg-gray-700/80 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                      <Shield
                        className="text-green-500 flex-shrink-0"
                        size={20}
                      />
                      <span className="text-gray-700 dark:text-gray-300 flex-1 font-medium">
                        {certification.name}
                      </span>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Eye className="text-blue-500" size={16} />
                        <button
                          onClick={(e) =>
                            handleDownloadCertification(certification, e)
                          }
                          className="p-1 rounded hover:bg-gray-200/50 dark:hover:bg-gray-600/50 transition-colors"
                        >
                          <Download
                            className="text-gray-500 dark:text-gray-400"
                            size={14}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg backdrop-blur-sm">
                  <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <Info size={16} />
                    Haz clic en cualquier certificación para ver el documento
                    completo
                  </p>
                </div>
              </div>

              {/* Especialidades */}
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Lightbulb className="text-yellow-500 mr-3" size={28} />
                  Especialidades
                </h3>

                <div className="space-y-4">
                  {specialties.map((specialty) => (
                    <div
                      key={specialty.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-gray-700/80 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                    >
                      <Star
                        className="text-blue-500 flex-shrink-0 group-hover:text-yellow-500 transition-colors duration-300"
                        size={20}
                      />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {specialty.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg backdrop-blur-sm">
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
                    <Star size={16} />
                    Áreas donde tengo mayor experiencia y dominio técnico
                  </p>
                </div>
              </div>
            </div>

            {/* Por qué trabajar conmigo */}
            <div>
              <h3 className="text-2xl font-semibold text-center mb-12 text-gray-900 dark:text-white">
                {t("about.whyWorkWithMe")}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="text-center p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100/70 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl mb-4 shadow-lg">
                      <highlight.icon size={24} />
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      {highlight.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Estilos CSS adicionales */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .bg-grid-pattern {
              background-image: radial-gradient(circle, rgba(229, 231, 235, 0.3) 1px, transparent 1px);
              background-size: 20px 20px;
            }
            .dark .bg-grid-pattern {
              background-image: radial-gradient(circle, rgba(75, 85, 99, 0.2) 1px, transparent 1px);
            }
          `,
          }}
        />
      </section>

      {/* Modal de Certificación */}
      {isModalOpen && selectedCertification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-gray-700/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                  <FileText
                    className="text-blue-600 dark:text-blue-400"
                    size={24}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedCertification.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <CheckCircle className="text-green-500" size={16} />
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Certificación Verificada
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
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 mb-6 min-h-[500px] flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50">
                <iframe
                  src={`/docs/${selectedCertification.fileName}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-[500px] rounded-lg border-0"
                  title={selectedCertification.name}
                />
              </div>

              {/* Certificate Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                    <Info size={16} />
                    Información del Documento
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Documento PDF original de la certificación oficial
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200/50 dark:border-green-800/50">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                    <Shield size={16} />
                    Estado de Verificación
                  </h4>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Certificación verificada y actualizada
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
              <button
                onClick={() =>
                  handleDownloadCertification(selectedCertification)
                }
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors duration-200 font-medium"
              >
                <Download size={16} />
                Descargar
              </button>
              <button
                onClick={handleOpenInNewTab}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200 font-medium shadow-lg"
              >
                <ExternalLink size={16} />
                Abrir en nueva pestaña
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
