const express = require('express')
const axios = require('axios')
const { response } = require('express')

const app = express()
app.use(express.json())

const port = 8083

app.post('/events', (request, response) => {

})

app.listen(port, () => {
  console.log(`Moderation server is running on port: ${port}`)
})