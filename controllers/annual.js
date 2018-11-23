var url = require('url')
var Mod_annual = require('../model/annual.js')
var Promise = require('promise')
var fs = require('fs')
var base = require('./base.js')
var http = require('http')
var app = require('express')()
var server = http.createServer(app);
var querystring = require('querystring')
var ws = require('ws')
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
    var query = req.body;
    var day = new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds();
    var year = new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate()
    var signIn_time = year +' '+ day;
    var obj = {
        openid:query.openid,
        unionid:query.unionid,
        portrait:query.avatarUrl,
        nickName:query.nickName,
        signIn_time:signIn_time,
        category:2
    }
    if(query.unionid == undefined){//家属
        Mod_annual.add_annual_member_f(obj,function(result){
            res.send({
                code:200,
                msg:'新增成功',
                value:2
            })
        })
    }else{
        Mod_annual.getUserInfo(obj,function(result){
            if(result.length != 0){
                let obj = {
                    name:result[0].name,
                    phone:result[0].phone,
                    openid:query.openid,
                    portrait:query.avatarUrl,
                    signIn_time:signIn_time,
                    company:result[0].company,
                    nickName:query.nickName,
                    category:1
                }
                Mod_annual.add_annual_member(obj,function(result){
                    res.send({
                        code:200,
                        msg:'新增成功',
                        value:1
                    })
                })
            }else{
                Mod_annual.add_annual_member_f(obj,function(result){
                    res.send({
                        code:200,
                        msg:'新增成功',
                        value:0
                    })
                })
            }
        })
    }
}
this.check_signIn = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_annual.check_signIn(openid,function(result){
        res.send(result)
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
    var category = params.category
    if(category == '1'){
        Mod_annual.center_attendee(page,pageSize,function(result){
            res.send(result)
        })
    }else if(category == '2'){
        Mod_annual.center_attendee_family(page,pageSize,function(result){
            res.send(result)
        })
    }
}
this.center_search_attendee = function(req,res){
    var value = url.parse(req.url,true).query.value;
    var category = url.parse(req.url,true).query.category
    if(category == 1){
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
    }else if(category == 2){
        Mod_annual.center_search_attendee_family(value,function(result){
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

this.socket_userInfo = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_annual.socket_userInfo(openid,function(result){
        res.send(result[0])
    })
}
//聊天室
this.websocket = function(server){
    //ws
    // function Clientvertify(info){
    //     var msg = url.parse(info.req.url,true).query
    //     return msg
    // }
    var wss = new ws.Server({
        server:server,
       // verifyClient:Clientvertify
    })
    wss.on('connection',(ws) =>{
        ws.on('message',(data) =>{
            var value = JSON.parse(data)
            Mod_annual.chat_record_pull(value,function(result){
            })
            ws.send(data)
        })
    })
    wss.on('close',() =>{

    })
}
this.chat_record = function(req,res){
    Mod_annual.chat_record_push(function(result){
        var record = {
            avatarUrl:result[0].portrait,
            content:result[0].chat_record,
            nickName:result[0].nick_name,
            date:result[0].chat_time
          }
        res.send(record)
    })
}
//聊天室发送图片
this.chat_upload = function(req,res){
    var findPath= String(req.files[0].destination).match(/images/g) + '/' + req.files[0].filename + Path.parse(req.files[0].originalname).ext;
    var filePath = req.files[0].destination + '/' + req.files[0].filename + Path.parse(req.files[0].originalname).ext;
    var filename =req.files[0].filename + Path.parse(req.files[0].originalname).ext;
    fs.rename(req.files[0].path,filePath,function(err,data){
        if(err){
            LOG(err)
        }else{
            res.send(filename);
        }
    })
}