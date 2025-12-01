import { Router } from 'express'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt, { SignOptions } from 'jsonwebtoken'
import { prisma } from '../config/database.js'
import { config } from '../config/env.js'
import { validate } from '../middleware/validation.js'
import { ApiError } from '../middleware/errorHandler.js'
import { auth } from '../middleware/auth.js'

const router = Router()

// Schemas
const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
})

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
})

// POST /auth/login
router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      throw new ApiError(401, 'Invalid credentials')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      throw new ApiError(401, 'Invalid credentials')
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    })
  } catch (error) {
    next(error)
  }
})

// POST /auth/register (only for initial setup, can be disabled)
router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
      throw new ApiError(400, 'Email already registered')
    }

    // Check if this is the first user (make them admin)
    const userCount = await prisma.user.count()
    const role = userCount === 0 ? 'ADMIN' : 'EDITOR'

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as 'ADMIN' | 'EDITOR',
      },
    })

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      config.jwt.secret,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    })
  } catch (error) {
    next(error)
  }
})

// GET /auth/me - Get current user
router.get('/me', auth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: { id: true, email: true, name: true, role: true },
    })

    if (!user) {
      throw new ApiError(404, 'User not found')
    }

    res.json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
})

// POST /auth/logout
router.post('/logout', (_req, res) => {
  // With JWT, logout is handled client-side by removing the token
  res.json({
    success: true,
    message: 'Logged out successfully',
  })
})

export default router
