const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
  constructor() {
    this.routes = []
  }

  register(path) {
    let info = {}
    if(typeof path == 'string'){
      info.path = path
      info.stack = slice.call(arguments, 1) //从第二参数开始截取
    }else{
      info.path = '/'
      info.stack = slice.call(arguments, 0) //从第一参数开始截取
    }
    return info
  }

  use() {
    const info = this.register.apply(this, arguments) //此处使用apply只是把数组参数展开 this参数可以是任意值
    // const info = this.register.apply(null, arguments)
    // const info = this.register(...arguments)  //等同于上方
    info.type = 'all'
    this.routes.push(info)
  }
  get() {
    const info = this.register(...arguments)
    info.type = 'get'
    this.routes.push(info)
  }
  post() {
    const info = this.register(...arguments)
    info.type = 'post'
    this.routes.push(info)
  }

  match(method, url) {
    let stack = []
    if(url === '/favicon.icon'){
      return stack
    }
    
    // 获取路由信息
    let curRoutes = this.routes.filter((item) => {
      return item.type == 'all'||item.type==method
    })
    
    curRoutes.forEach(routeInfo => {
      if(url.indexOf(routeInfo.path)===0){
        // url == '/api/get-cookie'   path== '/' path=='/api' path=='api/get-cookie' 符合条件的       
        stack = stack.concat(routeInfo.stack)
      }
    })
    return stack
  }

  //核心的next函数
  handle(req, res, stack){
    const next = () => {
      //拿到第一个匹配的中间件
      const middleware = stack.shift()
      if(middleware){
        middleware(req, res, next)
      }
    }
    next()
  }

  callback(){
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json')
        res.end(
          JSON.stringify(data)
        )
      }
      const url = req.url
      const method = req.method.toLowerCase()   
      const resultList = this.match(method, url)
      this.handle(req, res, resultList)
    }
  }

  listen(...args) { //这种形式适合接受复数且数量不定的参数，会将参数汇集到args数组中
    const server = http.createServer(this.callback())
    server.listen(...args)
  }

  /* listen() { //等同于上方形式
    const server = http.createServer(this.callback())
    server.listen(...arguments)
  } */
}

module.exports = LikeExpress