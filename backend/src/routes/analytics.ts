import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../config/database.js'
import { auth, adminOnly } from '../middleware/auth.js'
import { validate } from '../middleware/validation.js'

const router = Router()

// Schemas
const pageviewSchema = z.object({
  body: z.object({
    path: z.string().min(1, 'Path is required'),
    referrer: z.string().optional(),
    userAgent: z.string().optional(),
    country: z.string().optional(),
  }),
})

// POST /analytics/pageview - Track page view
router.post('/pageview', validate(pageviewSchema), async (req, res, next) => {
  try {
    const { path, referrer, userAgent, country } = req.body

    await prisma.analytics.create({
      data: { path, referrer, userAgent, country },
    })

    res.status(201).json({
      success: true,
      message: 'Pageview tracked',
    })
  } catch (error) {
    next(error)
  }
})

// GET /analytics/stats - Get analytics stats (auth required)
router.get('/stats', auth, adminOnly, async (req, res, next) => {
  try {
    const { days = '30' } = req.query
    const daysAgo = new Date()
    daysAgo.setDate(daysAgo.getDate() - parseInt(days as string))

    // Total pageviews
    const totalViews = await prisma.analytics.count({
      where: { createdAt: { gte: daysAgo } },
    })

    // Views by path
    const viewsByPath = await prisma.analytics.groupBy({
      by: ['path'],
      _count: { path: true },
      where: { createdAt: { gte: daysAgo } },
      orderBy: { _count: { path: 'desc' } },
      take: 10,
    })

    // Views by day
    const analytics = await prisma.analytics.findMany({
      where: { createdAt: { gte: daysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    })

    const viewsByDay: Record<string, number> = {}
    analytics.forEach((a) => {
      const day = a.createdAt.toISOString().split('T')[0]
      viewsByDay[day] = (viewsByDay[day] || 0) + 1
    })

    res.json({
      success: true,
      data: {
        totalViews,
        viewsByPath: viewsByPath.map((v) => ({
          path: v.path,
          count: v._count.path,
        })),
        viewsByDay: Object.entries(viewsByDay).map(([date, count]) => ({
          date,
          count,
        })),
      },
    })
  } catch (error) {
    next(error)
  }
})

export default router
