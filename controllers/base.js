var url = require('url')

this.userInfo = function(req,res){
    var annual_code = url.parse(req.url,true).query.annual_code,
    exhibition_code = url.parse(req.url,true).query.exhibition_code,
    alumni_code = url.parse(req.url,true).query.Sh_code,
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
    }else if(value == 'alumni'){
        WX_ID_Alumni(alumni_code,function(result){
            res.send(result)
        })
    }
}