const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors)

const port = 8082

app.get("/posts", (request, response) => {})

app.post("/events", (request, response) => {})

app.listen(port, () => {
  console.log(`Query server is running on port: ${port}`)
})
