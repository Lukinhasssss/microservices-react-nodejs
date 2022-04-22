import express from 'express'
import jwt from 'jsonwebtoken'
import { currentUser } from '../middlewares/current-user'

const router = express.Router()

router.get('/api/users/currentuser', currentUser, (request, response) => {
  response.json({ currentUser: request.currentUser || null })
})

export { router as currentUserRouter }