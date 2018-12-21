
this.setUserInfo = function(obj,callback){
    let str = 'INSERT INTO annual_basic(unionid,open_id,user_name,phone,category,status,portrait,meeting_id) VALUE("'+obj.unionid+'","'+obj.openid+'","'+obj.name+'","'+obj.phone+'","1","1","'+obj.avatarUrl+'","'+obj.meeting_id+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.setUserInfo_f = function(openid,avatarUrl,meeting_id,callback){
    let str = 'INSERT INTO annual_basic(open_id,category,portrait,meeting_id) VALUE("'+openid+'","2","'+avatarUrl+'","'+meeting_id+'")';
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
    let str = 'UPDATE annual_basic SET user_name = "'+obj.name+'", family_name = "'+obj.family_name+'", phone = "'+obj.phone+'", status = "'+obj.status+'" WHERE open_id = "'+obj.openid+'" ';
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
this.join = function(isJoin,callback){
    let str = 'UPDATE annual_basic SET isJoin = "'+isJoin+'"';
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
    let str = 'UPDATE meeting SET status = "'+status+'"';
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