const { exec } = require('../db/mysql')
const xss = require('xss')  //防止前端XSS攻击,主要功能是转义特殊字符，无法形成代码块
const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 ` //注意后面都有空格
  //1=1 永远成立  为了防止where后边没有查询条件。
  if(author){
    sql += `and author='${author}' `
  }
  if(author){
    sql += `and title like'%${keyword}%' `  
  }
  sql += `order by createtime desc`  //代码中可以省略末尾 ; 
  return await exec(sql)
}
const getDetail = async (id) => {
  let sql = `select * from blogs where id='${id}'`
  const rows = await exec(sql)
  return rows[0]
}
const newBlog = async (blogData = {}) => {
  const {title, content, author} = blogData
  // const title = xss(blogData.title) //预防XSS攻击
  const createtime = Date.now()
  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', '${createtime}', '${author}')
  `
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }

}
const updateBlog = async (blogData = {}) => {
  const {id, title, content} = blogData
  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id}
  `
  const updateData = await exec(sql)
  if(updateData.affectedRows>0){
    return true
  }else{
    return false
  }
}
const delBlog = async (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}'`
  const deleteData = await exec(sql)
  if(deleteData.affectedRows > 0){
    return true
  }else{
    return false
  }
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}