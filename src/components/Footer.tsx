import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  X,
  Shield,
  FileText,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const closeModal = () => setActiveModal(null);

  // Añadir estilos CSS al head cuando el componente se monta
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(148, 163, 184, 0.1);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(99, 102, 241, 0.5);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(99, 102, 241, 0.7);
      }
    `;
    document.head.appendChild(style);

    // Cleanup: remover estilos cuando el componente se desmonta
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/AntRed1",
      icon: Github,
      color: "hover:bg-gray-600 hover:text-white",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/anthonyrojasv/",
      icon: Linkedin,
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      name: "Twitter",
      href: "https://x.com/Arojas2520",
      icon: Twitter,
      color: "hover:bg-slate-600 hover:text-white",
    },
    {
      name: "Email",
      href: "mailto:anthonyatras@gmail.com",
      icon: Mail,
      color: "hover:bg-red-600 hover:text-white",
    },
  ];

  const quickLinks = [
    { label: "Inicio", href: "#home" },
    { label: "Acerca", href: "#about" },
    { label: "Proyectos", href: "#projects" },
    { label: "Habilidades", href: "#skills" },
    { label: "Contacto", href: "#contact" },
  ];

  const PrivacyModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="text-white" size={28} />
            <h2 className="text-2xl font-bold text-white">
              Política de Privacidad
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
              Última actualización:{" "}
              {new Date().toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              1. Información que Recopilamos
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              En este portafolio personal, recopilamos únicamente la información
              que nos proporcionas voluntariamente a través del formulario de
              contacto:
            </p>
            <ul className="list-disc ml-6 text-slate-600 dark:text-slate-300 mb-6 space-y-2">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Asunto del mensaje</li>
              <li>Contenido del mensaje</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              2. Uso de la Información
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              La información recopilada se utiliza exclusivamente para:
            </p>
            <ul className="list-disc ml-6 text-slate-600 dark:text-slate-300 mb-6 space-y-2">
              <li>Responder a tus consultas y mensajes</li>
              <li>Establecer comunicación profesional</li>
              <li>Evaluar oportunidades de colaboración</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              3. Protección de Datos
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Nos comprometemos a proteger tu información personal mediante:
            </p>
            <ul className="list-disc ml-6 text-slate-600 dark:text-slate-300 mb-6 space-y-2">
              <li>Cifrado SSL en todas las comunicaciones</li>
              <li>Almacenamiento seguro de datos</li>
              <li>Acceso restringido a la información</li>
              <li>No compartir datos con terceros sin consentimiento</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              4. Cookies y Tecnologías Similares
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Este sitio web utiliza cookies técnicas necesarias para su
              funcionamiento básico. No utilizamos cookies de seguimiento o
              publicitarias.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              5. Tus Derechos
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Tienes derecho a:
            </p>
            <ul className="list-disc ml-6 text-slate-600 dark:text-slate-300 mb-6 space-y-2">
              <li>Acceder a tus datos personales</li>
              <li>Rectificar información incorrecta</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              6. Contacto
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Para cualquier consulta sobre esta política de privacidad, puedes
              contactarme en:
              <a
                href="mailto:anthonyatras@gmail.com"
                className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1"
              >
                anthonyatras@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const TermsModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="text-white" size={28} />
            <h2 className="text-2xl font-bold text-white">
              Términos y Condiciones
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)] custom-scrollbar">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
              Última actualización:{" "}
              {new Date().toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              1. Aceptación de los Términos
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Al acceder y utilizar este portafolio personal, aceptas cumplir
              con estos términos y condiciones. Si no estás de acuerdo con algún
              aspecto de estos términos, por favor no utilices este sitio web.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              2. Propósito del Sitio
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Este sitio web es un portafolio personal diseñado para:
            </p>
            <ul className="list-disc ml-6 text-slate-600 dark:text-slate-300 mb-6 space-y-2">
              <li>Mostrar proyectos y habilidades profesionales</li>
              <li>Facilitar el contacto profesional</li>
              <li>Compartir información sobre experiencia laboral</li>
              <li>Establecer conexiones de networking profesional</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              3. Uso Permitido
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Puedes utilizar este sitio web para:
            </p>
            <ul className="list-disc ml-6 text-slate-600 dark:text-slate-300 mb-6 space-y-2">
              <li>Revisar información profesional y proyectos</li>
              <li>Contactar para oportunidades laborales</li>
              <li>Enviar consultas profesionales legítimas</li>
              <li>Compartir el contenido con fines profesionales</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              4. Restricciones de Uso
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Está prohibido:
            </p>
            <ul className="list-disc ml-6 text-slate-600 dark:text-slate-300 mb-6 space-y-2">
              <li>
                Utilizar el formulario de contacto para spam o mensajes no
                relacionados
              </li>
              <li>Copiar contenido sin atribución adecuada</li>
              <li>Intentar comprometer la seguridad del sitio</li>
              <li>Usar la información para propósitos malintencionados</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              5. Propiedad Intelectual
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              El contenido de este portafolio, incluyendo pero no limitado a
              textos, imágenes, diseños y código, es propiedad de Anthony Rojas.
              Los proyectos mostrados pueden tener licencias específicas que se
              indican en cada caso.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              6. Disponibilidad del Servicio
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Aunque nos esforzamos por mantener el sitio web disponible, no
              garantizamos su disponibilidad continua. Podemos realizar
              mantenimientos o actualizaciones que temporalmente interrumpan el
              servicio.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              7. Enlaces a Terceros
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Este sitio web puede contener enlaces a sitios web de terceros
              (GitHub, LinkedIn, etc.). No somos responsables del contenido o
              las políticas de privacidad de estos sitios externos.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              8. Modificaciones
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Nos reservamos el derecho de modificar estos términos y
              condiciones en cualquier momento. Los cambios entrarán en vigor
              inmediatamente después de su publicación en esta página.
            </p>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              9. Contacto
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Para cualquier consulta sobre estos términos y condiciones, puedes
              contactarme en:
              <a
                href="mailto:anthonyatras@gmail.com"
                className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1"
              >
                anthonyatras@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative container mx-auto px-6 max-w-7xl">
          <div className="py-16">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Anthony Rojas
                  </h3>
                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    Desarrollador Full Stack apasionado por crear soluciones
                    innovadoras y experiencias digitales excepcionales. Siempre
                    en busca de nuevos desafíos y oportunidades de crecimiento.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target={
                        social.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        social.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className={`group p-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-xl ${social.color}`}
                      title={social.name}
                    >
                      <social.icon
                        size={24}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-xl font-bold mb-6 text-slate-200">
                  Enlaces Rápidos
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group"
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
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal & Contact */}
              <div>
                <h4 className="text-xl font-bold mb-6 text-slate-200">
                  Legal & Contacto
                </h4>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveModal("privacy")}
                      className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group w-full text-left"
                    >
                      <Shield
                        size={16}
                        className="mr-3 group-hover:text-indigo-400"
                      />
                      Política de Privacidad
                    </button>
                    <button
                      onClick={() => setActiveModal("terms")}
                      className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group w-full text-left"
                    >
                      <FileText
                        size={16}
                        className="mr-3 group-hover:text-indigo-400"
                      />
                      Términos y Condiciones
                    </button>
                  </div>

                  <div className="pt-4 border-t border-slate-700/50">
                    <div className="space-y-2 text-slate-400">
                      <p className="flex items-center">
                        <Mail size={16} className="mr-3 text-slate-500" />
                        anthonyatras@gmail.com
                      </p>
                      <p className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-3 text-slate-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        República Dominicana
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700/50 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm mb-4 md:mb-0 flex items-center">
                © {currentYear} Anthony Rojas. Hecho con
                <Heart className="inline w-4 h-4 text-red-500 mx-2 animate-pulse" />
                en República Dominicana
              </p>

              <button
                onClick={scrollToTop}
                className="group flex items-center space-x-2 px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 text-slate-400 hover:text-white hover:bg-indigo-600/20 hover:border-indigo-500/50 transition-all duration-300"
              >
                <span className="text-sm">Volver arriba</span>
                <ArrowUp
                  size={16}
                  className="group-hover:-translate-y-1 transition-transform duration-300"
                />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeModal === "privacy" && <PrivacyModal />}
      {activeModal === "terms" && <TermsModal />}
    </>
  );
};

export default Footer;
