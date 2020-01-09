const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error(err);
})

//封装函数
function set(key, val){
  if(typeof val == 'object'){ //存不了对象
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

function get(key){
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if(err){
        reject(err)
      }else{
        if(val==null){
          resolve(null)
        }
        try {
          resolve(JSON.parse(val)) //尝试序列化
        } catch (error) {
          //序列化不成功，即val本是个基本数据类型
          resolve(val)
        }
      }
    })
  })
}

module.exports = {
  set,
  get
}