const http = require('http')
const querystring = require('querystring')
const server = http.createServer((req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])
  //设置返回格式为json
  res.setHeader('Content-type', 'application/json') //'Content-type' 开头是大写

  const resData = {
    method,
    url,
    path,
    query
  }
  if(method == 'GET'){
    res.end(   
      JSON.stringify(resData)  //上边设置返回格式，其实设置的是返回的字符串(stringify后的)的格式
      // 页面中显示  {"method":"GET","url":"/?AAS=2222","path":"/","query":{"AAS":"2222"}}
      // 去掉JSON.stringify server会报错

    )
  }
  if(method == 'POST'){
    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData.postData = postData
      // response.end()方法接收的参数类型只能是字符串或Buffer
      res.end(   
        JSON.stringify(resData)
        // resData  // 去掉JSON.stringify server同样会报错
      )
    })
  }
})
server.listen(8000)