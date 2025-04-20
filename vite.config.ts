import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import SitemapPlugin from 'vite-plugin-sitemap';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), SitemapPlugin()],
});
