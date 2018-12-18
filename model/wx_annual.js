
this.setUserInfo = function(obj,callback){
    let str = 'INSERT INTO annual_basic(unionid,open_id,name,phone,category,status,portrait) VALUE("'+obj.unionid+'","'+obj.openid+'","'+obj.name+'","'+obj.phone+'","1","1","'+obj.avatarUrl+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.setUserInfo_f = function(openid,avatarUrl,callback){
    let str = 'INSERT INTO annual_basic(open_id,category,portrait) VALUE("'+openid+'","2","'+avatarUrl+'")';
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
    let str = 'SELECT * FROM annual_basic WHERE open_id = "'+openid+'"';
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
    let str = 'UPDATE annual_basic SET name = "'+obj.name+'", family_name = "'+obj.family_name+'", phone = "'+obj.phone+'", status = "'+obj.status+'" WHERE open_id = "'+obj.openid+'" ';
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
this.notice_msg = function(obj,callback){
    let str = 'INSERT INTO annual_record(open_id,avatarUrl,title,content,date,status) VALUE("'+obj.openid+'","'+obj.avatarUrl+'","'+obj.title+'","'+obj.content+'","'+obj.date+'","1")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.notice = function(callback){
    let str = 'SELECT * FROM annual_record INNER JOIN annual_basic ON annual_record.open_id = annual_basic.open_id ORDER BY date desc limit 10';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.single_msg = function(openid,callback){
    let str = 'SELECT * FROM annual_record WHERE open_id = "'+openid+'" ORDER BY date desc limit 1';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.authority= function(obj,callback){
    let str = 'SELECT * FROM authority WHERE open_id = "'+obj.openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    }) 
}
this.Self_update = function(){
    let  str = 'UPDATE annual_record SET status = "0"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }
    }) 
}
