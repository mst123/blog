/**
 * @Descripttion : 
 * @Author       : 马识途
 * @Date         : 2020-01-15 10:54:50
 * @LastEditTime : 2020-04-21 15:04:21
 * @FilePath     : \projecte:\codeFile\blog\express-middleware\app.js
*/
const express = require('express')

// 本次 http 请求的实例
const app = express()

app.use((req, res, next) => {
  console.log('请求开始。。。', req.method, req.url);
  next()
})

app.use((req, res, next) => {
  // 假设在处理 cookie
  console.log('处理cookie');
  req.cookies = {
    userId: 'abc123'
  }
  next()
})

app.use((req, res, next) => {
  // 假设在处理postData  异步
  console.log('处理postData');
  setTimeout(() => {
    req.body = {
      a: 100,
      b: 200
    }
    next()
  })
})

app.use('/api', (req, res, next) => {
  console.log('处理 /api 路由');
  next()
})

app.get('/api', (req, res, next) => {
  console.log('get /api 路由');
  next()
})

app.post('/api', (req, res, next) => {
  console.log('post /api 路由');
  next()
})

//模拟登陆验证
function loginCheck(req, res, next){
  console.log('登陆成功');
  setTimeout(() => {
    next()
  },200)
}
app.get('/api/get-cookie', loginCheck, (req, res, next) => { //多了一个参数,支持多参数
  console.log('get /api/get-cookie');
  res.json({
    errno: 0,
    data: req.cookies
  })
})

app.post('/api/get-post-data', (req, res, next) => {
  console.log('get /api/get-post-data');
  res.json({
    errno: 0,
    data: req.body
  })
})

app.use( (req, res, next) => {
  console.log('处理 404');
  res.json({
    errno: 0,
    message: '路径不存在'
  })
})

app.listen(4000, () => {
  console.log('server is running on http://localhost:4000');
})