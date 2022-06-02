const PORT = process.env.PORT || 3000

const http = require('http')

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})

app.listen(PORT)
console.log(`Server running on port ${PORT}`)
  
  