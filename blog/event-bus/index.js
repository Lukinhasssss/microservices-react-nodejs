const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.json())

const port = 8090

const events = []

app.post('/events', (request, response) => {
  const event = request.body

  events.push(event)

  axios.post('http://posts-clusterip-service:8080/events', event).catch(err => {
    console.log(err.message)
  })

  axios.post('http://comments-service:8081/events', event).catch(err => {
    console.log(err.message)
  })

  axios.post('http://query-service:8082/events', event).catch(err => {
    console.log(err.message)
  })

  axios.post('http://moderation-service:8083/events', event).catch(err => {
    console.log(err.message)
  })

  response.json({ status: 'OK' })
})

app.get('/events', (request, response) => {
  response.json(events)
})

app.listen(port, () => {
  console.log(`Event-bus server is running on port: ${port}`)
})
