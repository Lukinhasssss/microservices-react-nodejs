const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

const port = 8082

const posts = {}

app.get("/posts", (request, response) => {
  response.json(posts)
})

app.post("/events", (request, response) => {
  const { type, data } = request.body

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
    const comment = post.comments.find(comment => {
      return comment.id === id
    })

    comment.status = status
    comment.comments = content
  }

  console.log(posts)

  response.json({})
})

app.listen(port, () => {
  console.log(`Query server is running on port: ${port}`)
})
