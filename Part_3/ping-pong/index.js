require('dotenv').config()
const express = require('express')

const app = express()
const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize("pingpong-db", "postgres",
    process.env.POSTGRES_PASSWORD, {
    host: "postgres-svc",
    dialect: "postgres"
})

class Pong extends Model {}
  Pong.init({  
    id: {    
      type: DataTypes.INTEGER,    
      primaryKey: true,    
      autoIncrement: true  
    },  
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {  
    sequelize,   
    timestamps: false,  
    modelName: 'pong'
  })

Pong.sync()

app.get('/pingpong', async (_req, res) => {
  const pong = await Pong.findByPk(1)
  if (!pong) {
    const newPong = await Pong.create({count: 0})
    console.log('NEW PONG ', newPong)
    res.json(newPong.count)
  } else {
    try {
      console.log('EXISTING PONG ', pong)
      pong.count = pong.count + 1

      await pong.save()
      res.json(pong.count)
    } catch(exception) {
      res.send(exception)
    }
  }
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
