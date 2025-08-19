// src/utils/paths.ts - Utilidad para manejar rutas en GitHub Pages

/**
 * Configuración para GitHub Pages
 */
export const GITHUB_CONFIG = {
  username: "AntRed1",
  repoName: "Portafolio",
  baseUrl: "/Portafolio",
} as const;

/**
 * Obtiene la ruta base según el entorno
 */
export const getBasePath = (): string => {
  const base = import.meta.env.BASE_URL || "/";
  return base === "/" ? "" : base.replace(/\/$/, ""); // Remove trailing slash
};

/**
 * Genera una ruta completa para assets considerando el entorno
 */
export const getAssetPath = (path: string): string => {
  const base = getBasePath();
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // En desarrollo local, usar ruta directa
  if (!base) {
    return `/${cleanPath}`;
  }

  // En producción (GitHub Pages), usar base path
  return `${base}/${cleanPath}`.replace(/\/+/g, "/");
};

/**
 * Genera la ruta para documentos en la carpeta docs/
 */
export const getDocumentPath = (filename: string): string => {
  return getAssetPath(`docs/${filename}`);
};

/**
 * Verifica si un archivo existe en el servidor
 */
export const checkFileExists = async (path: string): Promise<boolean> => {
  try {
    const response = await fetch(path, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Descarga un documento con manejo de errores
 */
export const downloadDocument = async (filename: string): Promise<void> => {
  try {
    const documentPath = getDocumentPath(filename);

    console.log(`Base URL: ${import.meta.env.BASE_URL}`);
    console.log(`Document path: ${documentPath}`);
    console.log(`Full URL: ${window.location.origin}${documentPath}`);

    // Verificar si el archivo existe
    const exists = await checkFileExists(documentPath);

    if (exists) {
      // Crear enlace de descarga
      const link = document.createElement("a");
      link.href = documentPath;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error(`Document not found: ${documentPath}`);

      // En desarrollo, intentar ruta alternativa
      if (import.meta.env.DEV) {
        const alternativePath = `/docs/${filename}`;
        console.log(`Trying alternative path: ${alternativePath}`);
        const altExists = await checkFileExists(alternativePath);

        if (altExists) {
          const link = document.createElement("a");
          link.href = alternativePath;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        }
      }

      throw new Error(`Document not found: ${filename}`);
    }
  } catch (error) {
    console.error("Error downloading document:", error);
    throw error;
  }
};

/**
 * Abre un documento en una nueva pestaña
 */
export const openDocumentInNewTab = async (filename: string): Promise<void> => {
  try {
    const documentPath = getDocumentPath(filename);
    const exists = await checkFileExists(documentPath);

    if (exists) {
      window.open(documentPath, "_blank");
    } else {
      console.error(`Document not found: ${documentPath}`);
      throw new Error(`Document not found: ${filename}`);
    }
  } catch (error) {
    console.error("Error opening document:", error);
    throw error;
  }
};

/**
 * Debug: Muestra información sobre las rutas
 */
export const debugPaths = (filename: string) => {
  console.group(`🔍 Path Debug for: ${filename}`);
  console.log(`Environment: ${import.meta.env.MODE}`);
  console.log(`Base URL: ${import.meta.env.BASE_URL}`);
  console.log(`Base Path: ${getBasePath()}`);
  console.log(`Asset Path: ${getAssetPath(`docs/${filename}`)}`);
  console.log(
    `Full URL: ${window.location.origin}${getDocumentPath(filename)}`
  );
  console.groupEnd();
};
