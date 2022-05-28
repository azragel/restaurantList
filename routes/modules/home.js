// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const restaurants = require('../../models/restaurant')

router.get('/', (req, res) => {
  restaurants.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 搜尋功能
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const sort = req.query.sort
  console.log(sort)

  const sortMethod = {
    default: { _id: 1 },
    name_asc: { name: 1 },
    name_desc: { name: -1 },
    category_asc: { category: 1 },
    location_asc: { location: 1 }

  }

  return restaurants.find({ $or: [{ name: { $regex: keyword, $options: '$i' } }, { category: { $regex: keyword, $options: '$i' } }] })
    .lean()
    .sort(sortMethod[sort])
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})

router.get('/new', (req, res) => {
  return res.render('new')
})

module.exports = router
