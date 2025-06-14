import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { BadRequestError } from './routes/_errors/bad-request-error'
import { ResourceAlreadyExistsError } from './routes/_errors/resource-already-exists-error'
import { UnauthorizedError } from './routes/_errors/unauthorized-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  if (error instanceof ResourceAlreadyExistsError) {
    return reply.status(409).send({
      message: error.message,
    })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
}
