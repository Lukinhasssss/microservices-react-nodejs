import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (request, response) => {
  request.session = null
  response.json({})
})

export { router as signoutRouter }