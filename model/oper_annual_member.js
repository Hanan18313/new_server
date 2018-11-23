
this.login = function(user_name,callback){
    let str = 'SELECT * FROM employee WHERE user_id = "'+user_name+'" OR user_name = "'+user_name+'"';
    CONN(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}

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
this.draw_empolyee_list = function(callback){
    let str = 'SELECT * FROM annual_member LEFT JOIN annual_draw ON annual_member.open_id = annual_draw.open_id WHERE annual_member.category = "1"'
    //let str = 'SELECT * FROM annual_member';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.draw_empolyee_list_d = function(open_id,callback){
    let str = 'SELECT * FROM annual_draw WHERE open_id = "'+open_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.draw_empolyee_get = function(id,callback){
    let str = 'SELECT * FROM annual_member WHERE RIGHT(phone,4) = "'+id+'" ';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.draw_empolyee_prize = function(prize_id,callback){
    let str = 'SELECT * FROM annual_prize WHERE id = "'+prize_id+'" ';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.draw_empolyee_update_prize = function(prize_id,open_id,callback){
    let str = 'UPDATE annual_draw SET open_id = "'+open_id+'" WHERE prize_id = "'+prize_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.draw_empolyee_prize_get = function(open_id,callback){
    let str = 'SELECT * FROM annual_draw INNER JOIN annual_prize ON annual_draw.prize_id = annual_prize.id WHERE annual_draw.open_id = "'+open_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.draw_family_list = function(category,callback){
    if(category == 2){
        let categorys = '家属类'
        let str = 'SELECT * FROM annual_prize INNER JOIN annual_draw ON annual_prize.id = annual_draw.prize_id WHERE annual_prize.prize_class = "'+categorys+'"';
        CON(str,function(err,result){
            if(err){
                LOG(err)
            }else{
                callback(result)
            }
        })
    }
}
this.draw_family_w = function(open_id,callback){
    let str = 'SELECT * FROM annual_member WHERE open_id = "'+open_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.draw_family_prize = function(prize_id,callback){
    let str = 'SELECT * FROM annual_prize WHERE id = "'+prize_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.draw_family_d = function(prize_id,callback){
    let str = 'SELECT * FROM annual_draw WHERE prize_id = "'+prize_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            var signIn_id = result[0].signIn_id
            if(signIn_id != null){
                let str = 'SELECT * FROM annual_signIn WHERE signIn_id = "'+signIn_id+'"'
                CON(str,function(err,result){
                    if(err){
                        LOG(err)
                    }else{
                        var open_id = result[0].open_id
                        let str = 'SELECT * FROM annual_member WHERE open_id = "'+open_id+'"'
                        CON(str,function(err,result){
                            if(err){
                                LOG(err)
                            }else{
                                callback(result)
                            }
                        })
                    }
                })
            }else{
                callback(null)
            }
        }
    })
}
this.draw_update_f = function(prize_id,signIn_id,callback){
    let str = 'UPDATE annual_draw SET signIn_id = "'+signIn_id+'" WHERE prize_id = "'+prize_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })   
}
