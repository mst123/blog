const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRoueter = (req, res) => {
  const method = req.method
  //登陆
  if(method == 'POST' && req.path=='/api/user/login'){
    const { username, password } = req.body
    return login(username, password).then(data => {
      if(data.username){
        // 设置 session
        req.session.username = data.username
        req.session.realname = data.realname

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
    
    if(req.session.username){
      return Promise.resolve(
        new SuccessModel({
          session: req.session
        })
      ) 
    }else{
      return Promise.resolve(new ErrorModel('尚未登陆')) 
    }
  }
}

module.exports = handleUserRoueter