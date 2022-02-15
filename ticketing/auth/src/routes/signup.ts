import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'
import BadRequestError from '../errors/bad-request-error'
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
], async (request: Request, response: Response) => {
  const errors = validationResult(request)

  if (!errors.isEmpty())
    throw new RequestValidationError(errors.array())

  const { email, password } = request.body

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new BadRequestError('Email already in use')
  }

  const user = User.build({ email, password })
  await user.save()

  // Generate JWT
  const userJwt = jwt.sign({
    id: user.id,
    email: user.email
  }, 'changeIt')

  // Store it on session object
  request.session = { jwt: userJwt }

  response.status(201).json(user)
})

export { router as signupRouter }
