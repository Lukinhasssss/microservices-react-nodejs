import express from 'express'

const router = express.Router()

router.get('/api/users/currentuser', (request, response) => {
  response.json({ message: 'Hello World!' })
})

export { router as currentUserRouter }