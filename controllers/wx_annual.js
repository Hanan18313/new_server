var url = require('url')
var Promise = require('promise')
var Mod_annual = require('../model/wx_annual')
var request = require('request');
var fs = require('fs')
var schedule = require('node-schedule')
global.CONFIG = JSON.parse(fs.readFileSync('./config.json').toString());

this.setUserInfo = function(req,res){
    var openid = req.body.openid;
    var unionid = req.body.unionid
    var avatarUrl = req.body.avatarUrl
    if(unionid == undefined){//家属
        Mod_annual.setUserInfo_f(openid,avatarUrl,function(result){
            res.send({
                code:200,
                msg:'新增成功'
            })
        })
    }else{//员工
        Mod_annual.getEmployee(unionid,function(result){
            if(result.length != 0){
                var obj = {
                    name:result[0].name,
                    phone:result[0].phone,
                    openid:openid,
                    unionid:unionid,
                    avatarUrl:avatarUrl
                }
                Mod_annual.setUserInfo(obj,function(result){
                    res.send({
                        code:200,
                        msg:'新增成功'
                    })
                })
            }else{
                Mod_annual.setUserInfo_f(openid,avatarUrl,function(result){
                    res.send({
                        code:200,
                        msg:'新增成功'
                    })
                })
            }
        })
    }

}
this.checkInfo = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_annual.checkInfo(openid,function(result){
        res.send(result)
    })
}
this.baseUserInfo = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_annual.baseUserInfo(openid,function(result){
        res.send(result)
    })
}
this.person_info = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_annual.person_info(openid,function(result){
        res.send(result)
    })
}
this.putUserInfo = function(req,res){
    var params = req.body.data
    var obj = {
        name:params.name,
        family_name:params.family_name,
        phone:params.phone,
        openid:params.openid,
        status:3
    }
    Mod_annual.putUserInfo(obj,function(result){
        res.send({
            code:200,
            msg:'提交成功',
            value:2
        })
    })
}
this.goBack = function(req,res){
    var openid = req.body.openid
    Mod_annual.goBack(openid,function(result){
        res.send({
            code:200,
            msg:'撤回成功',
            value:2
        })
    })
}
this.notice_msg = function(req,res){
    var params = req.body
    var day = new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds();
    var year = new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate()
    var date = year +' '+ day;
    var obj = {
        openid:params.openid,
        title:params.title,
        content:params.content,
        avatarUrl:params.userInfo.avatarUrl,
        date:date
    }
    Mod_annual.notice_msg(obj,function(result){
        Mod_annual.authority(obj,function(result1){
            res.send({
                code:200,
                msg:'新增成功',
                result1:result1
            })
        })
    })
}
this.notice = function(req,res){
    Mod_annual.notice(function(result){
        res.send(result)
    })
}
this.single_msg = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    var obj = {
        openid:openid
    }
    Mod_annual.single_msg(openid,function(result){
        Mod_annual.authority(obj,function(result1){
            res.send({
                result:result,
                result1:result1
            })
        })

    })
}
//定时器
var rule = new schedule.RecurrenceRule()
    rule.dayOfWeek = [0, new schedule.Range(0, 6)];
    rule.hour = 6
    rule.minute = 0
    schedule.scheduleJob(rule, function(){
        Mod_annual.Self_update()
    })



// this.notice = function(req,res){
//     var arr = []
//     Mod_annual.notice(function(result){
//         new Promise((resolve,reject) => {
//             resolve()
//         }).then(() =>{
//             for(let i = 0; i < result.length; i++){
//                 if(result[i].category == 2){
//                     if(result[i].status == 1){
//                         arr.push(result[i].family_name+'的家属'+result[i].name+'通过审核。')
//                     }else if(result[i].status == 0){
//                         arr.push(result[i].family_name+'的家属'+result[i].name+'未通过审核。')
//                     }
//                 }
//             }
//         }).then(() =>{
//             res.send(arr)
//         })
//     })
// }
this.v_code = function(req,res){
    var mobile = url.parse(req.url,true).query.mobile
    var code =''
    new Promise((resolve,reject) => {
        resolve();
    }).then(() =>{
        for(let i = 0; i < 6; i++){
            code+=Math.floor(Math.random()*10);
        }
    }).then(() =>{
        var proxy_url = CONFIG.proxy_url+'/sms/v_code?code='+code+'&mobile='+mobile
        request.get(proxy_url,function(err,respones,result){
            if(err){
                LOG(err)
            }else{
                res.send({
                    v_code:code
                })
            }
        })
    })
}

