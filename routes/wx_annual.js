var Con_annual = require('../controllers/wx_annual.js')
var Base = require('../controllers/base.js')


module.exports = function(app){
    app.options('/wx_annual/*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Expose-Headers', 'token,Content-Type,X-Requested-With');
		res.header("Access-Control-Allow-Headers", 'token,Content-Type,X-Requested-With');
		res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
		res.send('200');
	});
    app.use('/wx_annual',function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
        next();
    })
    app.get('/wx_annual/userInfo',function(req,res,next){
        Base.userInfo(req,res,next)
    })
    app.get('/wx_annual/getUserInfo',function(req,res,next){
        Con_annual.getUserInfo(req,res,next)
    })
    app.get('/wx_annual/checkInfo',function(req,res,next){
        Con_annual.checkInfo(req,res,next)
    })
    app.post('/wx_annual/setUserInfo',function(req,res,next){
        Con_annual.setUserInfo(req,res,next)
    })
    app.get('/wx_annual/baseUserInfo',function(req,res,next){
        Con_annual.baseUserInfo(req,res,next)
    })
    app.post('/wx_annual/putUserInfo',function(req,res,next){
        Con_annual.putUserInfo(req,res,next)
    })
    app.get('/wx_annual/person_info',function(req,res,next){
        Con_annual.person_info(req,res,next)
    })
    app.put('/wx_annual/goBack',function(req,res,next){
        Con_annual.goBack(req,res,next)
    })
    app.get('/wx_annual/v_code',function(req,res,next){
        Con_annual.v_code(req,res,next)
    })
    app.put('/wx_annual/join',function(req,res,next){
        Con_annual.join(req,res,next)
    })
    app.get('/wx_annual/meeting_info',function(req,res,next){
        Con_annual.meeting_info(req,res,next)
    })
    app.post('/wx_annual/signIn',function(req,res,next){
        Con_annual.signIn(req,res,next)
    })
    app.get('/wx_annual/check_signIn',function(req,res,next){
        Con_annual.check_signIn(req,res,next)
    })
}