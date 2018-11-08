var express = require('express')
var ConPrize = require('../controllers/prize.js');

module.exports = function(app){
    app.options('/home/*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header('Access-Control-Expose-Headers', 'token,Content-Type,X-Requested-With');
		res.header("Access-Control-Allow-Headers", 'token,Content-Type,X-Requested-With');
		res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
		res.send('200');
	});
    app.use('/home',function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
        next();
    })
    app.get('/home/prize_list',function(req,res,next){
        ConPrize.prize_list(req,res,next)
    })
    app.get('/home/prize_info',function(req,res,next){
        ConPrize.prize_info(req,res,next)
    })
    app.post('/home/prize_add',function(req,res,next){
        ConPrize.prize_add(req,res,next)
    }),
    app.delete('/home/prize_delete',function(req,res,next){
        ConPrize.prize_delete(req,res,next)
    }),
    app.post('/home/prize_edit',function(req,res,next){
        ConPrize.prize_edit(req,res,next)
    }),
    app.post('/home/upload',function(req,res,next){
        ConPrize.upload(req,res,next)
    })
}