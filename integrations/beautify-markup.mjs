import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import beautify from 'js-beautify';

export const beautifyMarkup = (html) => {
  return beautify.html(html, {
    indent_size: 2,
    indent_char: ' ',
    indent_with_tabs: false,
    indent_inner_html: true,
    preserve_newlines: false,
    extra_liners: [],
    wrap_line_length: 80,
    end_with_newline: true,
    content_unformatted: ['pre', 'textarea'],
    templating: ['none']
  });
};

export const beautifyMarkupIntegration = () => {
  return {
    name: 'beautifyMarkup',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const entries = await readdir(dir, {
          recursive: true,
          withFileTypes: true
        });

        let count = 0;

        for (const entry of entries) {
          if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
          const path = join(entry.parentPath, entry.name);
          const html = await readFile(path, 'utf8');
          await writeFile(path, beautifyMarkup(html));
          count++;
        }
      }
    }
  };
};

export default beautifyMarkupIntegration;
