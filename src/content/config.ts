import { defineCollection, type SchemaContext, z } from 'astro:content';

const blogSchema = z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    image: z.object({
        url: z.string(),
        alt: z.string()
    }).optional(),
    category: z.enum(['devlog', 'musings']).optional(),
    tags: z.array(z.string()).optional(),
    comments: z.object({
        discord: z.string().url()
    }).optional(),
});

export type BlogPost = z.infer<typeof blogSchema>;

const blog = defineCollection({
    type: 'content',
    schema: blogSchema
});

export const collections = {
    'blog': blog
};