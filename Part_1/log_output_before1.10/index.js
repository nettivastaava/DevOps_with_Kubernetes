const PORT = process.env.PORT || 3000

const http = require('http')

const app = http.createServer((request, response) => {
  const random = (Math.random() + 1).toString(36).substring(7);
  const date = new Date()

  const data = {
    string: random,
    date
  }

  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(data))
  
})

app.listen(PORT)
console.log(`Server running on port ${PORT}`)

  

  
  