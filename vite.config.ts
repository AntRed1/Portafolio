import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Solo usar base path en producción (GitHub Pages)
  base: process.env.NODE_ENV === "production" ? "/Portafolio" : "/",
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // Asegurar que los assets se copien correctamente
    rollupOptions: {
      output: {
        // Mantener nombres de archivos consistentes
        assetFileNames: "assets/[name].[hash][extname]",
        chunkFileNames: "assets/[name].[hash].js",
        entryFileNames: "assets/[name].[hash].js",
      },
    },
    // Copiar archivos estáticos
    copyPublicDir: true,
  },
  // Configuración para desarrollo
  server: {
    port: 3000,
    open: true,
  },
  // Configuración para preview (simula GitHub Pages)
  preview: {
    port: 4173,
    open: true,
    // En preview usar el base path para simular GitHub Pages
    base: "/Portafolio",
  },
  // Configurar archivos públicos
  publicDir: "public",
});
