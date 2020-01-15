const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser'); //解析cookie   req.cookies
const logger = require('morgan');              //记录log        

const session = require('express-session');    //处理session cookie
const RedisStore = require('connect-redis')(session)  //redis 处理session
const redisClient = require('./db/redis')     


// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');

const app = express();

// view engine setup 和views文件相关 视图引擎 不需要
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());  //处理post请求参数  req.body
app.use(express.urlencoded({ extended: false })); //兼容post content-type application/x-www-form-urlencoded
app.use(cookieParser());   //解析cookie
// app.use(express.static(path.join(__dirname, 'public  '))); //前端部分，不需要

// 配置cookie和session
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({  // 自动设置cookie
  secret: 'sAakjj!22#', //密匙
  cookie: {
    path: '/',  //默认配置
    httpOnly: true, //默认配置
    maxAge: 24 * 60 * 60 * 1000 //过期时间，一天
  },
  store: sessionStore
}))


//注册路由  父路径
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json({
    message: '404'
  })
});

module.exports = app;
