const PORT = process.env.PORT || 3001

const express = require('express')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

const app = express()

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const imagePath = path.join(directory, 'image.jpg')
const timestampPath = path.join(directory, 'timestamps.txt')

app.use('/files', express.static(path.join(__dirname, 'files')))

const shouldFetchAnother = () => {
  if (!fs.existsSync(timestampPath)) {
    console.log('timestamps do not exists')
    return true
  } else {
    console.log('should not refetch')
    const date = new Date(fs.readFileSync(timestampPath, 'utf8'))
    const present = new Date()
    if (date.toDateString() !== present.toDateString()) {
      console.log('day has passed')
      return true
    } 
  }
  console.log('nothing happens')
  return false
}

const findAFile = async () => {
  await new Promise(res => fs.mkdir(directory, (_err) => res()))
  const response = await axios.get('https://picsum.photos/1200', { responseType: 'stream' })
  response.data.pipe(fs.createWriteStream(imagePath))
  const date = new Date()
  fs.writeFile(timestampPath, date.toString(), (err) => { 
    if (err) { 
      console.log(err)
    }  
  })
  console.log('writing')
}

const removeFile = async () => new Promise(res => fs.unlink(timestampPath, (err) => res()))

app.post('/api/todos', (request, response) => {  
  const todo = request.body  
  console.log(todo)  
  response.json(todo)
})


app.get('/', async (_req, res) => {
  const shouldFetch = shouldFetchAnother()
  console.log('should fetch is ', shouldFetch)
  if (shouldFetch) {
    console.log('NOT EXECUTED')
    await removeFile()

    await findAFile()
  }

  res.sendFile(path.resolve('static', 'index.html'))
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
  