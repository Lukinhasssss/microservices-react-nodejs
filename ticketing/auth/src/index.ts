import express from 'express'

const app = express()
app.use(express.json())

const port = 8080

app.listen(port, () => {
  console.log(`Auth server is running on port: ${port}`)
})