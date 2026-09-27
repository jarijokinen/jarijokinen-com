import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import beautifyMarkup from './integrations/beautify-markup.mjs';

export default defineConfig({
  compressHTML: false,
  devToolbar: { enabled: false },
  integrations: [beautifyMarkup(), sitemap()],
  site: 'https://jarijokinen.com'
});
