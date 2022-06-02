fs = require('fs')

const date = new Date()
fs.writeFile('/app/timestamps.txt', date.toString(), function (err) {
  if (err) return console.log(err);
  console.log('writing...')
})
/*


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
const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
*/
  

  
  