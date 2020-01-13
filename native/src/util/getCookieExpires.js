//工具-------获取 cookie 的过期时间,此为一天
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24*60*60*1000))
  return d.toGMTString()  //cookie的时间格式
}
module.exports = {
  getCookieExpires
}