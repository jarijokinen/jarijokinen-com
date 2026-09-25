import type { CollectionEntry } from 'astro:content';

export interface PageMeta {
  title: string;
  description: string;
  type?: 'website' | 'article';
  created_at?: Date;
  updated_at?: Date;
  schema?: Record<string, unknown>;
}

type PostData = CollectionEntry<'blog'>['data'];

export type PostMeta = Pick<
  PostData,
  'title' | 'description' | 'created_at' | 'updated_at'
> & Pick<PageMeta, 'schema'>;
