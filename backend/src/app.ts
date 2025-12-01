import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { config } from './config/env.js'
import { errorHandler } from './middleware/errorHandler.js'
import routes from './routes/index.js'

const app = express()

// Security middleware
app.use(helmet())
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
})
app.use('/api', limiter)

// Body parser
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API routes
app.use('/api/v1', routes)

// Error handler
app.use(errorHandler)

export default app
