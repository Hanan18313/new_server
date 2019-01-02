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
        status:2
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

//定时器 *********************************************************//待改进 会自动更新
// var Rule = new schedule.RecurrenceRule()
var Rule1 = new schedule.RecurrenceRule()
var Rule2 = new schedule.RecurrenceRule()
var Rule3 = new schedule.RecurrenceRule()
var Rule4 = new schedule.RecurrenceRule()
// Rule.year = [19]
Rule1.month = [1]
Rule2.date = [12]
Rule3.hour = [12,23]
Rule4.minute = [20,14,25,12]

// schedule.scheduleJob('1 36 13 25 12 *',function(){
//     console.log(base.formatDate(new Date())+'执行的此任务')
//     LOG(base.formatDate(new Date())+'执行的此任务')
//     Mod_annual.meeting_info(function(result){
//         if(result[0].meeting_status == 1){
//             let status = 2
//             Mod_annual.meeting_status(status)
//         }else if(result[0].meeting_status == 2){
//             let status = 3
//             Mod_annual.meeting_status(status)
//         }else{
//             let status = 1
//             Mod_annual.meeting_status(status)
//         }
//     })
// })
schedule.scheduleJob('0 38 9 28 12 *',function(){
    LOG(base.formatDate(new Date())+'执行的此任务')
    Mod_annual.meeting_info(function(result){
        if(result[0].meeting_status == 1){
            let status = 2
            Mod_annual.meeting_status(status)
        }else if(result[0].meeting_status == 2){
            let status = 3
            Mod_annual.meeting_status(status)
        }else{
            let status = 1
            Mod_annual.meeting_status(status)
        }
    })
})
schedule.scheduleJob('10 38 9 28 12 *',function(){
    LOG(base.formatDate(new Date())+'执行的此任务')
    Mod_annual.meeting_info(function(result){
        if(result[0].meeting_status == 1){
            let status = 2
            Mod_annual.meeting_status(status)
        }else if(result[0].meeting_status == 2){
            let status = 3
            Mod_annual.meeting_status(status)
        }else{
            let status = 1
            Mod_annual.meeting_status(status)
        }
    })
})
schedule.scheduleJob('30 38 9 28 12 *',function(){
    LOG(base.formatDate(new Date())+'执行的此任务')
    Mod_annual.meeting_info(function(result){
        if(result[0].meeting_status == 1){
            let status = 2
            Mod_annual.meeting_status(status)
        }else if(result[0].meeting_status == 2){
            let status = 3
            Mod_annual.meeting_status(status)
        }else{
            let status = 1
            Mod_annual.meeting_status(status)
        }
    })
})


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
    var status = req.body.status;
    var openid = req.body.openid
    Mod_annual.join(status,openid,function(result){
        res.send({
            code:200,
            msg:'信息审核中'
        })
    })
}
this.join_status = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    var family_total = 0, employee_total = 0
    var id_arr = []
    Mod_annual.join_status(openid,function(result){
        Mod_annual.person_total(openid,function(result_total){
            Mod_annual.person_class(function(result_class){
                new Promise((resolve,reject) =>{
                    resolve()
                }).then(() =>{
                    for(let i = 0; i < result_class.length; i++){
                        id_arr.push(result_class[i].id)
                        if(result_class[i].category == 1){
                            employee_total++;
                        }else if(result_class[i].category == 2){
                            family_total++;
                        }
                    }
                }).then(() =>{
                     console.log(Math.min(id_arr[0]))
                     console.log(result_total[0].id)
                    result_total = result_total[0].id - Math.min(id_arr[0])
                    console.log(result_total)
                    res.send({
                        result:result,
                        result_total:result_total+1,
                        employee_total:employee_total,
                        family_total:family_total
                    })
                })
            })
        })
    })
}
this.subscribe = function(req,res){
    var query = url.parse(req.url,true).query
    var page = query.page?Number(query.page):1;
    var pageSize = query.pageSize?Number(query.pageSize):10
    Mod_annual.subscribe(page,pageSize,function(result){
        res.send(result)
    })
}
this.before_pool = function(req,res){
    Mod_annual.before_pool(function(result){
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                result[i].imgUrl = CONFIG.imgUrl+result[i].imgUrl
            }
            res.send(result)
        }else{
            res.send({
                code:200,
                msg:'暂无奖品信息'
            })
        }
    })
}
this.search_sub = function(req,res){
    var value = url.parse(req.url,true).query.value
    Mod_annual.search_sub(value,function(result){
        res.send(result)
    })
}
this.read_news = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    var arr = []
    Mod_annual.baseUserInfo(openid,function(result){
        if(result[0]['read_time'] != null){
            Mod_annual.read_news(function(result_news){
                new Promise((resolve,reject) =>{
                    resolve()
                }).then(() =>{
                    for(let i = 0; i < result_news.length; i++){
                        if(result_news[i].news_time >= result[0].read_time){
                            result_news[i].news_time = base.formatDate(result_news[i].news_time)
                            arr.push(result_news[i])
                        }
                    }
                }).then(() =>{
                    res.send(arr)
                })
            })
        }else{
            res.send({
                code:200,
                msg:'暂无更新'
            })
        }
    })
}
this.basicRead_time = function(req,res){
    var openid = req.body.openid
    var read_time = base.now_time()
    Mod_annual.basicRead_time(openid,read_time,function(result){
        res.send({
            code:200,
            msg:'read_time'
        })
    })
}
this.meeting_info = function(req,res){
    Mod_annual.meeting_info(function(result){
        result[0].start_time = base.formatDate(result[0].start_time)
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
    Mod_annual.checkInfo(openid,function(result){
        var bp1 = new BMap.Point(lng1,lat1)
        var bp2 = new BMap.Point(Number(result[0].longitude),Number(result[0].latitude))
        var getDistance = BMaplib.GeoUtils.getDistance(bp1,bp2)
        // console.log(BMaplib.GeoUtils.getDistance(bp2,bp1))
        if(result[0].status == 1){
            if(Number(getDistance) < 10000){ // 范围修改为200米
                var obj = {
                    openid:params.openid,
                    name:result[0].user_name,
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
this.cen_person_info = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_annual.cen_person_info(openid,function(result){
        res.send(result)
    })
}
this.prize_pool = function(req,res){
    var arr = []
    Mod_annual.prize_pool(function(result){
        new Promise((resolve,reject) =>{
            resolve()
        }).then(() =>{
            for(let i = 0; i < result.length; i++){
                result[i].imgUrl = CONFIG.imgUrl+result[i].imgUrl
                arr.push(result[i])
            }
        }).then(() =>{
            res.send(arr)
        })
    })
}

// this.prize_pool = function(req,res){
//     var Arr = []
//     Mod_annual.draw_prize(function(result_prize){
//         Mod_annual.draw_member(function(result_member){
//             // console.log(result_prize)
//             // console.log(result_member)
//             new Promise((resolve,reject) =>{
//                 resolve()
//             }).then(() =>{
//                 for(let i = 0; i < Math.max(result_prize.length,result_member.length); i++){
//                     result_prize[i].imgUrl = CONFIG.imgUrl+result_prize[i].imgUrl
//                     if(result_member[i].open_id == result_prize[i].open_id){
//                         var obj = Object.assign(result_member[i],result_prize[i])
//                         Arr.push(obj)
//                     }
//                 }
//             }).then(() =>{
//                 res.send(Arr)
//             })
//         })
//     })
// }
this.attendee = function(req,res){
    var query = url.parse(req.url,true).query
    var page = query.page?Number(query.page):1
    var pageSize = query.pageSize?Number(query.pageSize):10
    var category = query.category
    Mod_annual.attendee(page,pageSize,category,function(result){
        res.send(result)
    })
}
this.search_attendee = function(req,res){
    var value = url.parse(req.url,true).query.value
    var category = url.parse(req.url,true).query.category
    Mod_annual.search_attendee(value,category,function(result){
        res.send(result)
    })
}
//年会后模块
this.over_view = function(req,res){
    var openid = url.parse(req.url,true).query.openid
    Mod_annual.over_view(openid,function(result){
        res.send(result)
    })
}
this.over_submit = function(req,res){
    var params = req.body.data
    Mod_annual.over_submit(params,function(result){
        res.send({
            code:200,
            msg:'新增成功'
        })
    })
}
this.winner_list = function(req,res){
    Mod_annual.winner_list(function(result){
        res.send(result)
    })
}
