//奖品list
this.prize_list = function(pageNum,pageSize,callback){
    var startPage = Number((pageNum-1)*pageSize)
    let str = 'SELECT * FROM annual_prize limit '+startPage+','+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.prize_total = function(callback){
    let str = 'SELECT COUNT(*) FROM annual_prize';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.prize_info = function(prize_id,callback){
    let str = 'SELECT * FROM annual_prize WHERE id = "'+prize_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.prize_add = function(prize_name,price,prize_info,imgUrl,callback){
    let str = 'INSERT INTO annual_prize(prize_name,price,prize_info,imgUrl,prize_class) VALUE("'+prize_name+'","'+price+'","'+prize_info+'","'+imgUrl+'","员工类")';
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
    let str = 'INSERT INTO annual_draw(prize_id) VALUE("'+prize_id+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.prize_edit = function(prize_id,prize_name,price,prize_info,prize_class,imgUrl,callback){
    let str = 'UPDATE annual_prize SET prize_name = "'+prize_name+'",price = "'+price+'", prize_class = "'+prize_class+'",prize_info = "'+prize_info+'",imgUrl = "'+imgUrl+'" WHERE id = "'+prize_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.prize_delete = function(prize_id,callback){
    let str = 'DELETE FROM annual_prize WHERE id = "'+prize_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}