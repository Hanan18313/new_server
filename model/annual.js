
this.getUserInfo = function(obj,callback){
    let str = 'SELECT * FROM vip_basic WHERE unionid = "'+obj.unionid+'"';
    CONN(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.add_annual_member = function(obj,callback){
    let str = 'INSERT INTO annual_member(name,phone,open_id,portrait,signIn_time,company,nick_name,category) VALUE("'+obj.name+'","'+obj.phone+'","'+obj.openid+'","'+obj.portrait+'","'+obj.signIn_time+'","'+obj.company+'","'+obj.nick_name+'","'+obj.category+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            let str = 'INSERT INTO annual_signIn(open_id) VALUE("'+obj.openid+'")';
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
this.add_annual_member_f = function(obj,callback){
    let str = 'INSERT INTO annual_member(open_id,portrait,signIn_time,nick_name,category) VALUE("'+obj.openid+'","'+obj.portrait+'","'+obj.signIn_time+'","'+obj.nickName+'","'+obj.category+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            let str = 'INSERT INTO annual_signIn(open_id) VALUE("'+obj.openid+'")';
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
    let str = 'SELECT * FROM annual_member WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}

this.center_personal = function(openid,callback){
    let str = 'SELECT * FROM annual_member INNER JOIN annual_signIn ON annual_member.open_id = annual_signIn.open_id WHERE annual_member.open_id="'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.center_attendee = function(page,pageSize,callback){
    var startPage = Number((page-1)*pageSize)
    //let str = 'SELECT * FROM member RIGHT JOIN member_signIn ON member.unionid = member_signIn.unionid limit '+startPage+','+pageSize;
    let str = 'SELECT * FROM annual_member RIGHT JOIN annual_signin ON annual_member.open_id = annual_signIn.open_id WHERE annual_member.category = "1" limit '+startPage+','+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.center_search_attendee = function(value,callback){
    let str = "SELECT * FROM annual_member INNER JOIN annual_signIn ON annual_member.open_id = annual_signIn.open_id WHERE annual_member.category = '1' AND annual_member.name LIKE '%"+value+"%' OR annual_member.company LIKE '%"+value+"%'";
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.center_attendee_family = function(page,pageSize,callback){
    var startPage = Number((page-1)*pageSize)
    //let str = 'SELECT * FROM member RIGHT JOIN member_signIn ON member.unionid = member_signIn.unionid limit '+startPage+','+pageSize;
    let str = 'SELECT * FROM annual_member RIGHT JOIN annual_signin ON annual_member.open_id = annual_signIn.open_id WHERE annual_member.category = "2" limit '+startPage+','+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.center_search_attendee_family = function(value,callback){
    let str = "SELECT * FROM annual_member INNER JOIN annual_signIn ON annual_member.open_id = annual_signIn.open_id WHERE annual_member.category = '2' AND annual_member.name LIKE '%"+value+"%' OR annual_member.company LIKE '%"+value+"%'";
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.center_prize_pool = function(round,callback){
    let str = 'SELECT * FROM  annual_prize INNER JOIN annual_draw ON annual_prize.id = annual_draw.prize_id';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.socket_userInfo = function(openid,callback){
    let str = 'SELECT * FROM annual_member WHERE open_id = "'+openid+'"'
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
//聊天记录
this.chat_record_push = function(callback){
    let str = 'SELECT * FROM chat_record';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.chat_record_pull = function(data,callback){
    let str = 'INSERT INTO chat_record (nick_name,portrait,chat_record,chat_time) VALUE("'+data.nickName+'","'+data.avatarUrl+'","'+data.content+'","'+data.date+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}