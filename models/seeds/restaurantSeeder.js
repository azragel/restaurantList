
const restaurant = require('../restaurant')
const restaurantJSON = require('../../restaurant.json')
const restaurantData = restaurantJSON.results

const db = require('../../config/mongoose')

db.once('open', () => {
  restaurant.create(restaurantData)
    .then(() => {
      console.log('restaurantSeeder done!')
    }).catch(error => console.log(error))
    .finally(() => db.close())
})
