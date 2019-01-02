
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
this.draw_empolyee_list = function(pageNum,pageSize,callback){
    var startPage = Number((pageNum-1)*pageSize)
   //let str = 'SELECT * FROM annual_prize LEFT JOIN annual_draw ON annual_prize.id = annual_draw.prize_id LEFT JOIN annual_member ON annual_member.open_id = annual_draw.open_id WHERE annual_member.category = "1"'
   let str = 'SELECT * FROM annual_member LEFT JOIN annual_draw ON annual_member.open_id = annual_draw.open_id LEFT JOIN annual_prize ON annual_draw.prize_id = annual_prize.id WHERE annual_member.category = "1" limit '+startPage+','+pageSize
   CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}
this.draw_empolyee_total = function(callback){
    let str = 'SELECT COUNT(*) FROM annual_member WHERE category = "1"';
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
this.draw_family_list = function(callback){
    //let str = 'SELECT * FROM annual_prize INNER JOIN annual_draw ON annual_prize.id = annual_draw.prize_id WHERE annual_prize.prize_class = "家属类"';
    let str = 'SELECT * FROM annual_draw INNER JOIN annual_member ON annual_draw.open_id = annual_member.open_id RIGHT JOIN annual_prize ON annual_prize.id = annual_draw.prize_id WHERE annual_prize.prize_class = "家属类"'
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
    
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
    let str = 'SELECT * FROM annual_prize INNER JOIN annual_draw ON annual_prize.id = annual_draw.prize_id INNER JOIN annual_member ON annual_draw.open_id = annual_member.open_id WHERE annual_prize.id = "'+prize_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
    //let str = 'SELECT * FROM annual_draw WHERE prize_id = "'+prize_id+'"';
    // CON(str,function(err,result){
    //     if(err){
    //         LOG(err)
    //     }else{
    //         var signIn_id = result[0].signIn_id
    //         if(signIn_id != null){
    //             let str = 'SELECT * FROM annual_signIn WHERE signIn_id = "'+signIn_id+'"'
    //             CON(str,function(err,result){
    //                 if(err){
    //                     LOG(err)
    //                 }else{
    //                     var open_id = result[0].open_id
    //                     let str = 'SELECT * FROM annual_member WHERE open_id = "'+open_id+'"'
    //                     CON(str,function(err,result){
    //                         if(err){
    //                             LOG(err)
    //                         }else{
    //                             callback(result)
    //                         }
    //                     })
    //                 }
    //             })
    //         }else{
    //             callback(null)
    //         }
    //     }
    // })
}
this.check_family = function(signIn_id,callback){
    let str = 'SELECT * FROM annual_signIn INNER JOIN annual_member ON annual_signIn.open_id = annual_member.open_id WHERE signIn_id = "'+signIn_id+'" ';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    }) 
}
this.check_draw = function(prize_id,callback){
    let str = 'SELECT * FROM annual_draw WHERE prize_id = "'+prize_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    }) 
}
this.draw_update_f = function(prize_id,signIn_id,openid,callback){
    let str = 'UPDATE annual_draw SET signIn_id = "'+signIn_id+'",open_id = "'+openid+'" WHERE prize_id = "'+prize_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })   
}
this.audit_list = function(page,pageSize,callback){
    var startPage = Number((page-1)*pageSize)
    let str = 'SELECT * FROM annual_basic WHERE status != "4" limit '+startPage+','+pageSize;
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })  
}
this.audit_list_total = function(callback){
    let str = 'SELECT COUNT(*) FROM annual_basic WHERE status = 1';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    }) 
}
this.audit_update = function(openid,status,time,callback){
    let str = 'UPDATE annual_basic SET status = "'+status+'", pass_time = "'+time+'" WHERE open_id = "'+openid+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    }) 
}
this.authority_list = function(callback){
    let str = 'SELECT * FROM authority';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    }) 
}
this.authority = function(obj,callback){
    let str = 'UPDATE authority SET status = "'+obj.status+'" WHERE open_id = "'+obj.open_id+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    }) 
}
//发送消息
this.news = function(news,time,callback){
    let str = 'INSERT INTO annual_news (content,news_time) VALUE("'+news+'","'+time+'")';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    }) 
}
this.news_num = function(callback){
    let str = 'UPDATE annual_basic SET news_num = news_num+1';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    }) 
}
this.news_list = function(callback){
    let str = 'SELECT * FROM annual_news';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    }) 
}
this.meeting = function(callback){
    let str = 'SELECT * FROM meeting';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    }) 
}
this.put_meeting = function(obj,callback){
    let str = 'UPDATE meeting SET start_time = "'+obj.start_time+'", place = "'+obj.place+'",note = "'+obj.note+'",meeting_status = "'+obj.meeting_status+'"';
    CON(str,function(err,result){
        if(err){
            LOG(err)
        }else{
            callback(result)
        }
    })
}