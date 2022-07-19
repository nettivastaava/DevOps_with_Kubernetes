const PORT = process.env.PORT || 3000

const axios = require('axios')
const serviceURL = 'http://kube-ping-pong-svc:2346/pingpong'

const express = require('express')

const fs = require('fs')
const path = require('path')

const http = require('http');

const app = express()
const server = http.createServer(app)

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'timestamps.txt')

const helloMessage = process.env.MESSAGE

const random = (Math.random() + 1).toString(36).substring(7)

app.get('/', async (_req, res) => {
  console.log('requesting...')
  const data = fs.readFileSync(filePath, 'utf8')
  try {
    const pongs = await axios.get(serviceURL)
    console.log('raw data ', pongs)
    console.log('got something ', pongs?.data)
    res.status(200).send(
      `
      <div>
        <div>
          ${helloMessage}
        </div>
        <div>
          ${data} ${random}
        </div>
        <div>
          pongs ${pongs?.data}
        </div>
      </div>`
    )
  } catch (error) {
    res.status(404).send(error)
  }
})

app.get('/healthz', async (_req, res) => {
  try {
    const check = await axios.get('http://kube-ping-pong-svc:2346/healthz')
    console.log('THIS ', check)
    if (check) {
      res.status(200).send('health check passed')
    }
  } catch (error) {
    res.status(500).send(error)
  }
})


server.listen(PORT)
console.log(`Server running on port ${PORT}`)