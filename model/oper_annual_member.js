
this.member_list = function(pageNum,pageSize,callback){
    var startPage = Number((pageNum-1)*pageSize)
    let str = 'SELECT * FROM annual_member RIGHT JOIN annual_signIn ON annual_member.open_id = annual_signIn.open_id limit '+startPage+','+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.member_total = function(callback){
    let str = 'SELECT COUNT(*) FROM annual_member';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.search_member = function(data,callback){
    let str =  'SELECT * FROM annual_member INNER JOIN  annual_signIn ON annual_member.open_id = annual_signIn.open_id WHERE annual_member.name LIKE "%'+data+'%" OR annual_signIn.company LIKE "%'+data+'%"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.member_update = function(id,signIn_id,callback){
    let str = 'UPDATE annual_signin SET signIn_id = "'+signIn_id+'" WHERE id = "'+id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}