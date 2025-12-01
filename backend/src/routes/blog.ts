import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../config/database.js'
import { auth, adminOnly } from '../middleware/auth.js'
import { validate } from '../middleware/validation.js'
import { ApiError } from '../middleware/errorHandler.js'

const router = Router()

// Schemas
const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    excerpt: z.string().min(1, 'Excerpt is required'),
    content: z.string().min(1, 'Content is required'),
    coverImage: z.string().url().optional(),
    published: z.boolean().default(false),
    readTime: z.number().default(5),
    tagIds: z.array(z.string()).optional(),
  }),
})

// GET /posts - List published posts
router.get('/', async (req, res, next) => {
  try {
    const { page = '1', limit = '10' } = req.query

    const where = { published: true }

    const posts = await prisma.blogPost.findMany({
      where,
      include: {
        author: { select: { id: true, name: true, email: true } },
        tags: { include: { tag: true } },
      },
      orderBy: { publishedAt: 'desc' },
      take: parseInt(limit as string),
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
    })

    const total = await prisma.blogPost.count({ where })

    res.json({
      success: true,
      data: posts.map((p) => ({
        ...p,
        tags: p.tags.map((t) => t.tag),
      })),
      meta: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    })
  } catch (error) {
    next(error)
  }
})

// GET /posts/:slug - Get post by slug
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params

    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: { select: { id: true, name: true, email: true } },
        tags: { include: { tag: true } },
      },
    })

    if (!post) {
      throw new ApiError(404, 'Post not found')
    }

    // Increment views
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    })

    res.json({
      success: true,
      data: {
        ...post,
        views: post.views + 1,
        tags: post.tags.map((t) => t.tag),
      },
    })
  } catch (error) {
    next(error)
  }
})

// POST /posts - Create post (auth required)
router.post('/', auth, adminOnly, validate(createPostSchema), async (req, res, next) => {
  try {
    const { tagIds, ...data } = req.body

    const post = await prisma.blogPost.create({
      data: {
        ...data,
        authorId: req.user!.userId,
        publishedAt: data.published ? new Date() : null,
        tags: tagIds
          ? {
              create: tagIds.map((tagId: string) => ({ tagId })),
            }
          : undefined,
      },
      include: {
        author: { select: { id: true, name: true, email: true } },
        tags: { include: { tag: true } },
      },
    })

    res.status(201).json({
      success: true,
      data: {
        ...post,
        tags: post.tags.map((t) => t.tag),
      },
    })
  } catch (error) {
    next(error)
  }
})

// PUT /posts/:id - Update post (auth required)
router.put('/:id', auth, adminOnly, async (req, res, next) => {
  try {
    const { id } = req.params
    const { tagIds, ...data } = req.body

    // Delete existing tags
    await prisma.postTag.deleteMany({ where: { postId: id } })

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        publishedAt: data.published ? new Date() : null,
        tags: tagIds
          ? {
              create: tagIds.map((tagId: string) => ({ tagId })),
            }
          : undefined,
      },
      include: {
        author: { select: { id: true, name: true, email: true } },
        tags: { include: { tag: true } },
      },
    })

    res.json({
      success: true,
      data: {
        ...post,
        tags: post.tags.map((t) => t.tag),
      },
    })
  } catch (error) {
    next(error)
  }
})

// DELETE /posts/:id - Delete post (auth required)
router.delete('/:id', auth, adminOnly, async (req, res, next) => {
  try {
    const { id } = req.params

    await prisma.blogPost.delete({ where: { id } })

    res.json({
      success: true,
      message: 'Post deleted successfully',
    })
  } catch (error) {
    next(error)
  }
})

export default router
