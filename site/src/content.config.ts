import { defineCollection, z } from "astro:content";

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

const quotelist = defineCollection({
  type: "data",
  schema: z.object({
    quotes: z.array(
      z.object({
        text: z.string(),
        author: z.string().optional(),
        source: z.string().optional(),
      })
    ),
  }),
});

export const collections = {
  pages,
  quotelist,
};
