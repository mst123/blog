const express = require('express');
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const router = express.Router();

/* GET users listing. */
router.post('/login', (req, res, next) => {
  console.log(req);
  
  const { username, password } = req.body
  login(username, password).then(data => {      
    if(data.username){
      // 设置 session,会自动同步到session
      req.session.username = data.username
      req.session.realname = data.realname
      res.json(
        new SuccessModel()
      )
    }else{
      res.json(
        new ErrorModel('登陆失败')
      )
    }
  })
});

router.get('/login-test', (req, res, next) => {
  if(req.session.username) {
    res.json(req.session)
  }else{
    res.json({
      msg: '登录失败'
    })
  }
})

module.exports = router;
