const fs = require('fs')
const path = require('path')
const readline = require('readline')

//文件名
const flieName = path.join(__dirname, '../', '../', 'logs', 'access.log')
// 创建 readStream
const readStream = fs.createReadStream(flieName)

// 创建 readline 对象
const rl = readline.createInterface({
  input: readStream
})

let chromeNum = 0
let num = 0

// 逐行读取  统计chrome浏览器的比例
rl.on('line', (lineData) => {
  if(!lineData){
    return
  }
  num++
  const arr = lineData.split(' -- ')
  if(arr[2] && arr[2].indexOf('Chrome') > 0){
    chromeNum++
  }
})

//监听读取完成
rl.on('close', () => {
  console.log((chromeNum/num).toFixed(4)*100+'%');
})