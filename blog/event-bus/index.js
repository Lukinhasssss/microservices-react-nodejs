const express = require("express")
const axios = require("axios")

const app = express()
app.use(express.json())

const port = 8090

app.post("/events", (request, response) => {
  const event = request.body

  axios.post("http://localhost:8080/events", event).catch(err => {
    console.log(err.message)
  })

  axios.post("http://localhost:8081/events", event).catch(err => {
    console.log(err.message)
  })

  axios.post("http://localhost:8082/events", event).catch(err => {
    console.log(err.message)
  })

  response.json({ status: 'OK' })
})

app.listen(port, () => {
  console.log(`Event-bus server is running on port: ${port}`)
})
