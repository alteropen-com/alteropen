/* eslint-disable no-console */
import { exec } from "child_process"
import { writeFile } from "node:fs/promises"
import path from "path"
import { promisify } from "util"
import { defineConfig, s } from "velite"
import { FEATURES, PRICING, TASKS } from "./config/selection"
import { getAllTags, sortTagsByCount } from "./lib/helper"
import { encodeTitleToSlug, stringToUniqueNumber } from "./lib/utils"

const execAsync = promisify(exec)

const timestamp = () =>
  s
    .custom((i) => i === undefined || typeof i === "string")
    .transform(async (value, { meta, addIssue }) => {
      if (value != null) {
        addIssue({
          fatal: false,
          code: "custom",
          message:
            "`s.timestamp()` schema will resolve the value from `git log -1 --format=%cd`",
        })
      }
      try {
        const { stdout } = await execAsync(
          `git log -1 --format=%cd -- ${meta.path}`
        )
        return new Date(stdout.trim() || Date.now()).toISOString()
      } catch (error) {
        console.error(`Error retrieving git timestamp for ${meta.path}:`, error)
        // Return a default or current timestamp in case of an error
        return new Date().toISOString()
      }
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
        // published: s.boolean().default(false),
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
    const { alternatives } = data

    const { tasks } = getAllTags(alternatives)
    // TODO: add more info to showing
    // TODO: add features
    const sortedTasks = sortTagsByCount(tasks)

    const content = [
      ...alternatives
        .filter((app) => app.published)
        .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
        .map((item) => {
          return {
            id: item.id,
            slug: `/alternative/${item.slug}`,
            name: item.name,
            visit: item.visit[0],
            title: item.title,
            features: item.features,
            alternative: item.alternative,
            description: item.description,
            lastModified: item.lastModified,
          }
        }),
      ...sortedTasks.map((item) => {
        return {
          id: stringToUniqueNumber(item),
          slug: `/tasks/${encodeTitleToSlug(item)}`,
          name: item,
          visit: 0,
        }
      }),
    ]

    try {
      // csreate AI index
      const aiContent = JSON.stringify(content, null, 2)
      const aiPath = path.join(ctx.config.output.assets, "ai-index.json")
      await writeFile(aiPath, aiContent)
      console.log("File created successfully at:", aiPath)

      // create search index, don't need title, description, lastModified
      const contentSearch = content.map((item) => {
        return {
          id: item.id,
          slug: item.slug,
          name: item.name,
          visit: item.visit,
          title: item.title || "",
          alternative:
            item?.alternative?.map((item) => item?.name).join(",") || "",
        }
      })
      const searchContent = JSON.stringify(contentSearch, null, 2)
      const searchPath = path.join(
        ctx.config.output.assets,
        "search-index.json"
      )
      await writeFile(searchPath, searchContent)
      console.log("File created successfully at:", searchPath)
    } catch (error) {
      console.error("Error creating file:", error)
    }
  },
})
