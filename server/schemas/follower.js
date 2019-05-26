let express = require('express');

let mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    //关注列表
    username:String,
    followName:String,
    status:Number,//0-为关注，1-粉丝，2-已关注，3-互相关注
    createTime:{
        type:Date,
        default:Date.now
    },
    modifyTime:{
        type:Date,
        default:Date.now
    }
});