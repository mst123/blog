//工具-------用于处理 post data
let getPostData = (req) => {  
  return new Promise((resolve, reject) => {
    if(req.mehhod == 'GET'){
      resolve({})
      return
    }
    /* if(req.headers['content-type'] != 'application/json'){
      resolve({})
      return
    } */
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString() //二进制转字符串
    })
    req.on('end', () => {
      if(!postData){
        resolve({})
      }else{
        resolve(JSON.parse(postData))
      }    
    })
  })
}
module.exports = {
  getPostData
}