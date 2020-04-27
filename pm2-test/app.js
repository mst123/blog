/**
 * @Descripttion  : 
 * @Author        : 马识途
 * @Date          : 2020-04-17 16:12:43
 * @LastEditTime  : 2020-04-20 09:35:00
 * @FilePath      : \projecte:\codeFile\blog\pm2-test\app.js
 */
const http = require('http')

const server = http.createServer((req, res) => {
  // 模拟日志
  console.log('cur time', Date.now())
  // 模拟错误
  console.error('假装出错', Date.now())
  res.setHeader('Content-type', 'application/json')
  res.end(
    JSON.stringify({
      errno: 0,
      msg: 'pm2 test server 2'
    })
  )
})

server.listen(8000)
console.log('server run on port 8000');
