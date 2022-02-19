import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('/api/users/currentuser', (request, response) => {
  if (!request.session?.jwt)
    return response.json({ currentUser: null })

  try {
    const payload = jwt.verify(request.session.jwt, process.env.JWT_KEY!)

    return response.json({ currentUser: payload })
  } catch (error) {
    return response.json({ currentUser: null })
  }
})

export { router as currentUserRouter }