const querystring = require('querystring')                           //nodejs自带处理get请求参数
const handleUserRounter = require('./src/router/user')               //user相关接口的处理代码
const handleBlogRounter = require('./src/router/blog')               //blog相关接口的处理代码
const { getPostData } = require('./src/util/postDataHandle')         //post携带信息的处理函数
const { getCookieExpires } = require('./src/util/getCookieExpires')  //设置cookie生存期为24小时
const {set, get} = require('./src/db/redis')                         //redis处理函数
const { access } = require('./src/util/log')                         //日志处理函数
//定义 服务端session
set('SESSION_DATA',{})

//请求处理函数，根路径下所有的访问都会经过此函数
const serverHandle = async (req, res) => { //有请求才有响应，req在前 res在后
  // 记录 access log
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

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

  //解析session
  let needSetCookie = false //是否需要在cookie中设置sessionId
  let userId = req.cookie.userId || '' //sessionId 
  let SESSION_DATA = await get('SESSION_DATA') //从redis中获取session
  if(userId){  
    if(!SESSION_DATA[userId]){ //有sessionId  但是session中没有用户记录
      let data ={}
      data[userId] = {}
      set('SESSION_DATA', data)
    }
  }else{  //没有sessionId 需要生成sessionId，并记录在cookie中
    needSetCookie = true
    userId = Date.now() + '_' + Math.random()
    let data ={} 
    data[userId] = {}
    set('SESSION_DATA', data)
  }
  SESSION_DATA = await get('SESSION_DATA')
  req.session = SESSION_DATA[userId] //将session中记录的用户信息，放置在req中，以便后续使用 
  console.log(req.session);
  
  //处理get请求参数
  req.query = querystring.parse(req.url.split('?')[1])

  //处理post请求参数,异步函数，需要等待postdata解析完成
  let postData = await getPostData(req)
  req.body = postData   //将解析后的post数据放入req.body

  //处理blog相关接口
  const blogResult = handleBlogRounter(req, res)
  if(blogResult){
    blogResult.then((blogData) => {
      if(needSetCookie){   //其实可以把这个提取到外部，放在里面是地址命中api时才会给用户设置sessionId
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
  
}

module.exports = serverHandle