var ModOper_annual_member = require('../model/oper_annual_member.js');
var base= require('./base.js')
var url = require('url')

this.member_list = function(req,res){
    var params = url.parse(req.url,true).query
    var pageNum = params.pageNum;
    var pageSize = params.pageSize
    var openid = url.parse(req.url,true).query.openid
    ModOper_annual_member.member_list(pageNum,pageSize,function(result1){
        ModOper_annual_member.member_total(function(result){
            res.send({
                result1:result1,
                result:result[0]['COUNT(*)']
            })
        })
    })
}
this.search_member = function(req,res){
    var data = url.parse(req.url,true).query.search_input
    ModOper_annual_member.search_member(data,function(result){
        res.send(result)
    })
}
this.member_update = function(req,res){
    var id = req.body.data.id,
    signIn_id = req.body.data.signIn_id;
    ModOper_annual_member.member_update(id,signIn_id,function(result){
        res.send(result)
    })
}
this.new_draw = function(req,res){
    var round = req.body.round
    function draw(){
        this.round = round
    }
}
