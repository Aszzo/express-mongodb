var express = require('express');
var router = express .Router();
var app = express();
var index = require('./routes/index');
var users = require('./routes/users');
var sign = require('./routes/sign');
// 此处加载的中间件也可以自动更新
router.use(express.static('public'));

app.use('/', index);
app.use('/users', users);
app.use('/sign', sign);

module.exports = router;