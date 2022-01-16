const express = require("express");
const cors = require('cors')
const { randomBytes } = require('crypto')

const app = express()
app.use(express.json())
app.use(cors())

const port = 8080

const posts = {}

app.get("/posts", (request, response) => {
  response.json(posts)
})

app.post('/posts', (request, response) => {
  const id = randomBytes(4).toString('hex')
  const { title } = request.body

  posts[id] = { id, title }

  response.status(201).json(posts[id])
})

app.listen(port, () => {
  console.log(`Posts server is running on port: ${port}`)
})