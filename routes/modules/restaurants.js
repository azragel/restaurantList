const express = require('express')
const router = express.Router()
const restaurants = require('../../models/restaurant')

// 介紹頁面
router.get('/:id', (req, res) => {
  const id = req.params.id

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

  return restaurants.create(restaurantNew)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 編輯餐廳資訊頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  return restaurants.findById(id)
    .lean()
    .then(restaurants => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const restaurantUpdate = req.body

  return restaurants.findByIdAndUpdate(id, restaurantUpdate)

    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 刪除餐廳資訊
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return restaurants.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
