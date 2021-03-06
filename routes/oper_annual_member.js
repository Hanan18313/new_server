var ConOper_annual_member = require('../controllers/oper_annual_member.js')

module.exports = function(app){
    app.options('/oper/*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Expose-Headers', 'token,Content-Type,X-Requested-With');
		res.header("Access-Control-Allow-Headers", 'token,Content-Type,X-Requested-With');
		res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
		res.send('200');
	});
    app.use('/oper',function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
        next();
    })
    app.post('/oper/login',function(req,res,next){
        ConOper_annual_member.login(req,res,next)
    })
    app.get('/oper/member_list',function(req,res,next){
        ConOper_annual_member.member_list(req,res,next)
    })
    app.get('/oper/search_member',function(req,res,next){
        ConOper_annual_member.search_member(req,res,next)
    }),
    app.post('/oper/member_update',function(req,res,next){
        ConOper_annual_member.member_update(req,res,next)
    })
    // app.post('/oper/new_draw',function(req,res,next){
    //     ConOper_annual_member.new_draw(req,res,next)
    // }),
    app.get('/oper/draw_employee_list',function(req,res,next){
        ConOper_annual_member.draw_empolyee_list(req,res,next)
    })
    app.get('/oper/draw_employee_get',function(req,res,next){
        ConOper_annual_member.draw_empolyee_get(req,res,next)
    })
    app.post('/oper/draw_employee_prize',function(req,res,next){
        ConOper_annual_member.draw_empolyee_prize(req,res,next)
    })
    app.get('/oper/draw_family_list',function(req,res,next){
        ConOper_annual_member.draw_family_list(req,res,next)
    })
    app.get('/oper/draw_prize',function(req,res,next){
        ConOper_annual_member.draw_family_prize(req,res,next)
    })
    app.post('/oper/draw_update_f',function(req,res,next){
        ConOper_annual_member.draw_update_f(req,res,next)
    })
    app.get('/oper/audit_list',function(req,res,next){
        ConOper_annual_member.audit_list(req,res,next)
    })
    app.put('/oper/audit_update',function(req,res,next){
        ConOper_annual_member.audit_update(req,res,next)
    })
    app.get('/oper/authority_list',function(req,res,next){
        ConOper_annual_member.authority_list(req,res,next)
    })
    app.put('/oper/authority',function(req,res,next){
        ConOper_annual_member.authority(req,res,next)
    })
    app.post('/oper/news',function(req,res,next){
        ConOper_annual_member.news(req,res,next)
    })
    app.get('/oper/news',function(req,res,next){
        ConOper_annual_member.news_list(req,res,next)
    })
    app.get('/oper/meeting',function(req,res,next){
        ConOper_annual_member.meeting(req,res,next)
    })
    app.put('/oper/meeting',function(req,res,next){
        ConOper_annual_member.put_meeting(req,res,next)
    })
}