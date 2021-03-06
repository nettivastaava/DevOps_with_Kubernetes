const PORT = process.env.PORT || 3000
const http = require('http')

const fs = require('fs')
const path = require('path')


const directory = path.join('/', 'app', 'files')
const filePath = path.join(directory, 'timestamps.txt')

const pongPath = path.join(directory, 'pong_count.txt')

const random = (Math.random() + 1).toString(36).substring(7)

const data = fs.readFileSync(filePath, 'utf8')
const pongData = fs.readFileSync(pongPath, 'utf8')

const shownData = {
  string: random,
  data,
  pongData
}

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(shownData))
})


app.listen(PORT)
console.log(`Server running on port ${PORT}`)