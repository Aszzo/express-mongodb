var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/login');
});
router.post('/users', function(req, res, next) {
    var _user = req.body;
    //注册代码
    // User.findOne({user: _user.user},function(err,user){
    //     if(err){
    //         console.log(err)
    //     }
    //     if (user) {
    //         return res.redirect('/')
    //     } else {
    //         var user = new User(_user)
    //         user.save(function (err) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             res.redirect('/')
    //         })
    //     }
    //})
    User.findOne({user: _user.user},function(err,user) {
        console.log(user)
        if (err) {
            console.log(err)
        }
        if (!user) {
            return res.redirect('/')
        }
        user.comparePassword(_user.password,function (err,isMatch) {
            if(err){
                console.log(err)
            }
            if(isMatch){
                console.log('密码正确')
            }else{
                console.log("密码错误")
            }
        })
    });
});
module.exports = router;
