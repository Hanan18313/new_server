var ModMember = require('../model/member.js');
var url = require('url')

this.member_list = function(req,res){
    var params = url.parse(req.url,true).query
    var pageNum = params.pageNum;
    var pageSize = params.pageSize
    ModMember.member_list(pageNum,pageSize,function(result1){
        ModMember.member_total(function(result){
            res.send({
                result1:result1,
                result:result[0]['COUNT(*)']
            })
        })
    })
}
this.search_member = function(req,res){
    var data = url.parse(req.url,true).query.search_input
    ModMember.search_member(data,function(result){
        res.send(result)
    })
}
this.member_update = function(req,res){
    var id = req.body.data.id,
    signIn_id = req.body.data.signIn_id,
    isLunch = req.body.data.is_lunch
    ModMember.member_update(id,signIn_id,isLunch,function(result){
        res.send(result)
    })
}