/* eslint-disable no-console */
import { writeFile } from "node:fs/promises"
import path from "path"
import { defineConfig, s } from "velite"
import { FEATURES, PRICING, TASKS } from "./config/selection"
import { getAllTags, sortTagsByCount } from "./lib/helper"
import { encodeTitleToSlug } from "./lib/utils"

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
        tasks: s.array(s.enum(TASKS)).optional(),
        features: s.array(s.enum(FEATURES)).optional(),
        images: s
          .array(
            s.object({
              url: s.string().max(999),
              alt: s.string().max(99).optional(),
            })
          )
          .optional(),
        url: s.string().optional(),
        pricing: s.array(s.enum(PRICING)).optional(),
        visit: s.array(s.number()).default([0]),
        deals: s
          .array(
            s.object({
              url: s.string().max(999),
              name: s.string().max(99).optional(),
              price: s.string().max(99).optional(),
            })
          )
          .optional(),
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
        tasks: s.array(s.enum(TASKS)).optional(),
        features: s.array(s.enum(FEATURES)).optional(),
        images: s
          .array(
            s.object({
              url: s.string().max(999),
              alt: s.string().max(99).optional(),
            })
          )
          .optional(),
        url: s.string().optional(),
        pricing: s.array(s.enum(PRICING)).optional(),
        visit: s.array(s.number()).default([0]),
        deals: s
          .array(
            s.object({
              url: s.string().max(999),
              name: s.string().max(99).optional(),
              price: s.string().max(99).optional(),
            })
          )
          .optional(),
        ios: s.string().optional(),
        android: s.string().optional(),
        raw: s.raw(),
        toc: s.toc(),
      }),
    },
  },
  complete: async (data, ctx) => {
    const filePath = path.join(ctx.config.output.assets, "search-index.json")

    const { apps, alternatives } = data

    const { tasks } = getAllTags([...apps, ...alternatives])
    // TODO: add more info to showing
    // TODO: add features
    const sortedTasks = sortTagsByCount(tasks)

    const content = [
      ...apps
        .filter((app) => app.published)
        .sort((a, b) => (a.id > b.id ? -1 : 1))
        .map((item) => {
          return {
            slug: `/app/${item.slug}`,
            name: item.name,
          }
        }),
      ...alternatives
        .filter((app) => app.published)
        .sort((a, b) => (a.id > b.id ? -1 : 1))
        .map((item) => {
          return {
            slug: `/alternative/${item.slug}`,
            name: item.name,
          }
        }),
      ...sortedTasks.map((item) => {
        return {
          slug: `/tasks/${encodeTitleToSlug(item)}`,
          name: item,
        }
      }),
    ]
    const fileContent = JSON.stringify(content, null, 2)

    try {
      await writeFile(filePath, fileContent)
      console.log("File created successfully at:", filePath)
    } catch (error) {
      console.error("Error creating file:", error)
    }
  },
})
