import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  compressHTML: false,
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  site: 'https://jarijokinen.com'
});
