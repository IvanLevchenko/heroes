const express = require('express')
const app = express()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({storage})

const {
  createHero, 
  getHeroes, 
  getHero,
  changeHero,
  deleteHero
} = require('../controllers/heroes.controller')

app.post('/create-hero', upload.any('images'), createHero)
app.get('/get-heroes', getHeroes)
app.get('/get-hero', getHero)
app.patch('/change-hero', upload.any('images'), changeHero)
app.delete('/delete-hero', deleteHero)

module.exports = app