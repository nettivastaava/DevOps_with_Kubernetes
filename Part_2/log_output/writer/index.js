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

  
  