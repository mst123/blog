const querystring = require('querystring')
const handleUserRounter = require('./src/router/user')
const handleBlogRounter = require('./src/router/blog')

//session 数据
const SESSION_DATA = {}

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

  //解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''  //k1=v1;k2=v2;
  cookieStr.split(';').forEach(item => {
    if(item){
      req.cookie[item.split('=')[0]] = item.split('=')[1] 
    }
  });
  console.log(req.cookie);

  //解析session
  const userId = req.cookie.userId
  if(userId){
    if(!SESSION_DATA[userId]){
      SESSION_DATA[userId] = {}
    }
  }else{
    userId = Date.now() + '_' + Math.random() 
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId]

  //处理get请求参数
  req.query = querystring.parse(req.url.split('?')[1])

  //处理post请求参数
  getPostData(req).then((postData) => {
    req.body = postData

    const blogResult = handleBlogRounter(req, res)
    if(blogResult){
      blogResult.then((blogData) => {
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }

    const userResult = handleUserRounter(req, res)
    if(userResult){
      userResult.then((userData) => {
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }
    //未命中路由，返回404
    res.writeHead(404, { //不常用
      'Content-type': 'text/plain'
    })
    res.write('404 not found \n') //不常用
    res.end()
  })
}
module.exports = serverHandle