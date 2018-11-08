//奖品list
this.prize_list = function(pageNum,pageSize,callback){
    var startPage = Number((pageNum-1)*pageSize)
    let str = 'SELECT * FROM prize_manage limit '+startPage+','+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.prize_total = function(callback){
    let str = 'SELECT COUNT(*) FROM prize_manage';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.prize_info = function(prize_id,callback){
    let str = 'SELECT * FROM prize_manage WHERE id = "'+prize_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.prize_add = function(prize_name,price,prize_info,imgUrl,callback){
    let str = 'INSERT INTO prize_manage(prize_name,price,prize_info,imgUrl,round) VALUE("'+prize_name+'","'+price+'","'+prize_info+'","'+imgUrl+'","第三轮")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
//抽奖表
this.draw_add = function(prize_id,callback){
    let str = 'INSERT INTO draw(prize_id) VALUE("'+prize_id+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.prize_edit = function(prize_id,prize_name,price,prize_info,round,imgUrl,callback){
    let str = 'UPDATE prize_manage SET prize_name = "'+prize_name+'",price = "'+price+'", round = "'+round+'",prize_info = "'+prize_info+'",imgUrl = "'+imgUrl+'" WHERE id = "'+prize_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.prize_delete = function(prize_id,callback){
    let str = 'DELETE FROM prize_manage WHERE id = "'+prize_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}