import { Router } from 'express'
import projectRoutes from './projects.js'
import blogRoutes from './blog.js'
import contactRoutes from './contact.js'
import authRoutes from './auth.js'
import analyticsRoutes from './analytics.js'

const router = Router()

router.use('/projects', projectRoutes)
router.use('/posts', blogRoutes)
router.use('/contact', contactRoutes)
router.use('/auth', authRoutes)
router.use('/analytics', analyticsRoutes)

export default router
