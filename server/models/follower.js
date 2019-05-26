let mongoose = require('mongoose');
let followerSchema = require('../schemas/follower');

module.exports = mongoose.model('Follower',followerSchema);