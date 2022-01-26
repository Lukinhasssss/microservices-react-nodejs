const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

const port = 8082

const posts = {}

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data

    posts[id] = { id, title, comments: [] }
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data

    const post = posts[postId]
    post.comments.push({ id, content, status })
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data

    const post = posts[postId]
    const comment = post.comments.find((comment) => {
      return comment.id === id
    })

    comment.status = status
    comment.comments = content
  }
}

app.get('/posts', (request, response) => {
  response.json(posts)
})

app.post('/events', (request, response) => {
  const { type, data } = request.body

  handleEvent(type, data)

  response.json({})
})

app.listen(port, async () => {
  console.log(`Query server is running on port: ${port}`)

  try {
    const response = await axios.get('http://event-bus-service:8090/events')

    response.data.forEach(event => {
      console.log(`Processing event: ${event.type}`)

      handleEvent(event.type, event.data)
    })
  } catch (error) {
    console.log(error.message)
  }
})
