const express = require('express')
const router = express.Router()
const restaurants = require('../../models/restaurant')







// 介紹頁面
router.get('/:restaID', (req, res) => {
  const id = req.params.restaID

  return restaurants.findById(id)
    .lean()
    .then(restaurants => res.render('show', { restaurants }))
    .catch(error => console.log(error))

})

// 餐廳新增頁面

// router.get('/new', (req, res) => {
  
//   return res.render('new')
//   
// })

router.post('/', (req, res) => {
  const restaurantNew = req.body

  return restaurants.create({
    name: `${restaurantNew.name}`,
    name_en: `${restaurantNew.name_en}`,
    category: `${restaurantNew.category}`,
    image: `${restaurantNew.image}`,
    location: `${restaurantNew.location}`,
    phone: `${restaurantNew.phone}`,
    google_map: `${restaurantNew.google_map}`,
    rating: `${restaurantNew.rating}`,
    description: `${restaurantNew.description}`
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 編輯餐廳資訊頁面
router.get('/:restaID/edit', (req, res) => {
  const id = req.params.restaID

  return restaurants.findById(id)
    .lean()
    .then(restaurants => res.render('edit', { restaurants }))
    .catch(error => console.log(error))

})

router.put('/:restaID', (req, res) => {
  const id = req.params.restaID
  const restaurantUpdate = req.body

  return restaurants.findById(id)
    .then(restaurants => {
      restaurants.name = restaurantUpdate.name
      restaurants.name_en = restaurantUpdate.name_en
      restaurants.category = restaurantUpdate.category
      restaurants.image = restaurantUpdate.image
      restaurants.location = restaurantUpdate.location
      restaurants.phone = restaurantUpdate.phone
      restaurants.google_map = restaurantUpdate.google_map
      restaurants.rating = restaurantUpdate.rating
      restaurants.description = restaurantUpdate.description
      return restaurants.save()

    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))

})

// 刪除餐廳資訊
router.delete('/:restaID', (req, res) => {
  const id = req.params.restaID
  return restaurants.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router