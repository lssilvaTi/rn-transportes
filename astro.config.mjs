// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://rntransportesbh.com.br',
  vite: {
    plugins: [tailwindcss()]
  }
});
