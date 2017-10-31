var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var db = mongoose.connect("mongodb://192.168.32.129:27017/user");
var dateFormat = require('dateformat');
const format = "yyyy-mm-dd,HH:MM:ss";
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});

db.connection.on("open", function () {
    console.log("数据库连接成功");
});
var UserSchema = new mongoose.Schema({
    user:{
        unique:true,
        type: String
    },
    password:String,
    meta:{
        createAt:{
            type:String,
            default:dateFormat(new Date(),format)
        },
        updateAt:{
            type:String,
            default:dateFormat(new Date(),format)
        }
    }
});
// movieSchema.pre 表示每次存储数据之前都先调用这个方法
UserSchema.pre('save', function(next) {
    var user = this;
    console.log(this.isNew,"123456",Date.now())
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = dateFormat(new Date(),format);
    }else {
        this.meta.updateAt = dateFormat(new Date(),format);
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next()
        })
    })
});
UserSchema.methods = {
    comparePassword: function(_password, cb){
        bcrypt.compare(_password, this.password, function(err, isMatch){
            if(err) return cb(err)
            cb(null, isMatch)
        })
    }
}

// movieSchema 模式的静态方法
UserSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
};
module.exports = UserSchema;