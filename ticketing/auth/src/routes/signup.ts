import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import RequestValidationError from '../errors/request-validation-error'
import { User } from '../models/user'

const router = express.Router()

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must have at least 8 characters'),
], async (request: Request, response: Response) => {
  const errors = validationResult(request)

  if (!errors.isEmpty())
    throw new RequestValidationError(errors.array())

  const { email, password } = request.body

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    console.log('Email already in use')
    return response.json({})
  }

  const user = User.build({ email, password })
  await user.save()

  response.status(201).json(user)
})

export { router as signupRouter }
