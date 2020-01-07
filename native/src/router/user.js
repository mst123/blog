const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

//获取 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24*60*60*1000))
  console.log(d.toGMTString());
  return d.toGMTString()  //cookie的时间格式
}
const handleUserRoueter = (req, res) => {
  const method = req.method
  //登陆
  /* if(method == 'POST' && req.path=='/api/user/login'){
    const { username, password } = req.body
    return login(username, password).then(data => {
      if(data.username){
        return new SuccessModel()
      }else{
        return new ErrorModel('登陆失败')
      }
    })
  } */
  if(method == 'GET' && req.path=='/api/user/login'){
    const { username, password } = req.query
    return login(username, password).then(data => {
      if(data.username){
        //server端操作cookie
        res.setHeader(
          'Set-Cookie',
          `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`  //path=/ 是cookie适用于所有根目录是/的请求域  
          //httpOnly 只存在于server端的cookie属性 前端无法查看（浏览器中可以看到）与修改
          // 前端也可以定义username 但是和server端的username 分别存在 
        )
        return new SuccessModel({
          username: data.username
        })
      }else{
        return new ErrorModel('登陆失败')
      }
    })
  }
  //登陆验证的测试
  if(method == 'GET' && req.path == '/api/user/login-test'){
    console.log(req.cookie);
    
    if(req.cookie.username){
      return Promise.resolve(
        new SuccessModel({
          username: req.cookie.username
        })
      ) 
    }else{
      return Promise.resolve(new ErrorModel('尚未登陆')) 
    }
  }
}

module.exports = handleUserRoueter