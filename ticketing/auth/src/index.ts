import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

import errorHandler from './middlewares/error-handler'
import NotFoundError from './errors/not-found-error'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(cookieSession({
  signed: false,
  secure: true
}))

const port = 8080

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async (request, response) => {
  throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
  if (!process.env.JWT_KEY)
    throw new Error('JWT_KEY must be defined')

  try {
    await mongoose.connect('mongodb://auth-mongo-service:27017/auth')
    console.log('Connected to MongoDB')
  }
  catch (error) {
    console.log(error)
  }

  app.listen(port, () => {
    console.log(`Auth server is running on port: ${port}`)
  })
}

start()
