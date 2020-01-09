const redis = require('redis')

//创建redis 客户端
const redisClient = redis.createClient(6379, '127.0.0.1') // 端口和port
redisClient.on('error', err => {
  console.error(err);
})

//测试
redisClient.set('myname', 'zhangsan', redis.print) //redis.print 控制台会输出是否成功的信息
redisClient.get('myname', (err, val) => {
  if(err){
    console.error(err);
    return
  }
  console.log('val ', val);

  //退出
  redisClient.quit()
})