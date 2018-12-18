var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var multer = require('multer');
var mysql = require('mysql');
var request = require('request')
var bodyParser = require('body-parser');
var Session = require('express-session')
var log4js = require('./logs/start_log.js');
var querystring = require('querystring');
var ws = require('ws')
var RedisStore = require('connect-redis')(Session)
var socket = require('socket.io')(app);
global.CONFIG = JSON.parse(fs.readFileSync('./config.json').toString());

var app = express();
var objMulter = multer({dest : 'public/images'})
app.use(objMulter.any())
// dao.sync({force:true})
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('trust proxy',1);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
var config = {
  "cookie":{
    "maxAge":1000*60*30
  },
  "sessionStore":{
    "host":'127.0.0.1',
    "port":'6379',
    "db":1,
    "ttl":1800,
    "logErrors":true
  }
}

// app.use(Session({
//   name:'sid',
//   secret:'keyborad',
//   resave:true,
//   rolling:true,
//   saveUninitialized:false,
//   cookie:config.cookie,
//   store:new RedisStore(config.sessionStore)
// }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/dist')));
// app.use(function(req,res,next){
//   var url = req.originalUrl
//   if(req.session.user_name && url != '/oper/login'){
//     res.redirect('/')
//     return
//   }else{
//     next()
//   }

// })
require('./routes/index')(app)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
var Pool = mysql.createPool({
  host : CONFIG.mysql_host,
  user : CONFIG.mysql_user,
  password : CONFIG.mysql_password,
  port : CONFIG.mysql_port,
  database :'wx_signin'
})
var Pool2 = mysql.createPool({
  host : CONFIG.mysql_host_,
  user : CONFIG.mysql_user_,
  password : CONFIG.mysql_password_,
  port : CONFIG.mysql_port_,
  database :'lj_node'
})
global.CON = function(sql,val,callback){
  Pool.getConnection(function(err,conn){
    if(err){
      callback(err,null,null)
    }else{
      conn.query(sql,val,function(qerr,vals,fields){
        callback(qerr,vals,fields)
      })
      conn.release();//释放链接
    }
  })
}
global.CONN = function(sql,val,callback){
  Pool2.getConnection(function(err,conn){
    if(err){
      callback(err,null,null)
    }else{
      conn.query(sql,val,function(qerr,vals,fields){
        callback(qerr,vals,fields)
      })
      conn.release();//释放链接
    }
  })
}
global.LOG = function(info){
  //log4js.getLogger('log_file').debug(info)//log日志
  var logger = log4js.getLogger('log_file')
  logger.info(info)
  console.log(info)
}
global.SEND = function(res,code,data,msg){
  try{
    var r = {
      "code":code,
      "data":data,
      "msg":msg
    };
    res.send(JSON.stringify(r))
  }catch(e){
    LOG(e)
  }
}
global.TIME = function(){
  var day = new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds();
  var year = new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate()
  var signIn_time = year +' '+ day;
  return signIn_time
}
global.WX_ID = function(code,callback){
  var appid = CONFIG.appid;
  var secret = CONFIG.secret;
  var infoUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+code+'&grant_type=authorization_code';
  request.get(infoUrl,function(err,response,result){
    if(err){
      //throw Error(err)
      LOG(err)
    }else{
      callback(result)
    }
  })
}
global.WX_ID_Annual = function(code,callback){
  var appid = CONFIG.appid_annual;
  var secret = CONFIG.secret_annual;
  var infoUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+code+'&grant_type=authorization_code';
  request.get(infoUrl,function(err,response,result){
    if(err){
      //throw Error(err)
      LOG(err)
    }else{
      callback(result)
    }
  })
}
global.WX_ID_Annual_signIn = function(code,callback){
  var appid = CONFIG.appid_annual_signIn;
  var secret = CONFIG.secret_annual_signIn;
  var infoUrl = 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+code+'&grant_type=authorization_code';
  request.get(infoUrl,function(err,response,result){
    if(err){
      //throw Error(err)
      LOG(err)
    }else{
      callback(result)
    }
  })
}

global.ROLLBACK = function(callback){

}//数据库回滚
module.exports = app;
