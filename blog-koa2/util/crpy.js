const crypto = require('crypto') //

//密匙
const SECRET_KEY = 'Wsdjj_455#'

// md5 加密
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex') //16进制
}

// 加密函数
function genPassword(password){
  let str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}

module.exports = {
  genPassword
}
