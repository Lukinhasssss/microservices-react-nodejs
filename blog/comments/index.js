const express = require("express");
const cors = require('cors')
const axios = require('axios')

const { randomBytes } = require('crypto')

const app = express()
app.use(express.json())
app.use(cors())

const port = 8081

const commentsByPostId = {}

app.get("/posts/:id/comments", (request, response) => {
  response.json(commentsByPostId[request.params.id] || [])
})

app.post('/posts/:id/comments', async (request, response) => {
  const commentId = randomBytes(4).toString('hex')
  const { content } = request.body

  const comments = commentsByPostId[request.params.id] || []

  comments.push({ id: commentId, content, status: 'PENDING' })

  commentsByPostId[request.params.id] = comments

  await await axios.post('http://event-bus-service:8090/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: request.params.id,
      status: 'PENDING'
    }
  })

  response.status(201).json(comments)
})

app.post('/events', async (request, response) => {
  console.log(`Received Event: ${request.body.type}`)

  const { type, data } = request.body

  if (type === 'CommentModerated') {
    const { postId, id, content, status } = data
    const comments = commentsByPostId[postId]

    const comment = comments.find(comment => { return comment.id === id })
    comment.status = status

    await axios.post('http://event-bus-service:8090/events', {
      type: 'CommentUpdated',
      data: { id, postId, content, status }
    })
  }

  response.json({})
})

app.listen(port, () => {
  console.log(`Comments server is running on port: ${port}`)
})