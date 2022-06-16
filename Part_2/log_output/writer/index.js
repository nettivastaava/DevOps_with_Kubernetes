const express = require('express')
const app = express()
const path = require('path')

const fs = require('fs')

const PORT = process.env.PORT || 3001

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'timestamps.txt')
const date = new Date()

app.use('/files', express.static(path.join(__dirname, 'files')))
 
fs.writeFile(filePath, date.toString(), (err) => { 
  if (err) { 
    console.log(err); 
  }  
})
console.log('writing')

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
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
  

  
  