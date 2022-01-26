const express = require('express')
const axios = require('axios')
const { response } = require('express')

const app = express()
app.use(express.json())

const port = 8083

app.post('/events', async (request, response) => {
  const { type, data } = request.body

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'REJECTED' : 'APPROVED'

    await axios.post('http://event-bus-service:8090/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    })
  }

  response.json({})
})

app.listen(port, () => {
  console.log(`Moderation server is running on port: ${port}`)
})