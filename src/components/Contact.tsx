import React, { useState, useRef } from "react";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertState, setAlertState] = useState({
    show: false,
    type: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showAlert = (type, message) => {
    setAlertState({ show: true, type, message });
    setTimeout(
      () => setAlertState({ show: false, type: "", message: "" }),
      5000
    );
  };

  const handleSubmit = async (e) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mvgqnjwz", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        showAlert(
          "success",
          "¡Mensaje enviado exitosamente! Te contactaré pronto."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Error en el envío");
      }
    } catch (error) {
      showAlert(
        "error",
        "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      value: "@AntRed1",
      href: "https://github.com/AntRed1",
      color:
        "text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400",
      bgColor:
        "bg-gray-100 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900/30",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Anthony Rojas",
      href: "https://www.linkedin.com/in/anthonyrojasv/",
      color: "text-blue-600 hover:text-blue-700 dark:hover:text-blue-400",
      bgColor:
        "bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40",
    },
    {
      icon: Mail,
      label: "Gmail",
      value: "anthonyatras@gmail.com",
      href: "mailto:anthonyatras@gmail.com",
      color: "text-red-600 hover:text-red-700 dark:hover:text-red-400",
      bgColor:
        "bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40",
    },
    {
      icon: Twitter,
      label: "X (Twitter)",
      value: "@Arojas2520",
      href: "https://x.com/Arojas2520",
      color:
        "text-slate-800 dark:text-white hover:text-slate-600 dark:hover:text-slate-300",
      bgColor:
        "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600",
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: "República Dominicana",
      href: "#",
      color: "text-green-600 hover:text-green-700 dark:hover:text-green-400",
      bgColor:
        "bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40",
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Alert Notification */}
        {alertState.show && (
          <div
            className={`fixed top-24 right-6 z-50 p-4 rounded-xl shadow-2xl backdrop-blur-md border transform transition-all duration-300 animate-slide-in-right ${
              alertState.type === "success"
                ? "bg-emerald-50/90 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-700"
                : "bg-red-50/90 border-red-200 dark:bg-red-900/30 dark:border-red-700"
            }`}
          >
            <div className="flex items-center space-x-3">
              {alertState.type === "success" ? (
                <CheckCircle
                  className="text-emerald-600 dark:text-emerald-400"
                  size={24}
                />
              ) : (
                <AlertCircle
                  className="text-red-600 dark:text-red-400"
                  size={24}
                />
              )}
              <p
                className={`font-medium ${
                  alertState.type === "success"
                    ? "text-emerald-800 dark:text-emerald-200"
                    : "text-red-800 dark:text-red-200"
                }`}
              >
                {alertState.message}
              </p>
            </div>
          </div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Contacto
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            ¿Tienes un proyecto en mente? ¡Hablemos! Siempre estoy abierto a
            nuevas oportunidades y colaboraciones.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info - Crystalline Cards */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-200">
              Conecta conmigo
            </h3>

            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl backdrop-blur-md bg-white/70 dark:bg-slate-800/70 border border-white/20 dark:border-slate-700/30 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

                  {link.href !== "#" ? (
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center space-x-4 p-6 relative z-10"
                    >
                      <div
                        className={`flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 ${link.bgColor}`}
                      >
                        <link.icon
                          size={24}
                          className={`transition-colors duration-300 ${link.color}`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {link.label}
                        </p>
                        <p className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                          {link.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center space-x-4 p-6 relative z-10">
                      <div
                        className={`flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 ${link.bgColor}`}
                      >
                        <link.icon
                          size={24}
                          className={`transition-colors duration-300 ${link.color}`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {link.label}
                        </p>
                        <p className="text-lg font-bold text-slate-800 dark:text-slate-200">
                          {link.value}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form - Crystalline Glass */}
          <div className="lg:col-span-3">
            <div
              className="relative overflow-hidden rounded-3xl backdrop-blur-md bg-white/80 dark:bg-slate-800/80 border border-white/20 dark:border-slate-700/30 shadow-2xl p-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-blue-500/5"></div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-200">
                  Envíame un mensaje
                </h3>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-6 py-4 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-slate-800 dark:text-slate-200 placeholder-slate-400 shadow-inner"
                        placeholder="Tu nombre completo"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-6 py-4 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-slate-800 dark:text-slate-200 placeholder-slate-400 shadow-inner"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
                      Asunto
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-slate-800 dark:text-slate-200 placeholder-slate-400 shadow-inner"
                      placeholder="¿De qué quieres hablar?"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
                      Mensaje
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-6 py-4 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/30 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-slate-800 dark:text-slate-200 placeholder-slate-400 shadow-inner resize-none"
                      placeholder="Cuéntame sobre tu proyecto, idea o simplemente saluda..."
                    />
                  </div>

                  <div
                    onClick={handleSubmit}
                    className={`group relative w-full py-4 px-8 rounded-xl font-bold text-white text-lg shadow-lg transform transition-all duration-300 overflow-hidden cursor-pointer ${
                      isSubmitting
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>

                    <div className="relative flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar mensaje
                          <Send
                            size={20}
                            className="group-hover:translate-x-1 transition-transform duration-300"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes slide-in-right {
            0% {
              transform: translateX(100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slide-in-right {
            animation: slide-in-right 0.5s ease-out;
          }
        `,
        }}
      />
    </section>
  );
};

export default Contact;
