// utils/paths.js - Utilidad para manejar rutas en GitHub Pages
export const getAssetPath = (path) => {
  const base = import.meta.env.BASE_URL || "/";
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // En desarrollo local, usar ruta directa
  if (base === "/") {
    return `/${cleanPath}`;
  }

  // En producción (GitHub Pages), usar base path
  return `${base}${cleanPath}`.replace(/\/+/g, "/");
};

export const getDocumentPath = (filename) => {
  return getAssetPath(`docs/${filename}`);
};

// Configuración para GitHub Pages
export const GITHUB_CONFIG = {
  username: "AntRed1", // Cambia por tu username real de GitHub
  repoName: "Portafolio", // Cambia por el nombre real de tu repositorio
  baseUrl: "/Portafolio", // Debe coincidir con tu vite.config.js
};

// Versión mejorada del componente CV/Resume con mejor manejo de errores
export const CVDownloadButton = () => {
  const handleDownload = async (filename) => {
    try {
      const documentPath = getDocumentPath(filename);
      console.log(`Base URL: ${import.meta.env.BASE_URL}`);
      console.log(`Attempting to download: ${documentPath}`);
      console.log(`Full URL: ${window.location.origin}${documentPath}`);

      // Verificar si el archivo existe primero
      const response = await fetch(documentPath, { method: "HEAD" });

      if (response.ok) {
        // Si existe, abrir en nueva ventana para descarga
        window.open(documentPath, "_blank");
      } else {
        console.error(`Document not found: ${documentPath}`);
        console.error(`HTTP Status: ${response.status}`);

        // Intentar ruta alternativa si estamos en desarrollo
        if (import.meta.env.DEV) {
          const alternativePath = `/public/docs/${filename}`;
          console.log(`Trying alternative path: ${alternativePath}`);
          window.open(alternativePath, "_blank");
        } else {
          alert("Documento no disponible temporalmente");
        }
      }
    } catch (error) {
      console.error("Error downloading document:", error);
      alert("Error al descargar el documento");
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={() => handleDownload("CV_ANTROJAS.pdf")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span>Descargar CV</span>
      </button>

      <button
        onClick={() => handleDownload("AZ-400.pdf")}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span>Certificación Azure</span>
      </button>
    </div>
  );
};
