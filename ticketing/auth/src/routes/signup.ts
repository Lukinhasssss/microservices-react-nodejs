import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import DatabaseConnectionError from '../errors/database-connection-error'
import RequestValidationError from '../errors/request-validation-error'

const router = express.Router()

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must have at least 8 characters'),
], (request: Request, response: Response) => {
  const errors = validationResult(request)

  if (!errors.isEmpty())
    throw new RequestValidationError(errors.array())

  const { email, password } = request.body

  console.log(`Creating user account with email: ${email}`)
  throw new DatabaseConnectionError()

  console.log(`Signing up user with email: ${email}`)
  response.json({ message: 'User signed up successfully' })
})

export { router as signupRouter }