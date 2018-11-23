var ModWx = require('../model/wx.js')
var url = require('url')
var Promise = require('promise')
var fs = require('fs')
global.CONFIG = JSON.parse(fs.readFileSync('./config.json').toString());

this.user_info = function(req,res){
    var code = url.parse(req.url,true).query.code;
    WX_ID(code,function(result){
        var wx_id = JSON.parse(result);
        res.send(result)
        var unionid = wx_id.unionid;
        var openid= wx_id.openid;
    })
}
this.signIn = function(req,res){
    var unionid = url.parse(req.url,true).query.unionid;
    var params = url.parse(req.url,true).query
    ModWx.signIn(unionid,function(result){
        if(result.length != 0){
            var name = result[0]['name'];
            //var openid = result[0]['openid'];
            var unionid = result[0]['unionid']; 
            var phone = result[0]['phone'];
            var company = result[0]['company']
            var day = new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds();
            var year = new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate()
            var signIn_time = year +' '+ day;
            var avatarUrl = params.avatarUrl;
            var openid = params.openid;
            var add_member,add_member_signIn
            add_member = new Promise((resolve,reject) =>{
                ModWx.member_add(name,unionid,phone,company,openid,signIn_time,avatarUrl,function(result){
                    resolve(result)
                })
            }).then(result =>result).catch(e =>LOG(e))
            add_member_signIn = new Promise((resolve,reject) =>{
                ModWx.member_signIn_add(unionid,function(result){
                    resolve(result)
                })
            }).then(result => result).catch(e => LOG(e))
            Promise.all([add_member,add_member_signIn]).then(result =>
                res.send({
                    code:200,
                    msg:'会员',
                    result:result
                })
            ).catch(e => LOG(e))
        }else{
            res.send({
                code:200,
                msg:'非会员'
            })
        }
    })
}
this.checkSignIn = function(req,res){
    var unionid = url.parse(req.url,true).query.unionid
    ModWx.checkSignIn(unionid,function(result){
        res.send({
            code:200,
            result:result
        })
    })
}
//我的信息
this.member_info = function(req,res){
    var unionid = url.parse(req.url,true).query.unionid
    ModWx.member_info(unionid,function(result){
        res.send(result)
    })
}
//与会人员
this.attendee = function(req,res){
    var params = url.parse(req.url,true).query
    var page = params.page?Number(params.page):1
    var pageSize = params.pageSize?Number(params.pageSize):10
    ModWx.attendee(page,pageSize,function(result){
        res.send(result)
    })
}
this.search_attendee = function(req,res){
    var value = url.parse(req.url,true).query.value;
    ModWx.search_attendee(value,function(result){
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
this.prize_pool = function(req,res){
    var imgUrl = CONFIG.imgUrl
    ModWx.prize_pool(function(result){
        var arr = []
        for(let i = 0; i < result.length; i++){
            result[i].imgUrl = imgUrl+result[i].imgUrl
            arr.push(result)
        }
        res.send({
           result:arr[0]
        })
    })
}
this.isLunch = function(req,res){
    var value = req.body.value;//false,true
    var unionid = req.body.unionid
    ModWx.isLunch(unionid,value,function(result){
        res.send({
            code:200,
            msg:'操作成功',
            result:result,
        })
    })
}
