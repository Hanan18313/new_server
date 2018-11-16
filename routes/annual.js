var Con_annual = require('../controllers/annual.js');

module.exports = function(app){
    app.get('/annual/userInfo',function(req,res,next){
        Con_annual.userInfo(req,res,next)
    })
    app.get('/annual/getUserInfo',function(req,res,next){
        Con_annual.getUserInfo(req,res,next)
    })
    app.post('/annual/add_vip_basic',function(req,res,next){
        Con_annual.add_annual_vip_basic(req,res,next)
    })
    app.post('/annual/add_member',function(req,res,next){
        Con_annual.add_annual_member(req,res,next)
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
    app.get('/annual/chat',function(req,res,next){
        Con_annual.chat(req,res,next)
    })
    app.get('/annual/prize_pool',function(req,res,next){
        Con_annual.center_prize_pool(req,res,next)
    })
}