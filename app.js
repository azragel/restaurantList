// 啟動express框架
const express = require('express')
const app = express()
const port = 3000

// 啟動handlebars套件
const exphandlebar = require('express-handlebars')

// 定義使用的樣板引擎。樣板引擎名稱 , 樣板引擎相關預設設定 
app.engine('handlebars', exphandlebar({ defaultLayout: 'main' }))
// 定義view engine為handlebars  
app.set('view engine', 'handlebars')

// 讀取restaurant.json檔
const restaurants = require('./restaurant.json')


// 設定靜態檔案
app.use(express.static('public'))

// 路由情境設定
// 1.初始頁面 
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurants.results })
})

// 2.介紹頁面
app.get('/restaurants/:restaID', (req, res) => {
  const restaurantChoose = restaurants.results.find((restaurant) => {
    return restaurant.id.toString() === req.params.restaID
  })
  res.render('show', { restaurants: restaurantChoose })
})

// 3.搜尋功能
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaSearch = restaurants.results.filter((restaurant) => {

    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })

  res.render('index', { restaurants: restaSearch, keyword: keyword })
})

// 伺服器啟動事件監聽 
app.listen(port, () => {
  console.log(`restaurant server is now active on http://localhost:${port}`)

})