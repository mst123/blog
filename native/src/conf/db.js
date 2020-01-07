const env = process.env.NODE_ENV //环境变量 nodejs 从启动命令中获取的配置 即packjson中启动命令

// 配置
let MYSQL_CONF
if (env == 'dev') {
	MYSQL_CONF = {
		host: 'localhost',
		user: 'root',
		password: 'root',
		port: '3306',
		database: 'myblog'
	}
} else if (env == 'production') {
	MYSQL_CONF = {
		host: 'localhost',
		user: 'root',
		password: 'root',
		port: '3306',
		database: 'myblog'
	}
}
MYSQL_CONF = {
	host: 'localhost',
	user: 'root',
	password: 'root',
	port: '3306',
	database: 'myblog'
}
module.exports = {
	MYSQL_CONF
}