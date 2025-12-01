import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/env.js'
import { ApiError } from './errorHandler.js'

interface JwtPayload {
  userId: string
  email: string
  role: string
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export function auth(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Access token required')
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload

    req.user = decoded
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new ApiError(401, 'Invalid or expired token'))
    } else {
      next(error)
    }
  }
}

export function adminOnly(req: Request, _res: Response, next: NextFunction) {
  if (req.user?.role !== 'ADMIN') {
    return next(new ApiError(403, 'Admin access required'))
  }
  next()
}
