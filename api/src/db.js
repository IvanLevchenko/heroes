require('dotenv').config()

const mongoose = require('mongoose')

function connectMongo() {
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.connection.on('connected', () => console.log('Connected to db'))
}

module.exports = {connectMongo}