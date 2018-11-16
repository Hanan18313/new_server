
this.member_list = function(pageNum,pageSize,callback){
    var startPage = Number((pageNum-1)*pageSize)
    let str = 'SELECT * FROM member INNER JOIN  member_signIn ON member.unionid = member_signIn.unionid limit '+startPage+','+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.member_total = function(callback){
    let str = 'SELECT COUNT(*) FROM member';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.search_member = function(data,callback){
    let str =  'SELECT * FROM member INNER JOIN  member_signIn ON member.unionid = member_signIn.unionid WHERE member.name LIKE "%'+data+'%" OR member_signIn.signIn_id LIKE "%'+data+'%"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.member_update = function(id,signIn_id,isLunch,callback){
    let str = 'UPDATE member_signin SET signIn_id = "'+signIn_id+'",is_lunch = "'+isLunch+'" WHERE id = "'+id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this