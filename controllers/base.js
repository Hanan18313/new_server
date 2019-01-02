var url = require('url')

this.userInfo = function(req,res){
    var annual_code = url.parse(req.url,true).query.annual_code,
    exhibition_code = url.parse(req.url,true).query.exhibition_code,
    annual_signIn_code = url.parse(req.url,true).query.annual_signIn_code,
    value = url.parse(req.url,true).query.value
    if(value == 'annual'){
        WX_ID_Annual(annual_code,function(result){
            var wx_id = JSON.parse(result)
            res.send(result)
        })
    }else if(value == 'exhibition'){
        WX_ID(exhibition_code,function(result){
            var wx_id = JSON.parse(result);
            res.send(result)
            var unionid = wx_id.unionid;
            var openid= wx_id.openid;
        })
    }else if(value == 'annual_signIn'){
        WX_ID_Annual_signIn(annual_signIn_code,function(result){
            res.send(result)
        })
    }
}
/** 
 * 时间格式化
*/
this.formatDate =  function formatDate(time){
    var date = new Date(time);

    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
        if(hour < 10){
            hour = '0'+hour
        }
        if(min < 10){
            min = '0'+min
        }
        if(sec < 10){
            sec = '0'+sec
        }
    var newTime = year + '-' +
                month + '-' +
                day + ' ' +
                hour + ':' +
                min + ':' +
                sec;
    return newTime;         
}
/** 
 * 当前时间
*/
this.now_time = function Now_time(){
    var day = new Date().getHours() +':'+ new Date().getMinutes() +':'+ new Date().getSeconds();
    var year = new Date().getFullYear() +'-'+ (new Date().getMonth()+1) +'-'+ new Date().getDate()
    var signIn_time = year +' '+ day;
    return signIn_time
}
/**
 * 多维数组转换一维数组 
 * */
this.Flatten =  function flatten(arr){
    return [].concat(...arr.map(x => Array.isArray(x) ? flatten(x) : x))
}