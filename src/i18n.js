import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        description: "This is the description in English",
        frontDeveloper: "Front Developer",
        alexisBeas: "Alexis Beas",
        download: "Download",
        aboutMeText: "I am a web developer with two years of experience in frontend using React, Node, and TypeScript. I enjoy creative challenges and team collaboration using Scrum methodologies. Currently, I work in the Comex area of Banco Galicia, participating in various projects.",
        contact: 'Contact',
        about: 'About'
      }
    },
    es: {
      translation: {
        welcome: "Bienvenido",
        description: "Esta es la descripción en español",
        frontDeveloper: "Programador Front",
        alexisBeas: "Alexis Beas",
        download: "Descargar",
        aboutMeText: "Soy desarrollador web con dos años de experiencia en frontend utilizando React, Node y TypeScript. Disfruto de los desafíos creativos y la colaboración en equipo con metodologías Scrum. Actualmente, trabajo en el área de Comex del Banco Galicia, participando en diversos proyectos.",
        contact: 'Contacto',
        about: 'Sobre mi'
      }
    }
  },
  lng: "es", // Idioma por defecto
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
