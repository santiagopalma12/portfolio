import type { Request, Response, NextFunction } from 'express'
import { z, ZodSchema } from 'zod'
import { ApiError } from './errorHandler.js'

export function validate(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string[]> = {}
        error.errors.forEach((err) => {
          const path = err.path.join('.')
          if (!errors[path]) {
            errors[path] = []
          }
          errors[path].push(err.message)
        })
        next(new ApiError(400, 'Validation error', errors))
      } else {
        next(error)
      }
    }
  }
}
