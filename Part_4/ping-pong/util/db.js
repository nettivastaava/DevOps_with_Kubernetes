const Sequelize = require('sequelize')

const sequelize = new Sequelize("pingpong-db", "postgres",
    process.env.POSTGRES_PASSWORD, {
    host: "postgres-svc",
    dialect: "postgres"
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('database connected')
    return true
  } catch (error) {
    console.log('connecting database failed')
    return false
  }
}

module.exports = { sequelize, connectToDatabase }