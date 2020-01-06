const http = require('http')
const querystring = require('querystring')
const server = http.createServer((req, res) => {
  if(req.method == 'POST'){
    //数据格式
    console.log('content-type',req.headers['content-type']);
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString() //二进制转字符串
    })
    req.on('end', () => {
      console.log(postData);
      // res.end('hello world')
      // res.end(JSON.stringify(postData))
      res.end(postData)
    })
  }
})
server.listen((8000))
console.log('8000 OK');

