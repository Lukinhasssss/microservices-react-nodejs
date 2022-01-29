import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (request, response) => {
  response.json({ message: 'Hello World!' })
})

export { router as signoutRouter }