const express = require('express')
const app = express()
const path = require('path')

const fs = require('fs')

const directory = path.join('/', 'app', 'files')
const filePath = path.join(directory, 'pong_count.txt')

app.get('/pingpong', (req, res) => {
  const dataRead = fs.readFileSync(filePath, 'utf8')

  const init = dataRead ? parseInt(dataRead) : 0
  const numberOfRequests = (init + 1)

  fs.writeFile(filePath, numberOfRequests.toString(), (err) => { 
    if (err) {  
      console.log(err); 
    }  
  })
  console.log('pongs ', numberOfRequests)
  const answerString = `pongs ${numberOfRequests.toString()}`
  res.send(answerString)
})

const PORT = process.env.PORT || 3005
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