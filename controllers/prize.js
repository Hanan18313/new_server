var ModPrize = require('../model/prize.js');
var url = require('url')
var fs = require('fs')
var Path = require('path')
var Promise = require('promise')
global.CONFIG = JSON.parse(fs.readFileSync('./config.json').toString());

this.prize_list = function(req,res){
    var params = url.parse(req.url,true).query
    var pageNum = params.pageNum;
    var pageSize = params.pageSize
    var imgUrl = CONFIG.imgUrl
    ModPrize.prize_list(pageNum,pageSize,function(result1){
        ModPrize.prize_total(function(result){
            var arr = []
            for(let i = 0; i < result1.length; i++){
                result1[i].imgUrl = imgUrl+result1[i].imgUrl
                arr.push(result1)
            }
            res.send({
                result1 : arr[0],
                result : result[0]['COUNT(*)']
            })
        })
    })
}
this.prize_info = function(req,res){
    var prize_id = url.parse(req.url,true).query.prize_id
    ModPrize.prize_info(prize_id,function(result){
        res.send(result)
    })
}
this.upload = function(req,res){
    var findPath= String(req.files[0].destination).match(/images/g) + '/' + req.files[0].filename + Path.parse(req.files[0].originalname).ext;
    var filePath = req.files[0].destination + '/' + req.files[0].filename + Path.parse(req.files[0].originalname).ext;
    var filename =req.files[0].filename + Path.parse(req.files[0].originalname).ext;
    fs.rename(req.files[0].path,filePath,function(err,data){
        if(err){
            LOG(err)
        }else{
            res.send(filename);
        }
    })
}
this.prize_add = function(req,res){
    var prize_name = req.body.data.prize_name;
   // var prize_id = req.body.data.prize_id
    var price = req.body.data.price;
    var prize_info = req.body.data.prize_info;
    var imgUrl = req.body.data.imgUrl;
    var number = req.body.data.number;
    if(Number(number) == 1){
        //new Promise((resolve,reject) => {
            ModPrize.prize_add(prize_name,price,prize_info,imgUrl,function(result){
                 res.send(result)
                //resolve(result)
             })
      //  })
        // .then(() =>{
        //     ModPrize.draw_add(function(result){
        //         resolve(result)
        //     })
        // }).then(result =>{
        //     console.log(result)
        //     res.send(result)
        // })
    }else{
        new Promise((resolve,reject) => {
            for(let i = 0; i< Number(number); i++){
                ModPrize.prize_add(prize_name,prize_id,price,prize_info,imgUrl,function(result){
                    resolve(result)
                })
            }
        }).then(result => {
           res.send(result)
        })
    }
}
this.prize_edit = function(req,res){
    var params = req.body
    var prize_id = params.prize_id;
    var prize_name = params.prize_name;
    var price = params.price
    var prize_info = params.prize_info
    var round = params.round
    var imgUrl = params.imgUrl
    ModPrize.prize_edit(prize_id,prize_name,price,prize_info,round,imgUrl,function(result){
        res.send(result)
    })
}
this.prize_delete = function(req,res){
    var prize_id = req.body.prize_id
    ModPrize.prize_delete(prize_id,function(result){
        res.send(result)
    })
}