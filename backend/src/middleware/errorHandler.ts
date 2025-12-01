import type { Request, Response, NextFunction } from 'express'

interface AppError extends Error {
  statusCode?: number
  errors?: Record<string, string[]>
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error('Error:', err)

  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

export class ApiError extends Error {
  statusCode: number
  errors?: Record<string, string[]>

  constructor(statusCode: number, message: string, errors?: Record<string, string[]>) {
    super(message)
    this.statusCode = statusCode
    this.errors = errors
  }
}
