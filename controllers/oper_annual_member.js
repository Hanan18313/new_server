var ModOper_annual_member = require('../model/oper_annual_member.js');
var base= require('./base.js')
var url = require('url')
var Promise = require('promise');
var fs = require('fs')
global.CONFIG = JSON.parse(fs.readFileSync('./config.json').toString());

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
this.draw_empolyee_list = function(req,res){
    ModOper_annual_member.draw_empolyee_list(function(result){
        res.send({
            result:result,
        })
    })
}
this.draw_empolyee_get = function(req,res){
    var id = url.parse(req.url,true).query.id
    var open_id
    var imgUrl = CONFIG.imgUrl
    new Promise((resolve,reject) =>{
        ModOper_annual_member.draw_empolyee_get(id,function(result){
            open_id = result[0].open_id
            ModOper_annual_member.draw_empolyee_prize_get(open_id,function(result1){
                if(result1.length != 0){
                    result1[0].imgUrl = imgUrl+result1[0].imgUrl;
                    resolve({
                        result,
                        result1
                    }) 
                }else{
                    resolve({
                        result,
                        result1
                    })
                }
            })
        })
    }).then(result => {
        res.send(result)
    })
}
this.draw_empolyee_prize = function(req,res){
    var prize_id = req.body.prize_id;
    var open_id = req.body.open_id
    ModOper_annual_member.draw_empolyee_prize(prize_id,function(result1){
        ModOper_annual_member.draw_empolyee_update_prize(prize_id,open_id,function(result){
            res.send(result1)
        })
    })
}
this.draw_family_list = function(req,res){
    var imgUrl = CONFIG.imgUrl
    var category = url.parse(req.url,true).query.category
    ModOper_annual_member.draw_family_list(category,function(result){
        for(let i = 0; i < result.length; i++){
            result[i].imgUrl = imgUrl+result[i].imgUrl
        }
        res.send(result)
    })
}
this.draw_family_prize = function(req,res){
    var prize_id  = url.parse(req.url,true).query.prize_id
    var imgUrl = CONFIG.imgUrl
    var promise_p = new Promise((resolve,reject) =>{
        ModOper_annual_member.draw_family_prize(prize_id,function(result){
            result[0].imgUrl = imgUrl + result[0].imgUrl
            resolve(result)
        })
    }).then(result => result)
    .catch(e => LOG(e))
    var promise_d = new Promise((resolve,reject) =>{
        ModOper_annual_member.draw_family_d(prize_id,function(result){
            resolve(result)
        })
    }).then(result => result)
    .catch(e => LOG(e))
    Promise.all([promise_p,promise_d]).then(result =>{
        var arr = flatten(result)
        function flatten(arr){
            return [].concat(...arr.map(x => Array.isArray(x) ? flatten(x) : x))
        }
        res.send(arr)
    }).catch(e => LOG(e))
}
this.draw_update_f = function(req,res){
    var prize_id = req.body.prize_id,
        signIn_id = req.body.signIn_id
        ModOper_annual_member.draw_update_f(prize_id,signIn_id,function(result){
            res.send({
                code:200,
                msg:'更新成功',
            })
        })
}