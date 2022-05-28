const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  name_en: {
    type: String

  },
  category: {
    type: String,
    require: true
  },
  image: {
    type: String

  },
  location: {
    type: String,
    require: true
  },
  phone: {
    type: String

  },
  google_map: {
    type: String

  },
  rating: {
    type: Number,
    require: true
  },
  description: {
    type: String

  }

})

module.exports = mongoose.model('restaurant', restaurantSchema)
