var ConMember = require('../controllers/member.js')

module.exports = function(app){
    app.get('/home/member_list',function(req,res,next){
        ConMember.member_list(req,res,next)
    })
    app.get('/home/search_member',function(req,res,next){
        ConMember.search_member(req,res,next)
    }),
    app.post('/home/member_update',function(req,res,next){
        ConMember.member_update(req,res,next)
    })
}