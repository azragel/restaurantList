// 啟動express框架
const express = require('express')
const app = express()
const port = 3000

// 使用body-parser給post方法抓取body資料
app.use(express.urlencoded({ extended: true }))

// 載入method-override
const methodOverride = require('method-override')

// 引用路由器
const routes = require('./routes')
require('./config/mongoose')

// 載入資料庫model
const restaurants = require('./models/restaurant')

// 啟動handlebars套件
const exphandlebar = require('express-handlebars')

// 定義使用的樣板引擎。樣板引擎名稱 , 樣板引擎相關預設設定
app.engine('handlebars', exphandlebar({ defaultLayout: 'main' }))
// 定義view engine為handlebars
app.set('view engine', 'handlebars')

// 設定靜態檔案
app.use(express.static('public'))

// 讓每筆請求透過method-override進行前置處理
app.use(methodOverride('_method'))

app.use(routes)
// 路由情境設定

// 伺服器啟動事件監聽
app.listen(port, () => {
  console.log(`restaurant server is now active on http://localhost:${port}`)
})
