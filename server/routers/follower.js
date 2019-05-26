let express = require('express');
let router = express.Router();
let Follower = require('../models/follower');

//关注别人
router.post('/addfoll',(req,res) =>{
    let username = req.body.username;
    let followername = req.body.followername;
    let createTime = req.body.createTime;
    let status = req.body.status;
    //用户是否有关系
    Follower.findOne({
        username:followername,
        followername:username
    }).then((data)=>{
        if(data){
            //假设有联系，
            if(data.status&& status){
                Follower.update({
                   username:username,
                   followername:followername,
                   createTime:createTime,
                   status:3
               }).save().then((msg) => {
                    responseData.code = 3;
                    responseData.msg = '互关成功';
                    res.json(responseData);
                    return;
               })
           }else{
               Follower.update ({
                   username:username,
                   followername:followername,
                   createTime:createTime,
                   status:status
               }).save().then((res) => {
                    responseData.code = status ? 1:0;
                    responseData.msg = status ? '关注成功':'取关成功';
                    res.json(responseData)
               })
           }
        }else{
            let follower = new Follower({
                username:username,
                followername:followername,
                createTime:createTime,
                status:1
            })
            return follower.save();
        }
    }).then((data) => {
        responseData.code = 1;
        responseData.msg = '关注成功';
        res.json(responseData)
    })
    
})
//获取关注列表
router.get('/getfolllist',(req,res) => {
    let username = req.body.username;
    Follower.findOne({
        username:username,
        status:2||3
    }).then((data) => {
        res.json({
            code:1,
            list:data
        })
    })
})
//获取粉丝列表
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