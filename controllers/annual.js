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

this.getUserInfo = function(req,res){
    var query = req.body;
    var day = new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds();
    var year = new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate()
    var signIn_time = year +' '+ day;
    if(query.category == 1){//员工签到
        var openid = query.openid
        let obj = {
            name:query.value.name,
            phone:query.value.phone,
            openid:query.openid,
            avatarUrl:query.avatarUrl,
            signIn_time:signIn_time,
            company:query.value.company,
            category:query.category
        }
        Mod_annual.add_annual_member(obj,function(result){
            res.send({
                code:200,
                msg:'新增成功',
                value:1
            })
        })
    }else if(query.category == 2){//家属签到
        let obj = {
            openid:query.openid,
            avatarUrl:query.avatarUrl,
            phone:query.value.phone,
            name:query.value.name,
            category:query.category,
            signIn_time:signIn_time
        }
        Mod_annual.add_annual_member_f(obj,function(result){
            res.send({
                code:200,
                msg:'新增成功',
                value:2
            })
        })
    }
    // Mod_annual.check_join(openid,function(result){
    //     if(result.length == 0){
    //         var day = new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds();
    //         var year = new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate()
    //         var signIn_time = year +' '+ day;
    //         var obj = {
    //             openid_signIn:query.openid,
    //             unionid:query.unionid,
    //             portrait:query.avatarUrl,
    //             nickName:query.nickName,
    //             signIn_time:signIn_time,
    //             category:2
    //         }
    //         if(query.unionid == undefined){//家属
    //             Mod_annual.add_annual_member_f(obj,function(result){
    //                 res.send({
    //                     code:200,
    //                     msg:'新增成功',
    //                     value:2
    //                 })
    //             })
    //         }else{
    //             Mod_annual.getUserInfo(obj,function(result){
    //                 console.log(result)
    //                 if(result.length != 0){
    //                     let obj = {
    //                         name:result[0].name,
    //                         phone:result[0].phone,
    //                         openid:query.openid,
    //                         portrait:query.avatarUrl,
    //                         signIn_time:signIn_time,
    //                         company:result[0].company,
    //                         nickName:query.nickName,
    //                         category:1
    //                     }
    //                     Mod_annual.add_annual_member(obj,function(result){//员工
    //                         res.send({
    //                             code:200,
    //                             msg:'新增成功',
    //                             value:1
    //                         })
    //                     })
    //                 }else{
    //                     Mod_annual.add_annual_member_f(obj,function(result){//家属
    //                         res.send({
    //                             code:200,
    //                             msg:'新增成功',
    //                             value:0
    //                         })
    //                     })
    //                 }
    //             })
    //         }
    //     }else{
    //         res.send({
    //             code:200,
    //             msg:'无记录',
    //             value:false
    //         })
    //     }
    // })
}
this.add_employee = function(req,res){
    var openid = req.body.openid
    var name = req.body.name
    var phone = req.body.phone
        Mod_annual.add_employee(openid,name,phone,function(result){
            res.send({
                code:200,
                msg:'新增成功',
                value:0
            })
        })
}
this.add_family = function(req,res){
    var openid = req.body.openid
    var phone = req.body.data.phone
    var name = req.body.data.name
        Mod_annual.add_family(openid,phone,name,function(result){
            res.send({
                code:200,
                msg:'新增成功',
                value:1
            })
        })
}
this.check_signIn = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_annual.check_signIn(openid,function(result){
        res.send(result)
    })
}
this.check_employee = function(req,res){
    var unionid = url.parse(req.url,true).query.unionid
    Mod_annual.check_employee(unionid,function(result){
        res.send(result)
    })
}
this.center_personal = function(req,res){
    var openid = url.parse(req.url,true).query.openid;
    Mod_annual.center_personal(openid,function(result){
        res.send(result)
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
            console.log(data)
            Mod_annual.chat_record_pull(value,function(result){
                
            })
            ws.send(data)
        })
    })
    wss.on('close',() =>{

    })
}
this.chat_record = function(req,res){
    var query = url.parse(req.url,true).query
    var page = query.page?Number(query.page):1
    var pageSize = query.pageSize?Number(query.pageSize):5
    Mod_annual.chat_record_push(page,pageSize,function(result){
        var arr = [];
        new Promise((resolve,reject) =>{
            resolve()
        }).then(() =>{
            for(let i = 0; i < result.length; i++){
                result[i].date = base.formatDate(result[i].date)
                arr.push(result[i])
            }
        }).then(() =>{
            res.send(JSON.stringify(arr.reverse()))
        })
    })
}
this.chat_history = function(req,res){
    var query = url.parse(req.url,true).query
    console.log(query)
    var page = query.pages?Number(query.pages):1
    var pageSize = query.pageSize?Number(query.pageSize):10
    Mod_annual.chat_history(page,pageSize,function(result){
        var arr = [];
        new Promise((resolve,reject) =>{
            resolve()
        }).then(() =>{
            for(let i = 0; i < result.length; i++){
                result[i].date = base.formatDate(result[i].date)
                arr.push(result[i])
            }
        }).then(() =>{
            res.send(JSON.stringify(arr))
        })
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