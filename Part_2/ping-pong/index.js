const express = require('express')
const app = express()
const path = require('path')

const fs = require('fs')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'pong_count.txt')

const fileAlreadyExists = async () => new Promise(res => {
  console.log('checking if file exists')
  fs.stat(filePath, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
})

app.get('/pingpong', async (_req, res) => {
  if (!await fileAlreadyExists()) {
    console.log('does not exist')
    await new Promise(res => fs.mkdir(directory, (err) => res()))
    fs.writeFile(filePath, '1', (err) => { 
      if (err) {  
        console.log(err); 
      }  
    })
    const pongs = 1
    res.json(pongs)
  } else {
    console.log('it exist')
    const dataRead = fs.readFileSync(filePath, 'utf8')

    const init = dataRead ? parseInt(dataRead) : 0
    const numberOfRequests = (init + 1)

    fs.writeFile(filePath, numberOfRequests.toString(), (err) => { 
      if (err) {  
        console.log(err); 
      }  
    })
    console.log('pongs ', numberOfRequests)
    res.json(numberOfRequests)
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
