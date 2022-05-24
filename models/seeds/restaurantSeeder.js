const mongoose = require('mongoose')
const restaurant = require('../restaurant')
const restaurantJSON= require('../../restaurant.json')
const restaurantData=restaurantJSON.results

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
  restaurant.create(restaurantData)
    .then(() => {
      console.log("restaurantSeeder done!")
    }).catch(error => console.log(error))
      .finally(() => db.close())

  
  
  
})

