var ConWx = require('../controllers/wx.js');

module.exports = function(app){
    app.get('/wx/userInfo',function(req,res,next){
        ConWx.user_info(req,res,next)
    })
    app.get('/wx/signIn',function(req,res,next){
        ConWx.signIn(req,res,next)
    })
    app.get('/wx/checkSignIn',function(req,res,next){
        ConWx.checkSignIn(req,res,next)
    }),
    app.get('/wx/member_info',function(req,res,next){
        ConWx.member_info(req,res,next)
    })
    app.get('/wx/attendee',function(req,res,next){
        ConWx.attendee(req,res,next)
    })
    app.get('/wx/search_attendee',function(req,res,next){
        ConWx.search_attendee(req,res,next)
    })
    app.get('/wx/prize_pool',function(req,res,next){
        ConWx.prize_pool(req,res,next)
    })
    app.put('/wx/isLunch',function(req,res,next){
        ConWx.isLunch(req,res,next)
    })
}