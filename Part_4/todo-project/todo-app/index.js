require('dotenv').config()
const http = require('http')

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const { connectToDatabase, sequelize } = require('./util/db')

const { Model, DataTypes } = require('sequelize')

const fs = require('fs')
const path = require('path')

const app = express()
const server = http.createServer(app)

const databaseConnection = connectToDatabase()

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const imagePath = path.join(directory, 'image.jpg')
const timestampPath = path.join(directory, 'timestamps.txt')

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

morgan.token('body', function (req) {return JSON.stringify(req.body)})

app.use(morgan(' :method :url :status :res[content-length] - :response-time ms :body'))

class Todo extends Model {}
  Todo.init({  
    id: {    
      type: DataTypes.INTEGER,    
      primaryKey: true,    
      autoIncrement: true  
    },  
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {  
    sequelize,   
    timestamps: false,  
    modelName: 'todo'
  })

Todo.sync()

const shouldFetchAnother = () => {
  if (!fs.existsSync(timestampPath)) {
    console.log('timestamps do not exists')
    return true
  } else {
    // console.log('should not refetch')
    const date = new Date(fs.readFileSync(timestampPath, 'utf8'))
    const present = new Date()
    if (date.toDateString() !== present.toDateString()) {
      // console.log('day has passed')
      return true
    } 
  }
  // console.log('nothing happens')
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

app.post('/api/todos', async (req, res) => {  
  if (req.body.text.length > 140) {
    return res.status(400).json({
      error: 'TODO length cannot exceed 140 characters'
    })
  }
  console.log('posting a todo')
  const newTodo = await Todo.create({text: req.body.text})
  console.log('new todo ', newTodo)  
  res.json(newTodo)
})

app.get('/api/todos', async (request, response) => {
  const todos = await Todo.findAll({})
  console.log('all todos ', todos)
  response.json(todos)
})

app.put('/api/todos/:id', async (request, response) => {
  const todo = await Todo.findByPk(request.params.id)
  
  try {
    todo.done = !todo.done
    console.log('updated ', todo)
    await todo.save()
    response.json(todo)
  } catch(error) {
    console.log(error)
  }
})


app.get('/api/image', async (_req, res) => {
  const shouldFetch = shouldFetchAnother()
  // console.log('should fetch is ', shouldFetch)
  if (shouldFetch) {
    // console.log('NOT EXECUTED')
    await removeFile()

    await findAFile()
  }

  res.sendFile(imagePath)
})

app.get('/healthz', async (_req, res) => {
  console.log('health checking...')
  if (databaseConnection) {
    res.sendStatus(200)
  } else {
    res.sendStatus(500)
  }
  
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
  