var Con_annual = require('../controllers/annual.js');

module.exports = function(app){
    app.get('/annual/userInfo',function(req,res,next){
        Con_annual.userInfo(req,res,next)
    })
    app.post('/annual/getUserInfo',function(req,res,next){
        Con_annual.getUserInfo(req,res,next)
    })
    app.get('/annual/check_signIn',function(req,res,next){
        Con_annual.check_signIn(req,res,next)
    })
    app.get('/annual/get_annual_member',function(req,res,next){
        Con_annual.get_annual_member(req,res,next)
    })
    app.get('/annual/center_personal',function(req,res,next){
        Con_annual.center_personal(req,res,next)
    })
    app.get('/annual/center_attendee',function(req,res,next){
        Con_annual.center_attendee(req,res,next)
    })
    app.get('/annual/search_attendee',function(req,res,next){
        Con_annual.center_search_attendee(req,res,next)
    })
    app.get('/annual/socket_userInfo',function(req,res,next){
        Con_annual.socket_userInfo(req,res,next)
    })
    app.get('/annual/chat_record',function(req,res,next){
        Con_annual.chat_record(req,res,next)
    })
    app.get('/annual/chat_upload',function(req,res,next){
        Con_annual.chat_upload(req,res,next)
    })
    app.get('/annual/prize_pool',function(req,res,next){
        Con_annual.center_prize_pool(req,res,next)
    })
}