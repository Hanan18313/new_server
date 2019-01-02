
this.setUserInfo = function(obj,callback){
    let str = 'INSERT INTO annual_basic(unionid,open_id,user_name,phone,category,portrait,meeting_id,news_num) VALUE("'+obj.unionid+'","'+obj.openid+'","'+obj.name+'","'+obj.phone+'","1","'+obj.avatarUrl+'","'+obj.meeting_id+'","0")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.setUserInfo_f = function(openid,avatarUrl,meeting_id,callback){
    let str = 'INSERT INTO annual_basic(open_id,category,portrait,meeting_id,news_num) VALUE("'+openid+'","2","'+avatarUrl+'","'+meeting_id+'","0")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.getEmployee = function(unionid,callback){
    let str = 'SELECT * FROM vip_basic WHERE unionid = "'+unionid+'"';
    CONN(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.checkInfo = function(openid,callback){
    let str = 'SELECT * FROM annual_basic INNER JOIN meeting ON annual_basic.meeting_id = meeting.id WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.baseUserInfo = function(openid,callback){
    let str = 'SELECT * FROM annual_basic WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.person_info = function(openid,callback){
    let str = 'SELECT * FROM annual_basic WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}

this.putUserInfo = function(obj,callback){
    let str = 'UPDATE annual_basic SET user_name = "'+obj.name+'", family_name = "'+obj.family_name+'", phone = "'+obj.phone+'",status = "'+obj.status+'" WHERE open_id = "'+obj.openid+'" ';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.goBack = function(openid,callback){
    let status = 4
    let str = 'UPDATE annual_basic SET status = "'+status+'" WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
//年会前
this.join = function(status,openid,callback){
    let str = 'UPDATE annual_basic SET status = "'+status+'" WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.join_status = function(openid,callback){
    let str = 'SELECT * FROM annual_basic WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.subscribe = function(page,pageSize,callback){
    var startPage = Number((page-1)*pageSize);
    let str = 'SELECT * FROM annual_basic WHERE status = "1" limit '+startPage+','+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.before_pool = function(callback){
    let str = 'SELECT * FROM annual_prize';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.search_sub = function(value,callback){
    let str = 'SELECT * FROM annual_basic WHERE user_name LIKE "%'+value+'%" AND status = "1"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.read_news = function(callback){
    let str = 'SELECT * FROM annual_news';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.basicRead_time = function(openid,read_time,callback){
    let str = 'UPDATE annual_basic SET read_time = "'+read_time+'", news_num = "0" WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
//参加年会人员统计
this.person_total = function(openid,callback){
    let str = 'SELECT id FROM annual_basic WHERE open_id = "'+openid+'" AND status = "1"';
    //let str = 'SELECT * FROM annual_basic'
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.person_class = function(callback){
    let str = 'SELECT * FROM annual_basic';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
//自动年会状态
this.meeting_status = function(status){
    let str = 'UPDATE meeting SET meeting_status = "'+status+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }
    })
}
this.meeting_info = function(callback){
    let str = 'SELECT * FROM meeting';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
//年会中模块
this.signIn = function(obj,callback){
    let str = 'INSERT INTO annual_member(name,phone,open_id,portrait,signIn_time,category) VALUE("'+obj.name+'","'+obj.phone+'","'+obj.openid+'","'+obj.portrait+'","'+obj.signIn_time+'","'+obj.category+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            let str = 'INSERT INTO annual_signIn(signIn_id,open_id) VALUE("'+obj.signIn_id+'","'+obj.openid+'")'
            CON(str,function(err,result){
                if(err){
                    LOG(err)
                }else{
                    callback(result)
                }
            })
        }
    })
}
this.check_signIn = function(openid,callback){
    let str = 'SELECT * FROM annual_member INNER JOIN annual_signIn ON annual_member.open_id = annual_signIn.open_id WHERE annual_member.open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.cen_person_info = function(openid,callback){
    let str = 'SELECT * FROM annual_member INNER JOIN annual_signIn ON annual_member.open_id = annual_signIn.open_id WHERE annual_member.open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.prize_pool = function(callback){
    //let str = 'SELECT * FROM annual_prize LEFT JOIN annual_draw ON annual_prize.id = annual_draw.prize_id INNER JOIN annual_member ON annual_draw.open_id = annual_member.open_id';
    let str = 'SELECT * FROM annual_draw INNER JOIN annual_member ON annual_draw.open_id = annual_member.open_id RIGHT JOIN annual_prize ON annual_prize.id = annual_draw.prize_id';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.pool_draw = function(callback){
    let str = 'SELECT * FROM annual_draw';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.draw_prize = function(callback){
    let str = 'SELECT * FROM annual_prize INNER JOIN annual_draw ON annual_prize.id = annual_draw.prize_id';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.draw_member = function(callback){
    let str = 'SELECT * FROM annual_member INNER JOIN annual_draw ON annual_member.open_id = annual_draw.open_id';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.attendee = function(page,pageSize,category,callback){
    var startPage = Number((page-1)*pageSize)
    let str = 'SELECT * FROM annual_member INNER JOIN annual_signIn ON annual_member.open_id = annual_signIn.open_id WHERE category = "'+category+'" limit '+startPage+','+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.search_attendee = function(value,category,callback){
    let str = 'SELECT * FROM annual_member INNER JOIN annual_signIn ON annual_member.open_id = annual_signIn.open_id WHERE annual_member.name LIKE "%'+value+'%" AND category = "'+category+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
//年会后模块
this.over_view = function(openid,callback){
    let str = 'SELECT * FROM evoluation INNER JOIN annual_member ON evoluation.open_id = annual_member.open_id';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.over_submit = function(params,callback){
    let str = 'INSERT INTO evoluation (open_id,content,portrait) VALUE("'+params.openid+'","'+params.content+'","'+params.portrait+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.winner_list = function(callback){
    let str = 'SELECT * FROM annual_draw INNER JOIN annual_member ON annual_draw.open_id = annual_member.open_id LEFT JOIN annual_prize ON annual_draw.prize_id = annual_prize.id'
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}