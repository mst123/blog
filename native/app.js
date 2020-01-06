const handleUserRounter = require('./src/router/user')
const handleBlogRounter = require('./src/router/blog')
const querystring = require('querystring')
//用于处理 post data
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if(req.mehhod == 'GET'){
      resolve({})
      return
    }
    if(req.headers['content-type'] != 'application/json'){
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString() //二进制转字符串
    })
    req.on('end', () => {
      if(!postData){
        resolve({})
      }else{
        resolve(JSON.parse(postData))
      }
      
    })
  })
}
const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json') //业界规范。。。
  req.path = req.url.split('?')[0]
  //处理get请求参数
  req.query = querystring.parse(req.url.split('?')[1])
  //处理post请求参数
  getPostData(req).then((postData) => {
    req.body = postData
    const blogData = handleBlogRounter(req, res)
    const userData = handleUserRounter(req, res)
    if(blogData){
      res.end(
        JSON.stringify(blogData)
      )
      return
    }
    if(userData){
      res.end(
        JSON.stringify(userData)
      )
      return
    }
    //未命中路由，返回404
    res.writeHead(404, { //不常用
      'Content-type': 'text/plain'
    })
    res.write('404 not found \n')
    res.end()
  })
}
module.exports = serverHandle