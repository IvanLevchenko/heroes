require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

const routes = require('../routes/routes')
const {connectMongo} = require('./db')

app.listen(process.env.PORT, () => console.log('Server started on port ' + process.env.PORT))
connectMongo()

app.use(express.static(path.resolve(__dirname, '../', 'build')))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(express.json())
app.use('/api/v1', routes)
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'build/index.html')))
app.use(cors())

