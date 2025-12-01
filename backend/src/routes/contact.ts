import { Router } from 'express'
import { z } from 'zod'
import { prisma, Prisma } from '../config/database.js'
import { auth, adminOnly } from '../middleware/auth.js'
import { validate } from '../middleware/validation.js'
import { ContactStatus } from '@prisma/client'

const router = Router()

// Schemas
const contactSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  }),
})

// POST /contact - Send contact message
router.post('/', validate(contactSchema), async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body

    const contact = await prisma.contact.create({
      data: { name, email, subject, message },
    })

    // TODO: Send email notification

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      data: { id: contact.id },
    })
  } catch (error) {
    next(error)
  }
})

// GET /contact - List messages (auth required)
router.get('/', auth, adminOnly, async (req, res, next) => {
  try {
    const { status, page = '1', limit = '20' } = req.query

    const where: Prisma.ContactWhereInput = status 
      ? { status: status as ContactStatus } 
      : {}

    const messages = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit as string),
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
    })

    const total = await prisma.contact.count({ where })

    res.json({
      success: true,
      data: messages,
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

// PATCH /contact/:id/status - Update message status (auth required)
router.patch('/:id/status', auth, adminOnly, async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const contact = await prisma.contact.update({
      where: { id },
      data: { status },
    })

    res.json({
      success: true,
      data: contact,
    })
  } catch (error) {
    next(error)
  }
})

export default router
