const express = require('express');

const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')        //封装的信息体
const loginCheck = require('../middleware/loginCheck')

const router = express.Router();
/* GET users listing. */
router.get('/list', (req, res, next) => {
  let author = req.query.author || ''
  let keyword = req.query.keyword || ''
  if(req.query.isadmin){ //博客管理页面
    console.log('isadmin');
    
    if(!req.session.username){
      //未登录
      res.json( //没有结束程序的功能 
        new ErrorModel('未登录')
      )
      return
    }
    author = req.session.username
  }
  
  getList(author, keyword).then(listData => {
    res.json(
      new SuccessModel(listData)
    )
  },(error) => {
    res.json(
      new ErrorModel(error)
    )
  })
  /* Session {
    cookie: {
      path: '/',
      _expires: 2020-01-16T06:57:08.102Z,
      originalMaxAge: 86400000,
      httpOnly: true
    }
  } */
  
});

router.get('/detail', (req, res, next) => {
  getDetail(req.query.id).then((data) => {
    res.json(
      new SuccessModel(data)
    )
  })
});

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  newBlog(req.body).then((data) => {
    res.json(
      new SuccessModel(data)
    ) 
  })
});

router.post('/update', loginCheck, (req, res, next) => {
  updateBlog(req.body).then((val) => {
    if(val){
      res.json(
        new SuccessModel()
      ) 
    }else{
      res.json(
        new ErrorModel('更新微博失败')
      ) 
    }   
  })
});

router.post('/delete', loginCheck, (req, res, next) => {
  req.body.author = req.session.username //两层判断，防止 误/恶意 删除别人的微博
    delBlog(req.body.id, req.body.author).then((val) => {
      if(val){
        res.json(
          new SuccessModel()
        ) 
      }else{
        res.json(
          new ErrorModel('删除微博失败')
        )
      }
    })
});

module.exports = router;
