const express = require("express");
const cors = require('cors')
const { randomBytes } = require('crypto');
const { default: axios } = require("axios");

const app = express()
app.use(express.json())
app.use(cors())

const port = 8080

const posts = {}

app.get("/posts", (request, response) => {
  response.json(posts)
})

app.post('/posts', async (request, response) => {
  const id = randomBytes(4).toString('hex')
  const { title } = request.body

  posts[id] = { id, title }

  await axios.post('http://localhost:8090/events', {
    type: 'PostCreated',
    data: { id, title }
  })

  response.status(201).json(posts[id])
})

app.post('/events', (request, response) => {
  console.log(`Received Event: ${request.body.type}`)

  response.json({})
})

app.listen(port, () => {
  console.log(`Posts server is running on port: ${port}`)
})