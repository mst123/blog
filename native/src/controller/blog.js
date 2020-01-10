const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 ` //注意后面都有空格
  //1=1 永远成立  为了防止where后边没有查询条件。
  if(author){
    sql += `and author='${author}' `
  }
  if(author){
    sql += `and title like'%${keyword}%' `  
  }
  sql += `order by createtime desc`  //代码中可以省略末尾 ; 
  return exec(sql)
}
const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0]
  })
}
const newBlog = (blogData = {}) => {
  const {title, content, author} = blogData
  const createtime = Date.now()
  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', '${createtime}', '${author}')
  `
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}
const updateBlog = (blogData = {}) => {
  const {id, title, content} = blogData
  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id}
  `
  return exec(sql).then(updateData => {
    if(updateData.affectedRows>0){
      return true
    }else{
      return false
    }
  })
}
const delBlog = (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}'`
  return exec(sql).then(deleteData => {
    if(deleteData.affectedRows > 0){
      return true
    }else{
      return false
    }
  })
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}