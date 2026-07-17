// @ts-check
import { defineConfig } from 'astro/config';
import { APP_BASE_PATH, APP_BASE_URL } from './src/shared/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: APP_BASE_URL,
    base: APP_BASE_PATH,
    integrations: [mdx(), react()],
    vite: {
        plugins: [tailwindcss()],
    },
});