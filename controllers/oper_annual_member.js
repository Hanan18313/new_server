var ModOper_annual_member = require('../model/oper_annual_member.js');
var base= require('./base.js')
var url = require('url')
var Promise = require('promise');
var fs = require('fs')
var MD5 = require('md5');
global.CONFIG = JSON.parse(fs.readFileSync('./config.json').toString());

this.login = function(req,res){
    var user_name = req.body.user_name
        password = req.body.password;
        ModOper_annual_member.login(user_name,function(result){
            if(result.length != 0){
                if(MD5(password)== result[0].pwd){
                    res.send({
                        code:200,
                        msg:'登陆成功',
                        data:true
                    })
                }else{
                    res.send({
                        code:200,
                        msg:'登陆失败',
                        data:false
                    })
                }
            }else{
                res.send({
                    code:200,
                    msg:'登陆失败',
                    data:false
                })
            }

        })
}
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
    var params = url.parse(req.url,true).query
    var pageNum = params.pageNum;
    var pageSize = params.pageSize
    ModOper_annual_member.draw_empolyee_list(pageNum,pageSize,function(result){
        ModOper_annual_member.draw_empolyee_total(function(result1){
            res.send({
                result:result,
                result1:result1[0]['COUNT(*)']
            })
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
    ModOper_annual_member.draw_family_list(function(result){
        for(let i = 0; i < result.length; i++){
            result[i].imgUrl = imgUrl+result[i].imgUrl
        }
        res.send(result)
    })
}
this.draw_family_prize = function(req,res){
    var prize_id  = url.parse(req.url,true).query.prize_id
    var imgUrl = CONFIG.imgUrl
    ModOper_annual_member.check_draw(prize_id,function(result){
        if(result[0].signIn_id != null){
            ModOper_annual_member.draw_family_d(prize_id,function(result){
                result[0].imgUrl = CONFIG.imgUrl+result[0].imgUrl
                res.send({
                    result:result,
                    value:1
                })
            })
        }else{
            ModOper_annual_member.draw_family_prize(prize_id,function(result){
                result[0].imgUrl = CONFIG.imgUrl+result[0].imgUrl
                res.send({
                    result:result,
                    value:0
                })
            })
        }
    })
}
// this.draw_family_prize = function(req,res){
//     var prize_id  = url.parse(req.url,true).query.prize_id
//     var imgUrl = CONFIG.imgUrl
//     var promise_p = new Promise((resolve,reject) =>{
//         ModOper_annual_member.draw_family_prize(prize_id,function(result){
//             result[0].imgUrl = imgUrl + result[0].imgUrl
//             resolve(result)
//         })
//     }).then(result => result)
//     .catch(e => LOG(e))
//     var promise_d = new Promise((resolve,reject) =>{
//         ModOper_annual_member.draw_family_d(prize_id,function(result){
//             resolve(result)
//         })
//     }).then(result => result)
//     .catch(e => LOG(e))
//     Promise.all([promise_p,promise_d]).then(result =>{
//         var arr = flatten(result)
//         function flatten(arr){
//             return [].concat(...arr.map(x => Array.isArray(x) ? flatten(x) : x))// 多维数组编一维数组 flatten() 数组平铺
//         }
//         res.send(arr)
//         console.log(arr)
//     }).catch(e => LOG(e))
// }
this.draw_update_f = function(req,res){
    var prize_id = req.body.prize_id,
        signIn_id = req.body.signIn_id
        ModOper_annual_member.check_family(signIn_id,function(result){
            if(result.length > 0){
                var openid = result[0].open_id
                ModOper_annual_member.draw_update_f(prize_id,signIn_id,openid,function(result){
                    res.send({
                        code:200,
                        msg:'更新成功',
                    })
                })
            }else{
                res.send({
                    code:404,
                    msg:'暂无此抽奖号'
                })
            }
        })
    
}
this.audit_list = function(req,res){
    var params = url.parse(req.url,true).query
    var page = params.page?Number(params.page):1
    var pageSize = params.pageSize?Number(params.pageSize):10
    ModOper_annual_member.audit_list(page,pageSize,function(result1){
        ModOper_annual_member.audit_list_total(function(result){
            // for(let i = 0; i < result1.length; i++){
            //     if(result1[i].status == 1){
            //         result1[i].status = '通过'
            //     }else if(result1[i].status == 0){
            //         result1[i].status = '不通过'
            //     }else{
            //         result1[i].status = '待审核'
            //     }
            // }
            res.send({
                result1:result1,
                result:result[0]['COUNT(*)']
            })
        })
    })
}
this.audit_update = function(req,res){
    var openid = req.body.openid
    var status = req.body.status
    var day = new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds();
    var year = new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate()
    var time = year +' '+ day;
    ModOper_annual_member.audit_update(openid,status,time,function(result){
        res.send({
            code:200,
            msg:'更新成功',
        })
    })
}
this.authority_list = function(req,res){
    ModOper_annual_member.authority_list(function(result){
        new Promise((resolve,reject) =>{
            resolve()
        }).then(() =>{
            for(let i = 0; i < result.length; i++){
                if(result[i].status == 1){
                    result[i].status = true
                }else if(result[i].status == 0){
                    result[i].status = false
                }
            }
        }).then(() =>{
            res.send(result)
        })
    })
}
this.authority = function(req,res){
    var obj = req.body.value
    if(obj.status == false){
        obj.status = 0
    }else if(obj.status == true){
        obj.status = 1
    }
    ModOper_annual_member.authority(obj,function(result){
        res.send({
            code:200,
            msg:'更新成功'
        })
    })
}
this.news = function(req,res){
    var news = req.body.news
    var time = req.body.time
    ModOper_annual_member.news(news,time,function(result){
        ModOper_annual_member.news_num(function(news_num){
             res.send({
                 code:200,
                 msg:'更新成功'
             })
        })
    })
}
this.news_list = function(req,res){
    ModOper_annual_member.news_list(function(result){
        // new Promise((resolve,reject) =>{
            for(let i = 0; i < result.length; i++){
                result[i].news_time = base.formatDate(result[i].news_time)
            }
            res.send(result)
        // })
    })
}
this.meeting = function(req,res){
    ModOper_annual_member.meeting(function(result){
        res.send(result)
    })
}
this.put_meeting = function(req,res){
    var params = req.body
    var obj = {
        start_time:base.formatDate(params.start_time),
        place:params.place,
        note:params.note,
        meeting_status:params.meeting_status,
        lat:params.LatLng.lat,
        lng:params.LatLng.lng
    }
    ModOper_annual_member.put_meeting(obj,function(result){
        res.send({
            code:200,
            msg:'更新成功'
        })
    })
}