const mongoose=require('mongoose')
const Schema=mongoose.Schema
const restaurantSchema=new Schema({
  name:{
    type:String,
    require: true
  },
  name_en:{
    type:String,
    require: false
  },
  category:{
    type:String,
    require: false
  },
  image:{
    type: String,
    require: false
  },
  location:{
    type: String,
    require: false
  },
  phone:{
    type: String,
    require: false
  },
  google_map:{
    type: String,
    require: false
  },
  rating:{
    type: Number,
    require: true
  },
  description:{
    type: String,
    require: true
  }

})

module.exports=mongoose.model('restaurant',restaurantSchema)