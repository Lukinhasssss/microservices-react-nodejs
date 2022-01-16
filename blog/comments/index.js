const express = require("express");
const cors = require('cors')
const { randomBytes } = require('crypto')

const app = express()
app.use(express.json())
app.use(cors())

const port = 8081

const commentsByPostId = {}

app.get("/posts/:id/comments", (request, response) => {
  response.json(commentsByPostId[request.params.id] || [])
})

app.post('/posts/:id/comments', (request, response) => {
  const commentId = randomBytes(4).toString('hex')
  const { content } = request.body

  const comments = commentsByPostId[request.params.id] || []

  comments.push({ id: commentId, content })

  commentsByPostId[request.params.id] = comments

  response.status(201).json(comments)
})

app.listen(port, () => {
  console.log(`Comments server is running on port: ${port}`)
})