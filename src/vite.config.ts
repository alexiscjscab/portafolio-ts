import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Directorio de salida para la build
    assetsDir: 'assets',  // Directorio para los assets estáticos
    sourcemap: true,  // Mapa de fuentes para debugging
  },
  base: './',  // Configuración base para asegurar que los recursos se carguen correctamente
});
