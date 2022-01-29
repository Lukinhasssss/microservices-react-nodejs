import express from 'express'

const router = express.Router()

router.post('/api/users/signup', (request, response) => {
  response.json({ message: 'Hello World!' })
})

export { router as signupRouter }