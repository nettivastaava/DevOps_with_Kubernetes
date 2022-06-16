const PORT = process.env.PORT || 3000

const axios = require('axios')
const serviceURL = 'http://kube-ping-pong-svc:2346/pingpong'

const express = require('express')

const fs = require('fs')
const path = require('path')

const http = require('http');

const app = express()
const server = http.createServer(app);

const random = (Math.random() + 1).toString(36).substring(7)

app.get('/', async (_req, res) => {
  console.log('requesting...')
  try {
    const pongs = await axios.get(serviceURL)
    console.log('got something ', pongs?.data)
    res.sendStatus(pongs.data)
    console.log('pongs ', pongs)
  } catch (error) {
    res.send(error)
  }
})

server.listen(PORT)
console.log(`Server running on port ${PORT}`)