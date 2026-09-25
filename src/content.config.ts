import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date().optional()
  })
});

export const collections = { blog };
