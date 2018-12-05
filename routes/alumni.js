var Base = require('../controllers/base')

module.exports = function(app){
    app.get('/alumni/userInfo',function(req,res,next){
        Base.userInfo(req,res,next)
    })
}