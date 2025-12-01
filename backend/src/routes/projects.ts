import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../config/database.js'
import { auth, adminOnly } from '../middleware/auth.js'
import { validate } from '../middleware/validation.js'
import { ApiError } from '../middleware/errorHandler.js'

const router = Router()

// Schemas
const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().min(1, 'Description is required'),
    content: z.string().min(1, 'Content is required'),
    imageUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    technologies: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    published: z.boolean().default(false),
    order: z.number().default(0),
    tagIds: z.array(z.string()).optional(),
  }),
})

// GET /projects - List published projects
router.get('/', async (req, res, next) => {
  try {
    const { featured, page = '1', limit = '10' } = req.query

    const where = {
      published: true,
      ...(featured === 'true' && { featured: true }),
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        tags: {
          include: { tag: true },
        },
      },
      orderBy: { order: 'asc' },
      take: parseInt(limit as string),
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
    })

    const total = await prisma.project.count({ where })

    res.json({
      success: true,
      data: projects.map((p) => ({
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

// GET /projects/:slug - Get project by slug
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params

    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        tags: {
          include: { tag: true },
        },
      },
    })

    if (!project) {
      throw new ApiError(404, 'Project not found')
    }

    res.json({
      success: true,
      data: {
        ...project,
        tags: project.tags.map((t) => t.tag),
      },
    })
  } catch (error) {
    next(error)
  }
})

// POST /projects - Create project (auth required)
router.post('/', auth, adminOnly, validate(createProjectSchema), async (req, res, next) => {
  try {
    const { tagIds, ...data } = req.body

    const project = await prisma.project.create({
      data: {
        ...data,
        tags: tagIds
          ? {
              create: tagIds.map((tagId: string) => ({ tagId })),
            }
          : undefined,
      },
      include: {
        tags: {
          include: { tag: true },
        },
      },
    })

    res.status(201).json({
      success: true,
      data: {
        ...project,
        tags: project.tags.map((t) => t.tag),
      },
    })
  } catch (error) {
    next(error)
  }
})

// PUT /projects/:id - Update project (auth required)
router.put('/:id', auth, adminOnly, async (req, res, next) => {
  try {
    const { id } = req.params
    const { tagIds, ...data } = req.body

    // Delete existing tags
    await prisma.projectTag.deleteMany({ where: { projectId: id } })

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        tags: tagIds
          ? {
              create: tagIds.map((tagId: string) => ({ tagId })),
            }
          : undefined,
      },
      include: {
        tags: {
          include: { tag: true },
        },
      },
    })

    res.json({
      success: true,
      data: {
        ...project,
        tags: project.tags.map((t) => t.tag),
      },
    })
  } catch (error) {
    next(error)
  }
})

// DELETE /projects/:id - Delete project (auth required)
router.delete('/:id', auth, adminOnly, async (req, res, next) => {
  try {
    const { id } = req.params

    await prisma.project.delete({ where: { id } })

    res.json({
      success: true,
      message: 'Project deleted successfully',
    })
  } catch (error) {
    next(error)
  }
})

export default router
