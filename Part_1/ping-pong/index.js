const express = require('express')
const app = express()

let numberOfRequests = 0

app.get('/pingpong', (req, res) => {
    numberOfRequests++
  res.send(JSON.stringify(numberOfRequests))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/*
const PORT = process.env.PORT || 3001

const http = require('http')
let numberOfRequests = 0

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end(JSON.stringify(numberOfRequests))
})

app.listen(PORT)
console.log(`Server running on port ${PORT}`)
*/