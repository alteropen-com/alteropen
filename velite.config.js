/* eslint-disable no-console */
import { stat, writeFile } from "node:fs/promises"
import path from "path"
import { defineConfig, s } from "velite"
import { FEATURES, PRICING, TASKS } from "./config/selection"
import { getAllTags, sortTagsByCount } from "./lib/helper"
import { encodeTitleToSlug } from "./lib/utils"

const timestamp = () =>
  s
    .custom((i) => i === undefined || typeof i === "string")
    .transform(async (value, { meta, addIssue }) => {
      if (value != null) {
        addIssue({
          fatal: false,
          code: "custom",
          message:
            "`s.timestamp()` schema will resolve the file modified timestamp",
        })
      }

      const stats = await stat(meta.path)
      return stats.mtime.toISOString()
    })

const appSchema = s.object({
  // required
  id: s.number(),
  slug: s.string().max(99),
  path: s.path(),
  name: s.string().max(50),
  title: s.string().max(200),
  image: s.object({
    url: s.string().max(999),
    alt: s.string().max(200).optional(),
  }),
  lastModified: timestamp(),
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
  popularSearch: s.array(s.string()).optional(),

  ios: s.string().optional(),
  android: s.string().optional(),
  raw: s.raw(),
  toc: s.toc(),
  alternative: s
    .array(
      s.object({
        id: s.number().optional(),
        name: s.string(),
        description: s.string().optional(),
        published: s.boolean().default(false),
        url: s.string().optional(),
        image: s
          .object({
            url: s.string().max(999),
            alt: s.string().max(99).optional(),
          })
          .optional(),
        properties: s.record(s.union([s.string(), s.number()])).optional(),
        deals: s.array(s.object()).optional(),
      })
    )
    .optional(),
  recommend: s.number().default(0),
  deals: s
    .array(
      s.object({
        url: s.string().max(999),
        name: s.string().max(99).optional(),
        price: s.string().max(99).optional(),
        "Availability Starts": s.string().optional(),
        "Availability Ends": s.string().optional(),
      })
    )
    .optional(),
  properties: s.record(s.union([s.string(), s.number()])).optional(),
})

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
    alternatives: {
      name: "Alternative", // collection type name
      pattern: "alternative/**/*.mdx", // content files glob pattern
      schema: appSchema,
    },
  },
  complete: async (data, ctx) => {
    const filePath = path.join(ctx.config.output.assets, "search-index.json")

    const { alternatives } = data

    const { tasks } = getAllTags(alternatives)
    // TODO: add more info to showing
    // TODO: add features
    const sortedTasks = sortTagsByCount(tasks)

    const content = [
      ...alternatives
        .filter((app) => app.published)
        .sort((a, b) => (a.id > b.id ? -1 : 1))
        .map((item) => {
          return {
            id: item.id,
            slug: `/alternative/${item.slug}`,
            name: item.name,
            visit: item.visit[0],
          }
        }),
      ...sortedTasks.map((item, index) => {
        return {
          id: index,
          slug: `/tasks/${encodeTitleToSlug(item)}`,
          name: item,
          visit: 0,
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
