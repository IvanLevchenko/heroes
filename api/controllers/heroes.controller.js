const HeroModel = require('../models/hero.model')

async function createHero(req, res) {
  const body = req.body
  const images = new Set() 
  req.files.map(file => images.add(file.path))

  try {
    await HeroModel.create({...body, images: [...images]})
    res.status(200).send('Success!')
  } catch(e) {
    console.log(e)
  }
}

async function getHeroes(req, res) {
  try {
    const {max, selected} = req.query
    const result = await HeroModel.find({}).limit(max * selected)
    const count = await HeroModel.count({})
    res.status(200).send({result: result.slice(max * selected - max), count})
  } catch(e) {
    console.log(e)
  }
}

async function getHero(req, res) {
  try {
    const {_id} = req.query
    const result = await HeroModel.find({_id})
    res.status(200).send(result)
  } catch(e) {
    console.log(e)
  }
}

async function changeHero(req, res) {
  try {
    const {_id} = req.query
    let data = req.body
    let images = new Set()
    
    req.files.map(img => images.add('uploads\\' + img.fieldname))
    data = {...data, images: [...images]}
    console.log(data)

    await HeroModel.findOneAndUpdate({_id}, {...data})

    res.status(200).send('Success!')
  } catch(e) {
    console.log(e)
  }
}

async function deleteHero(req, res) {
  try {
    const {_id} = req.query
    await HeroModel.findOneAndDelete({_id})
    res.status(200).send('Success!')
  } catch(e) {
    console.log(e)
  }
}

module.exports = {createHero, getHeroes, getHero, changeHero, deleteHero}