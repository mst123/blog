const querystring = require('querystring')
const handleUserRounter = require('./src/router/user')
const handleBlogRounter = require('./src/router/blog')

//定义 服务端session
const SESSION_DATA = {}

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json') //业界规范。。。
  req.path = req.url.split('?')[0]

  //解析客户端发来的cookie， 其中记录着sessionId
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''  //k1=v1;k2=v2;
  cookieStr.split(';').forEach(item => {
    if(item){
      req.cookie[item.split('=')[0]] = item.split('=')[1] 
    }
  });
  console.log(req.cookie);

  //解析session
  let needSetCookie = false
  let userId = req.cookie.userId //sessionId 
  if(userId){  
    if(!SESSION_DATA[userId]){ //有sessionId  但是session中没有用户记录
      SESSION_DATA[userId] = {}
    }
  }else{  //没有sessionId 需要生成sessionId，并记录在cookie中
    needSetCookie = true
    userId = Date.now() + '_' + Math.random() 
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId] //将session中记录的用户信息，放置在req中，以便后续使用

  //处理get请求参数
  req.query = querystring.parse(req.url.split('?')[1])

  //处理post请求参数
  getPostData(req).then((postData) => {
    req.body = postData
    //处理blog相关接口
    const blogResult = handleBlogRounter(req, res)
    if(blogResult){
      blogResult.then((blogData) => {
        if(needSetCookie){
          //server端操作cookie
          res.setHeader(
            'Set-Cookie',
            `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`  //path=/ 是cookie适用于所有根目录是/的请求域  
            //httpOnly 只存在于server端的cookie属性 前端无法查看（浏览器中可以看到）与修改
            // 前端也可以定义username 但是和server端的username 分别存在 
          )
        }
        res.end( JSON.stringify(blogData) )
      })
      return
    }
    //处理user相关接口
    const userResult = handleUserRounter(req, res)
    if(userResult){
      userResult.then((userData) => {
        if(needSetCookie){
          //server端操作cookie
          res.setHeader(
            'Set-Cookie',
            `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`  //path=/ 是cookie适用于所有根目录是/的请求域  
          )
        }
        res.end( JSON.stringify(userData) )
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
//工具-------获取 cookie 的过期时间,此为一天
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24*60*60*1000))
  console.log(d.toGMTString());
  return d.toGMTString()  //cookie的时间格式
}
//工具-------用于处理 post data
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
module.exports = serverHandle