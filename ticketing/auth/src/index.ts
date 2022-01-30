import express from 'express'
import 'express-async-errors'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

import errorHandler from './middlewares/error-handler'
import NotFoundError from './errors/not-found-error'

const app = express()
app.use(express.json())

const port = 8080

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async (request, response) => {
  throw new NotFoundError()
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Auth server is running on port: ${port}`)
})
