const http = require('http')

// 标准输入输出 linux标准概念
// process.stdin.pipe(process.stdout)
//输入什么 输出什么

const server = http.createServer((req, res) => {
  // console.log(res);
  
  if(req.method === 'POST'){
    req.pipe(res) 
  }
})
server.listen(8010)