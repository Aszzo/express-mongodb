var mongoose = require('mongoose');
var UserSchema = require('../schemas/user.js');
var User = mongoose.model('users',UserSchema);

module.exports = User;