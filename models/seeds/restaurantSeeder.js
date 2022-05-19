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
  console.log(restaurantData.length)
  for(let i=0;i<restaurantData.length;i++){
    restaurant.create({
      name: `${restaurantData[i].name}`, 
      name_en: `${restaurantData[i].name_en}`,
      category: `${restaurantData[i].category}`,
      image: `${restaurantData[i].image}`,
      location: `${restaurantData[i].location}`,
      phone: `${restaurantData[i].phone}`,
      google_map: `${restaurantData[i].google_map}`,
      rating: `${restaurantData[i].rating}`,
      description: `${restaurantData[i].description}`

  })
    

  }

  console.log('done')
})

