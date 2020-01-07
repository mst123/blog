const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRoueter = (req, res) => {
  const method = req.method
  //获取博客列表
  if(method == 'GET' && req.path=='/api/blog/list'){
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const result = getList(author, keyword)
    return result.then(listData => {  //promise.then() 也是一个promise
      console.log('第二层接收到结果');
      return new SuccessModel(listData) //第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数
      // resolve(new SuccessModel(listData))   //不可以使用
    },(error) => {
      console.log('第二层接收到错误');
      // reject(new ErrorModel(error))    //不可以使用
      return new ErrorModel(error)
    })
  }
  //获取博客详情
  if(method == 'GET' && req.path=='/api/blog/detail'){
    const id = req.query.id
    return getDetail(id).then((data) => {
      return new SuccessModel(data)
    })
    
  }
  //新建博客地址
  if(method == 'POST' && req.path=='/api/blog/new'){
    const author = 'zhangsan'
    req.body.author = author
    return newBlog(req.body).then((data) => {
      return new SuccessModel(data)
    })
  }
  //更新博客地址
  if(method == 'POST' && req.path=='/api/blog/update'){
    const id = 1
    return updateBlog(id, req.body).then((val) => {
      if(val){
        return new SuccessModel()
      }else{
        return new ErrorModel('更新微博失败')
      }
      
    })
  }
  //删除博客地址
  if(method == 'POST' && req.path=='/api/blog/delete'){ 
    req.body.author = 'zhangsan' //两层判断，防止 误/恶意 删除别人的微博
    return delBlog(req.body.id, req.body.author).then((val) => {
      if(val){
        return new SuccessModel()
      }else{
        return new ErrorModel('删除微博失败')
      }
    })
  }
}

module.exports = handleBlogRoueter