const express = require('express');
const router = express.Router();
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')        //封装的信息体
/* GET users listing. */
router.get('/list', function(req, res, next) {
  let author = req.query.author || ''
  let keyword = req.query.keyword || ''
  getList(author, keyword).then(listData => {
    res.json(
      new SuccessModel(listData)
    )
  },(error) => {
    res.json(
      new ErrorModel(error)
    )
  })
  console.log(req.session);
  /* Session {
    cookie: {
      path: '/',
      _expires: 2020-01-16T06:57:08.102Z,
      originalMaxAge: 86400000,
      httpOnly: true
    }
  } */
  
});

router.get('/detail', function(req, res, next) {
  res.json({
    errno: 0,
    data: {
      abc: [1, 2, 3]
    }
  });
});
module.exports = router;
