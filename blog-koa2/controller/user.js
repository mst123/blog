const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../util/crpy')
const login = async (username, password) => {
  username = escape(username)  //防止sql注入

  //生成加密密码
  password = genPassword(password)
  password = escape(password)
  
  /* const sql = `   
    select username, realname from users where username='${username}' and password='${password}' //使用escape前有引号
  ` */
  const sql = `
    select username, realname from users where username=${username} and password=${password}
  `
  const rows = await exec(sql)
  return rows[0] || {}
}
module.exports = {
  login
}