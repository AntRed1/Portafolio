# 🚀 **AntRed1 Portafolio**

<div align="center">

![Portafolio Preview](https://via.placeholder.com/800x400/4F46E5/ffffff?text=AntRed1+Portafolio)

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-4F46E5?style=for-the-badge)](https://antred1.dev)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/AntRed1/Portafolio)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/antred1)

*Un Portafolio moderno y responsivo construido con tecnologías de vanguardia*

</div>

---

## ✨ **Características**

- 🎨 **Diseño Moderno**: UI/UX elegante con efectos de glassmorphism
- 🌙 **Modo Oscuro**: Tema claro/oscuro automático y manual
- 📱 **Completamente Responsivo**: Optimizado para todos los dispositivos
- ⚡ **Alto Rendimiento**: Carga rápida y animaciones fluidas
- 🌐 **Multiidioma**: Soporte completo para Español e Inglés
- 🔄 **Auto-actualización**: Proyectos sincronizados con GitHub API
- 📊 **Sistema de Categorías**: Filtrado inteligente de proyectos
- 🔍 **Búsqueda Avanzada**: Encuentra proyectos por nombre, descripción o tecnología
- 🚀 **PWA Ready**: Funcionalidad de Progressive Web App
- ♿ **Accesible**: Cumple con estándares de accesibilidad web

---

## 🛠️ **Stack Tecnológico**

### **Frontend Core**

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

### **Styling & UI**

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide_React-F56565?style=flat-square&logo=lucide&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

### **State Management & Hooks**

![React Hooks](https://img.shields.io/badge/React_Hooks-61DAFB?style=flat-square&logo=react&logoColor=black)
![Context API](https://img.shields.io/badge/Context_API-61DAFB?style=flat-square&logo=react&logoColor=black)

### **APIs & Integración**

![GitHub API](https://img.shields.io/badge/GitHub_API-181717?style=flat-square&logo=github&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-FF6B6B?style=flat-square&logo=api&logoColor=white)

### **Herramientas de Desarrollo**

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)

---

## 🚀 **Instalación y Configuración**

### **Prerequisitos**

```bash
node >= 18.0.0
npm >= 9.0.0
git
```

### **Instalación**

```bash
# Clonar el repositorio
git clone https://github.com/AntRed1/Portafolio.git

# Navegar al directorio
cd Portafolio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### **Comandos Disponibles**

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Compilar para producción
npm run preview      # Vista previa del build
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores de ESLint
npm run type-check   # Verificar tipos TypeScript
```

---

## 📁 **Estructura del Proyecto**

```
Portafolio/
├── 📁 public/                    # Archivos estáticos
│   ├── 🖼️ images/               # Imágenes y assets
│   └── 📄 favicon.ico           # Favicon
├── 📁 src/                      # Código fuente
│   ├── 📁 components/           # Componentes React
│   │   ├── 🏠 Hero.tsx         # Sección principal
│   │   ├── 📊 Projects.tsx     # Grid de proyectos
│   │   ├── 👤 About.tsx        # Sección sobre mí
│   │   ├── 🎯 Skills.tsx       # Habilidades técnicas
│   │   ├── 📞 Contact.tsx      # Formulario de contacto
│   │   └── 🧩 Layout/          # Componentes de layout
│   ├── 📁 context/             # Context providers
│   │   ├── 🌐 LanguageContext  # Internacionalización
│   │   └── 🌙 ThemeContext     # Tema claro/oscuro
│   ├── 📁 hooks/               # Custom hooks
│   │   ├── 👀 useInView.ts     # Detectar elementos visibles
│   │   ├── 🌙 useTheme.ts      # Hook de tema
│   │   └── 🌐 useLanguage.ts   # Hook de idioma
│   ├── 📁 utils/               # Utilidades
│   │   ├── 🔧 constants.ts     # Constantes de la app
│   │   └── 🌐 translations.ts  # Textos multiidioma
│   ├── 📁 styles/              # Estilos globales
│   │   └── 🎨 globals.css      # CSS global y variables
│   └── 📄 main.tsx             # Punto de entrada
├── 📄 package.json             # Dependencias del proyecto
├── 📄 tsconfig.json           # Configuración TypeScript
├── 📄 vite.config.ts          # Configuración Vite
├── 📄 tailwind.config.js      # Configuración Tailwind
└── 📄 README.md               # Documentación
```

---

## 🌟 **Características Técnicas**

### **🎨 Diseño y UX**

- **Glassmorphism Effects**: Efectos de vidrio modernos con backdrop-filter
- **Smooth Animations**: Transiciones fluidas con CSS y framer-motion
- **Responsive Design**: Grid system adaptativo para todos los dispositivos
- **Dark/Light Theme**: Transición suave entre temas con persistencia

### **⚡ Rendimiento**

- **Code Splitting**: Carga lazy de componentes
- **Image Optimization**: Imágenes optimizadas y lazy loading
- **Bundle Optimization**: Tree shaking y minificación avanzada
- **Caching Strategy**: Estrategia de caché inteligente

### **🔄 Integración GitHub**

- **Auto-sync Projects**: Sincronización automática con repositorios
- **Smart Fallback**: Sistema de respaldo con datos estáticos
- **Rate Limit Handling**: Manejo inteligente de límites de API
- **Retry Logic**: Reintentos automáticos con backoff exponencial

### **🌐 Internacionalización**

- **React Context**: Sistema de idiomas con React Context
- **Dynamic Loading**: Carga dinámica de traducciones
- **Locale Detection**: Detección automática del idioma del navegador

---

## 🎯 **Funcionalidades Principales**

### **📊 Sistema de Proyectos Inteligente**

```typescript
// Auto-categorización basada en tecnologías
const determineCategory = (languages, topics) => {
  // Lógica inteligente para categorizar proyectos
}

// Sistema de retry robusto
const fetchWithRetry = async (url, options) => {
  // Reintentos automáticos con timeouts
}
```

### **🔍 Búsqueda y Filtrado Avanzado**

- Búsqueda en tiempo real por nombre, descripción y tecnologías
- Filtros por categoría (Frontend, Backend, Mobile, Full-stack)
- Sistema de tags dinámico basado en topics de GitHub

### **📱 Progressive Web App**

- Service Worker para funcionalidad offline
- Manifest para instalación en dispositivos
- Caching estratégico de recursos críticos

---

## 🚀 **Deploy y Hosting**

### **Netlify Deploy**

```bash
# Build automático desde GitHub
npm run build

# Deploy con optimizaciones
netlify deploy --prod --dir=dist
```

### **Vercel Deploy**

```bash
# Deploy desde repositorio
vercel --prod
```

### **Variables de Entorno**

```env
VITE_GITHUB_TOKEN=your_github_token      # Opcional: Para mayor rate limit
VITE_EMAIL_SERVICE_ID=your_emailjs_id    # Para formulario de contacto
VITE_GA_TRACKING_ID=your_ga_id           # Google Analytics
```

---

## 🔧 **Personalización**

### **Colores y Tema**

```css
/* tailwind.config.js */
module.exports = {
  theme: {
 extend: {
   colors: {
  primary: {
    50: '#eff6ff',
    500: '#4F46E5',
    900: '#312e81'
  }
   }
 }
  }
}
```

### **Configuración Personal**

```typescript
// src/utils/constants.ts
export const PERSONAL_INFO = {
  name: "Tu Nombre",
  title: "Tu Título",
  github: "tu-usuario",
  email: "tu@email.com"
}
```

---

## 📈 **Métricas y Rendimiento**

- ⚡ **Lighthouse Score**: 95+ en todas las categorías
- 📱 **Mobile First**: Diseñado primero para móviles
- 🚀 **Core Web Vitals**: Optimizado para métricas de Google
- ♿ **A11y Score**: 100% accesibilidad
- 🌍 **SEO Optimized**: Meta tags y structured data

---

## 🤝 **Contribuir**

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el proyecto:

1. 🍴 Fork el repositorio
2. 🌟 Crea una branch: `git checkout -b feature/nueva-funcionalidad`
3. 💾 Commit tus cambios: `git commit -m 'Add: nueva funcionalidad'`
4. 📤 Push a la branch: `git push origin feature/nueva-funcionalidad`
5. 🔄 Abre un Pull Request

---

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 📞 **Contacto**

<div align="center">

**¿Tienes alguna pregunta o propuesta?**

[![Email](https://img.shields.io/badge/Email-Contact_Me-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tu@email.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/antred1)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AntRed1)

</div>

---

<div align="center">

**⭐ Si te gusta este proyecto, ¡dale una estrella! ⭐**

*Hecho con ❤️ y mucho ☕ por [AntRed1](https://github.com/AntRed1)*

</div>
