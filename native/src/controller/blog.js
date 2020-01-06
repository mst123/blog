const getList = (author, keyword) => {
  //先返回假数据
  return [
    {
      id: 1,
      title: '标题1',
      content: '内容1',
      createTime: 1578201143003,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题2',
      content: '内容2',
      createTime: 1578201153003,
      author: 'lisi'
    }
  ]
}
const getDetail = (id) => {
  return {
    id: 1,
    title: '标题1',
    content: '内容1',
    createTime: 1578201143003,
    author: 'zhangsan'
  }
}
module.exports = {
  getList,
  getDetail
}