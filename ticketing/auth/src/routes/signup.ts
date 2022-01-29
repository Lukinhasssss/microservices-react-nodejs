import express, { Request, Response } from 'express'
import { body } from 'express-validator'

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
  const { email, password } = request.body

  
})

export { router as signupRouter }