var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var db = mongoose.connect("mongodb://192.168.32.129:27017/test");
//
// db.connection.on("error", function (error) {
//     console.log("数据库连接失败：" + error);
// });
//
// db.connection.on("open", function () {
//     console.log("数据库连接成功");
// });

var userSchema = new Schema({name: String});
var UserModal = mongoose.model('posts',userSchema);
/* GET users listing. */
router.get('/', function(req, res, next) {
    UserModal.find(function(err,persons){
        if(err){console.log(err)}
        res.json(persons)
    });
});

module.exports = router;
