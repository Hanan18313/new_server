var url = require('url')
var Mod_annual = require('../model/annual.js')
var Promise = require('promise')
var fs = require('fs')
var base = require('./base.js')
var oper_annual = require('./oper_annual_member.js')
var server = require('http')
global.CONFIG = JSON.parse(fs.readFileSync('./config.json').toString())

this.userInfo = function(req,res){
    var code = url.parse(req.url,true).query.code;
    WX_ID(code,function(result){
        var wx_id = JSON.parse(result);
        res.send(result)
        var unionid = wx_id.unionid;
        var openid= wx_id.openid;
    })
}
this.getUserInfo = function(req,res){
    var newDate = new Date('2019/1/13 00:00:01')
    var nowDate = new Date()
    var syTime = (newDate - nowDate)/(1000*60*60*24)
    var query = url.parse(req.url,true).query
    var unionid = query.unionid;
    var openid = query.openid
    Mod_annual.getUserInfo(openid,function(result){
        if(result.length == 0){
            res.send({
                code:200,
                msg:'无此数据'
            })
        }else{
            res.send({
                code:200,
                msg:'已存在',
                data:result,
                time:syTime
            })
        }
    })
}
this.add_annual_vip_basic = function(req,res){
    var params = req.body;
    var name = params.data.name,
        phone = params.data.phone,
        company = params.data.company,
        openid = params.openid,
        portrait = params.avatarUrl
        Mod_annual.add_annual_vip_basic(name,phone,company,openid,portrait,function(result){
            res.send({
                code:200,
                msg:'新增成功'
            })
        })
}
this.add_annual_member = function(req,res){
    var unionid = req.body.unionid
    var openid = req.body.value.open_id
    if(unionid.length > 0){
        Mod_annual.get_vip_basic(unionid,function(result){
            if(result.length != 0){
                Mod_annual.get_annual_vip_basic(openid,function(result){
                    var name = result[0].name;
                    var phone = result[0].phone;
                    var portrait = result[0].portrait;
                    var company = result[0].company
                    var day = new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds();
                    var year = new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate()
                    var signIn_time = year +' '+ day;
                    if(result.length != 0){
                        let category = 1
                        Mod_annual.add_annual_member(name,phone,openid,portrait,company,signIn_time,category,function(result){
                            res.send({
                                code:200,
                                msg:'签到成功'
                            })
                        })
                    }
                })
            }else{
                Mod_annual.get_annual_vip_basic(openid,function(result){
                    if(result.length != 0){
                        var name = result[0].name;
                        var phone = result[0].phone;
                        var portrait = result[0].portrait;
                        var company = result[0].company
                        var day = new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds();
                        var year = new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate()
                        var signIn_time = year +' '+ day;
                        let category = 2
                        Mod_annual.add_annual_member(name,phone,openid,portrait,company,signIn_time,category,function(result){
                            res.send({
                                code:200,
                                msg:'签到成功'
                            })
                        })
                    }
                })
            }
        })
    }else{
        Mod_annual.get_annual_vip_basic(openid,function(result){
            if(result.length != 0){
                var name = result[0].name;
                    var phone = result[0].phone;
                    var portrait = result[0].portrait;
                    var company = result[0].company
                    var day = new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds();
                    var year = new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate()
                    var signIn_time = year +' '+ day;
                let category = 2
                Mod_annual.add_annual_member(name,phone,openid,portrait,company,signIn_time,category,function(result){
                    res.send({
                        code:200,
                        msg:'签到成功'
                    })
                })
            }
        })
    }
}
this.get_annual_member = function(req,res){
    var openid = url.parse(req.url,true).query.value
    Mod_annual.get_annual_member(openid,function(result){
        if(result.length == 0){
            res.send({
                code:200,
                msg:'暂无数据'
            })
        }else{
            res.send({
                code:200,
                data:result
            })
        }
    })
}
this.center_personal = function(req,res){
    var openid = url.parse(req.url,true).query.openid;
    Mod_annual.center_personal(openid,function(result){
        var signIn_id = result[0].signIn_id
        if(signIn_id == ''){
            res.send({
                code:200,
                data:null
            })
        }else{
            res.send({
                code:200,
                data:signIn_id
            })
        }
    })

}
this.center_attendee = function(req,res){
    var params = url.parse(req.url,true).query
    var page = params.page?Number(params.page):1
    var pageSize = params.pageSize?Number(params.pageSize):10
    Mod_annual.center_attendee(page,pageSize,function(result){
        res.send(result)
    })
}
this.center_search_attendee = function(req,res){
    var value = url.parse(req.url,true).query.value;
    Mod_annual.center_search_attendee(value,function(result){
        var resultArr = []
        new Promise((resolve,reject) => {
            resolve();
        }).then(() => {
            for(let i = 0; i < result.length; i++){
                    resultArr.push(result[i])
            }
        }).then(() => {   
            res.send(resultArr);
        })
    })
}
this.center_prize_pool = function(req,res){
    var round = url.parse(req.url,true).query.round
    Mod_annual.center_prize_pool(round,function(result){
        var imgUrl = CONFIG.imgUrl
        var imgArr = []
        for(let i = 0; i < result.length; i++){
            result[i].imgUrl = imgUrl+result[i].imgUrl
            imgArr.push(result)
        }
        res.send({
            code:200,
            data:imgArr[0]
        })
    })
}
this.chat = function(req,res){
    console.log(req)
}