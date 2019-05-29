let express = require('express');
let router = express.Router();
let Follower = require('../models/follower');
let responseData;
//关注别人
router.post('/addfoll',(req,res) =>{
    let username = req.body.username;
    let followername = req.body.followername;
    let createTime = req.body.createTime;
    // //用户是否有关系
    //重新整理思路
    //首先先看看有没有自己关注锅人家
    //很尴尬因为时间原因吧互相关注去掉
    Follower.findOne({
        username:username,//关注者
        followername:followername//被关注者
    }).then((data) => {
        if(data){
            if(!data.status){
                console.log(1)
                Follower.updateOne({
                    username:username
                 },{
                     createTime:createTime,
                     status:1
                 }).then(()=>{
                     res.json({
                         code:1,
                         msg:'关注成功'
                     });
                    return 0;
                 });
            }else{
                console.log(2)
                Follower.updateOne({
                    username:username,
                    followername:followername
                 },{
                     createTime:createTime,
                     status:0//取关
                 }).then(()=>{
                    res.json({
                         code:0,
                         msg:'取关成功'
                     });
                    return 0;
                 })
            }
        }else{
            console.log(3)
            let follower = new Follower({
                username:username,
                followername:followername,
                createTime:createTime,
                status:1
            })
            res.json({
                code:1,
                msg:'关注成功'
            });
            return follower.save();
        }
    })
})
//获取和别人的关系
router.post('/iffriend',(req,res) => {
    let username = req.body.username;
    let followername = req.body.followername;
    Follower.findOne({
        username:username,
        followername:followername
    }).then((data)=>{
        res.json({
            code:0,
            status:data ? data.status : 0
        });
        return;
    })
})
//获取关注列表
router.post('/getfolllist',(req,res) => {
    let username = req.body.username;
    Follower.findOne({
        username:username,
        status:1
    }).then((data) => {
        res.json(data);
        return;
    })
})
//获取粉丝列表，暂未实现
router.get('/grtfans',(req,res) => {
    let username = req.body.username;
    Follower.findOne({
        username:username,
        status:1
    }).then((data) => {
        res.json({
            code:1,
            list:data
        })
    })
})
module.exports = router;