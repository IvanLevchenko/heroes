const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  nickname: String,
  real_name: String,
  origin_description: String,
  superpowers: String,
  catch_phrase: String,
  images: [String]
})

module.exports = mongoose.model('heroe', schema)