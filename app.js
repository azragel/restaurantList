// 啟動express框架
const express = require('express')
const app = express()
const port = 3000

// 使用body-parser給post方法抓取body資料
app.use(express.urlencoded({ extended: true }))


// 載入資料庫model
const restaurants = require('./models/restaurant')


// 啟動mongoDB套件mongoose
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://azragel:1035@cluster0.dqqcx.mongodb.net/restaurant-list?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

// 資料庫連線設定
const db=mongoose.connection

db.on('error',()=>{
  console.log('mongodb error!')
})

db.once('open',()=>{
  console.log('mongodb connected')
})


// 啟動handlebars套件
const exphandlebar = require('express-handlebars')

// 定義使用的樣板引擎。樣板引擎名稱 , 樣板引擎相關預設設定 
app.engine('handlebars', exphandlebar({ defaultLayout: 'main' }))
// 定義view engine為handlebars  
app.set('view engine', 'handlebars')




// 設定靜態檔案
app.use(express.static('public'))

// 路由情境設定
// 1.初始頁面 
app.get('/', (req, res) => {
  restaurants.find() // 取出 Todo model 裡的所有資料
  .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
  .then(restaurants=>res.render('index',{restaurants}))
  .catch(error=>console.log(error))

  
})

// 2.介紹頁面
app.get('/restaurants/:restaID', (req, res) => {
  const id=req.params.restaID
  // const restaurantChoose = restaurants.find((restaurant) => {
  //   return restaurant.id.toString() === req.params.restaID
  // })
  return restaurants.findById(id)
  .lean()
  .then(restaurants=>res.render('show',{restaurants}))
  .catch(error=>console.log(error))
  // res.render('show', { restaurants: restaurantChoose })
})

// 3.搜尋功能
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  
  return restaurants.find({$or:[{ 'name': { '$regex': keyword, $options: '$i' } }, { 'category': { '$regex': keyword, $options: '$i' } }]})
  .lean()
  .then(restaurants => res.render('index', { restaurants, keyword }))
  .catch(error=>console.log(error))

  
})

// 伺服器啟動事件監聽 
app.listen(port, () => {
  console.log(`restaurant server is now active on http://localhost:${port}`)

})