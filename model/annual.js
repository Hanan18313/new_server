
this.getUserInfo = function(openid,callback){
    let str = 'SELECT * FROM annual_vip_basic WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.get_vip_basic = function(unionid,callback){
    let str = 'SELECT * FROM vip_basic WHERE unionid = "'+unionid+'"';
    CONN(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
//信息登记
this.add_annual_vip_basic = function(name,phone,company,openid,portrait,callback){
    let str = 'INSERT INTO annual_vip_basic(name,phone,open_id,portrait,company) VALUE("'+name+'","'+phone+'","'+openid+'","'+portrait+'","'+company+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.add_annual_member = function(name,phone,openid,portrait,company,signIn_time,category,callback){
    let str = 'INSERT INTO annual_member(name,phone,open_id,portrait,company,signIn_time,category) VALUE("'+name+'","'+phone+'","'+openid+'","'+portrait+'","'+company+'","'+signIn_time+'","'+category+'")'
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            let str = 'INSERT INTO annual_signIn(open_id) VALUE("'+openid+'")';
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
this.get_annual_vip_basic = function(openid,callback){
    let str = 'SELECT * FROM annual_vip_basic WHERE open_id="'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.get_annual_member = function(openid,callback){
    let str = 'SELECT * FROM annual_member INNER JOIN  annual_signIn ON annual_member.open_id = annual_signIn.open_id WHERE annual_member.open_id="'+openid+'"';
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
    let str = 'SELECT * FROM annual_member RIGHT JOIN annual_signin ON annual_member.open_id = annual_signIn.open_id limit '+startPage+','+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.center_search_attendee = function(value,callback){
    let str = "SELECT * FROM annual_member INNER JOIN annual_signIn ON annual_member.open_id = annual_signIn.open_id WHERE annual_member.name LIKE '%"+value+"%' OR annual_member.company LIKE '%"+value+"%'";
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