import { defineConfig, s } from "velite"

// `s` is extended from Zod with some custom schemas,
// you can also import re-exported `z` from `velite` if you don't need these extension schemas.

export default defineConfig({
  collections: {
    posts: {
      name: "Post", // collection type name
      pattern: "posts/**/*.mdx", // content files glob pattern
      schema: s.object({
        title: s.string().max(99), // Zod primitive type
        //   slug: s.slug('posts'), // validate format, unique in posts collection
        // slug: s.path(), // auto generate slug from file path
        //   date: s.isodate(), // input Date-like string, output ISO Date string.
        //   cover: s.image(), // input image relative path, output image object with blurImage.
        //   video: s.file().optional(), // input file relative path, output file public path.
        //   metadata: s.metadata(), // extract markdown reading-time, word-count, etc.
        //   excerpt: s.excerpt(), // excerpt of markdown content
        content: s.raw(), // transform markdown to html
      }),
      // more additional fields (computed fields)
      // .transform((data) => ({ ...data, permalink: `/blog/${data.slug}` })),
    },
    apps: {
      name: "App", // collection type name
      pattern: "app/**/*.mdx", // content files glob pattern
      schema: s.object({
        // required
        id: s.number(),
        slug: s.string().max(99),
        path: s.path(),
        name: s.string().max(50),
        title: s.string().max(120),
        image: s.object({
          url: s.string().max(999),
          alt: s.string().max(120).optional(),
        }),
        // optional
        description: s.string().max(999).optional(),
        published: s.boolean().default(true),
        tasks: s.array(s.string()).optional(),
        features: s.array(s.string()).optional(),
        images: s
          .array(
            s.object({
              url: s.string().max(999),
              alt: s.string().max(99).optional(),
            })
          )
          .optional(),
        url: s.string().optional(),
        pricing: s
          .array(s.enum(["Free", "Freemium", "Subscription", "OpenSource"]))
          .optional(),
        visit: s.array(s.number()).default([0]),
        ios: s.string().optional(),
        android: s.string().optional(),
        raw: s.raw(),
        toc: s.toc(),
        alternative: s
          .array(
            s
              .object({
                id: s.number().optional(),
                name: s.string().optional(),
                description: s.string().optional(),
                url: s.string().optional(),
              })
              .refine(
                (data) => data.id !== undefined || data.name !== undefined,
                {
                  message: "Either id or name must be provided",
                  path: ["id", "name"], // path to the field(s) causing the error
                }
              )
          )
          .optional(),
      }),
    },
    alternatives: {
      name: "Alternative", // collection type name
      pattern: "alternative/**/*.mdx", // content files glob pattern
      schema: s.object({
        // required
        id: s.number(),
        slug: s.string().max(99),
        path: s.path(),
        name: s.string().max(50),
        title: s.string().max(120),
        image: s.object({
          url: s.string().max(999),
          alt: s.string().max(120).optional(),
        }),
        // optional
        description: s.string().max(999).optional(),
        published: s.boolean().default(true),
        tasks: s.array(s.string()).optional(),
        features: s.array(s.string()).optional(),
        images: s
          .array(
            s.object({
              url: s.string().max(999),
              alt: s.string().max(99).optional(),
            })
          )
          .optional(),
        url: s.string().optional(),
        pricing: s
          .array(s.enum(["Free", "Freemium", "Subscription", "OpenSource"]))
          .optional(),
        visit: s.array(s.number()).default([0]),
        ios: s.string().optional(),
        android: s.string().optional(),
        raw: s.raw(),
        toc: s.toc(),
      }),
    },
  },
})
