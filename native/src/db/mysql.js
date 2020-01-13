const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')
//创建链接对象
const con = mysql.createConnection(MYSQL_CONF)
//开始连接
con.connect()
//统一执行 sql 函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
			// reject(111111111)
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}
//不关闭 con.end()
module.exports = {
  exec,
  escape: mysql.escape //防止sql注入攻击
}