const env = process.env.NODE_ENV //环境变量 nodejs 从启动命令中获取的配置 即packjson中启动命令

// 配置
let MYSQL_CONF
let REDIS_CONF
if (env == 'dev') {
	// mysql
	MYSQL_CONF = {
		host: 'localhost',
		user: 'root',
		password: 'root',
		port: '3306',
		database: 'myblog'
	}

	// redis
	REDIS_CONF = {
		port: 6379,
		host: '127.0.0.1'
	}
} else if (env == 'production') {
	// mysql
	MYSQL_CONF = {
		host: 'localhost',
		user: 'root',
		password: 'root',
		port: '3306',
		database: 'myblog'
	}

	// redis
	REDIS_CONF = {
		port: 6379,
		host: '127.0.0.1'
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
	MYSQL_CONF,
	REDIS_CONF
}