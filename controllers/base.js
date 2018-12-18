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
this.random_code = function randomString(len) {
    　　len = len || 6;
    　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for (i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
    }
    this.formatDate =  function formatDate(time){
        var date = new Date(time);
    
        var year = date.getFullYear(),
            month = date.getMonth() + 1,//月份是从0开始的
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
        var newTime = year + '-' +
                    month + '-' +
                    day + ' ' +
                    hour + ':' +
                    min + ':' +
                    sec;
        return newTime;         
    }