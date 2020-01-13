const fs = require('fs')
const path = require('path') 

const fielName = path.resolve(__dirname, 'data.text')

//读取文件内容                            
/* fs.readFile(fielName, (err, data) => {
  if(err){
    console.error(err);
  }
  //data是二进制类型，需要toString转换
  console.log(data.toString());
}) */

//写入文件
/* const content = '这是新写入的内容\n'  // \n换行
const opt = {
  flag: 'a' //追加写入，覆盖用 w
}
fs.writeFile(fielName, content, opt, (err, data) => {
  if(err){
    console.error(err);
  }
  console.log(data); //undefined 
  // 不报错就是成功
}) */

//判断文件是否存在
fs.exists(fielName, (exist) => {
  console.log('exist ', exist);  //布尔类型
})