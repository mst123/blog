const mysql = require('mysql')

//创建链接对象
const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	port: '3306',
	database: 'myblog'
})

//开始连接
con.connect()

// 执行 sql 语句
// const sql = 'select * from users;'
//下面两种写法都可以
// const sql = 'update users set realname="李四" where username="lisi";'
// const sql = `update users set realname='李四2' where username='lisi';`
// 更新数据后打印内容
/* OkPacket {
    fieldCount: 0,
    affectedRows: 1, //影响行数
    insertId: 0,
    serverStatus: 34,
    warningCount: 0,
    message: '(Rows matched: 1  Changed: 1  Warnings: 0',
    protocol41: true,
    changedRows: 1 //改变行数
} */
const sql = `insert into blogs (title, content, createtime, author) values ('标题C','内容C',1546870348518, 'wanger');`
/* OkPacket {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 3,  //新插入的id
    serverStatus: 2,
    warningCount: 0,
    message: '',
    protocol41: true,
    changedRows: 0
} */
con.query(sql, (err, result) => {
	if (err) {
		console.error(err);
	} else {
		console.log(result);
	}
})

//关闭连接 ,疑惑1 上方查询是异步还是同步，按理说查询后才应该可以关闭
con.end()
