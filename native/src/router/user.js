const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {set, get} = require('../db/redis')
const handleUserRoueter = (req, res) => {
  const method = req.method
  //登陆
  if(method == 'POST' && req.path=='/api/user/login'){
    const { username, password } = req.body
    return login(username, password).then(dataP => {      
      if(dataP.username){
        // 设置 session
        req.session = {
          username: dataP.username,
          realname: dataP.realname
        }
        get('SESSION_DATA').then(data => {
          let session = data
          session[req.cookie.userId] = {
            username: dataP.username,
            realname: dataP.realname
          }
          set('SESSION_DATA', session)
        }) 
        return new SuccessModel({
          username: dataP.username
        })
      }else{
        return new ErrorModel('登陆失败')
      }
    })
  }
}

module.exports = handleUserRoueter