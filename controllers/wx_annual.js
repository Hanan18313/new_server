var url = require('url')
var Promise = require('promise')
var Mod_annual = require('../model/wx_annual')
var base = require('./base.js')
var request = require('request');
var fs = require('fs')
var schedule = require('node-schedule')
var BMap = require('bmaplib').BMap
var BMaplib = require('bmaplib').BMapLib
global.CONFIG = JSON.parse(fs.readFileSync('./config.json').toString());

this.setUserInfo = function(req,res){
    var openid = req.body.openid;
    var unionid = req.body.unionid
    var avatarUrl = req.body.avatarUrl
    var meeting_id = 1
    if(unionid == undefined){//家属
        Mod_annual.setUserInfo_f(openid,avatarUrl,meeting_id,function(result){
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
                    avatarUrl:avatarUrl,
                    meeting_id:1
                }
                Mod_annual.setUserInfo(obj,function(result){
                    res.send({
                        code:200,
                        msg:'新增成功'
                    })
                })
            }else{
                Mod_annual.setUserInfo_f(openid,avatarUrl,meeting_id,function(result){
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

//定时器 *********************************************************//修改
var date1 = new Date('2018,12,20,12,43,0')
var date2 = new Date('2018,12,20,13,45,0')
var meetinging = schedule.scheduleJob(date1,function(){
    var status = 2
    Mod_annual.meeting_status(status)
    console.log(222)
})
meetinging.cancel()
 var meeting_end = schedule.scheduleJob(date2,function(){
    var status = 3
    Mod_annual.meeting_status(status)
    console.log(333)
})
meeting_end.cancel()


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
this.join = function(req,res){
    var isJoin = req.body.isJoin;
    Mod_annual.join(isJoin,function(result){
        res.send({
            code:200,
            msg:'更新成功'
        })
    })
}
this.meeting_info = function(req,res){
    Mod_annual.meeting_info(function(result){
        res.send(result)
    })
}
this.signIn = function(req,res){
    var day = new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds();
    var year = new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate()
    var signIn_time = year +' '+ day;
    var params = req.body
    var openid = params.openid
    var lat1 = params.latitude
    var lng1 = params.longitude
    console.log(params)
    Mod_annual.checkInfo(openid,function(result){
        var bp1 = new BMap.Point(120.18117,30.32122)
        var bp2 = new BMap.Point(Number(result[0].longitude),Number(result[0].latitude))
        console.log(result[0].longitude)
        console.log(result[0].latitude)
        var getDistance = BMaplib.GeoUtils.getDistance(bp1,bp2)
        console.log(BMaplib.GeoUtils.getDistance(bp2,bp1))
        if(result[0].status == 1){
            if(Number(getDistance) < 100){
                var obj = {
                    openid:params.openid,
                    name:result[0].name,
                    phone:result[0].phone,
                    portrait:result[0].portrait,
                    signIn_time:signIn_time,
                    category:result[0].category,
                    signIn_id:(String(result[0].phone)).substr(7,4)
                }
                Mod_annual.signIn(obj,function(result){
                    res.send({
                        code:200,
                        msg:'签到成功',
                        value:1
                    })
                })
            }else{
                res.send({
                    code:200,
                    msg:'不在现场',
                    value:0
                })
            }
        }else{
            res.send({
                code:200,
                msg:'审核未通过',
                value:-1
            })
        }
    })
}
this.check_signIn = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_annual.check_signIn(openid,function(result){
        res.send(result)
    })
}
