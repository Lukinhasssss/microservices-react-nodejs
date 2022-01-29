import express from 'express'
import { currentUserRouter } from './routes/current-user'

const app = express()
app.use(express.json())

const port = 8080

app.use(currentUserRouter)

app.listen(port, () => {
  console.log(`Auth server is running on port: ${port}`)
})
