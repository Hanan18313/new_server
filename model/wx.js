
this.signIn = function(unionid,callback){
    let str = 'SELECT * FROM vip_basic WHERE unionid = "'+unionid+'"';
    CONN(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.member_add = function(name,unionid,phone,company,openid,signIn_time,avatarUrl,callback){
    let str = 'INSERT INTO member(name,phone,company,unionid,openid,portrait,signIn_time) VALUE("'+name+'","'+phone+'","'+company+'","'+unionid+'","'+openid+'","'+avatarUrl+'","'+signIn_time+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.member_signIn_add = function(unionid,callback){
    let str = 'INSERT INTO member_signIn(unionid) VALUE("'+unionid+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.checkSignIn = function(unionid,callback){
    let str = 'SELECT * FROM member WHERE unionid = "'+unionid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.member_info = function(unionid,callback){
    let str = 'SELECT * FROM member RIGHT JOIN member_signIn ON member.unionid = member_signIn.unionid WHERE member.unionid = "'+unionid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.attendee = function(page,pageSize,callback){
    var startPage = Number((page-1)*pageSize)
    let str = 'SELECT * FROM member RIGHT JOIN member_signIn ON member.unionid = member_signIn.unionid limit '+startPage+','+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.search_attendee = function(value,callback){
    let str = "SELECT * FROM member INNER JOIN member_signIn ON member.unionid = member_signin.unionid WHERE member.name LIKE '%"+value+"%' OR member.company LIKE '%"+value+"%'"
    //let str = "SELECT member.name,member.company,member.portrait,member_signIn.signIn_id FROM member,member_signIn WHERE member.unionid = member_signIn.unionid AND member.name LIKE '%"+value+"%' OR member.company LIKE '%"+value+"%'"
    //var str = "SELECT * FROM member WHERE name LIKE '%"+value+"%' OR company LIKE '%"+value+"%'";
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result);
        }
    })
}
this.prize_pool = function(callback){
    let str = 'SELECT * FROM prize_manage RIGHT JOIN draw ON prize_manage.id = draw.prize_id';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.isLunch = function(unionid,value,callback){
    if(value == true || value == '是'){
        let str = 'UPDATE member_signin SET is_lunch = "1" WHERE unionid = "'+unionid+'"'
        CON(str,function(err,result){
            if(err){
                LOG(err)
            }else{
                callback(result)
            }
        })
    }else if(value == false || value == '否'){
        let str = 'UPDATE member_signin SET is_lunch = "0" WHERE unionid = "'+unionid+'"';
        CON(str,function(err,result){
            if(err){
                LOG(err)
            }else{
                callback(result)
            }
        })
    }
}