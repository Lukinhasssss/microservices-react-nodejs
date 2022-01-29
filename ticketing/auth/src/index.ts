import express from 'express'

const app = express()
app.use(express.json())

const port = 8080

app.get('/api/users/currentuser', (request, response) => {
  response.json({ message: 'Hello World!' })
})

app.listen(port, () => {
  console.log(`Auth server is running on port: ${port}`)
})
