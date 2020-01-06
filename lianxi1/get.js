const http = require('http')
const querystring = require('querystring')
const server = http.createServer((req, res) => {
  console.log(req);
  console.log(res);
  const url = req.url
  req.query = querystring.parse(url.split('?')[1]) //解析url地址参数为对象

  res.end(JSON.stringify(req.query))
})
server.listen((8000))
