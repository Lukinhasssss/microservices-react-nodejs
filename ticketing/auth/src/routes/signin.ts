import express from 'express'

const router = express.Router()

router.post('/api/users/signin', (request, response) => {
  response.json({ message: 'Hello World!' })
})

export { router as signinRouter }