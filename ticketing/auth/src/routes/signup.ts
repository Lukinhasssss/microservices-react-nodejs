import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import BadRequestError from '../errors/bad-request-error'
import { validateRequest } from '../middlewares/validate-request'
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
], validateRequest, async (request: Request, response: Response) => {
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
  }, process.env.JWT_KEY!)

  // Store it on session object
  request.session = { jwt: userJwt }

  response.status(201).json(user)
})

export { router as signupRouter }
