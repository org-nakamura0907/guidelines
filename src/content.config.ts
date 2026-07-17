import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const docs = defineCollection({
    loader: glob({ base: "./src/content/docs", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        title: z.string(),
        order: z.number().optional(),
    }),
});

export const collections = {
    docs,
};
