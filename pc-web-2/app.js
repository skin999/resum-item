//引入模块
const express = require('express');   //引入express模块
const bodyParser=require('body-parser');   //引入第三方模块
const user = require('./routes/user.js');    //引入路由器user.js


var server=express();  //创建服务器
server.listen(8080);    //设置端口
server.use(bodyParser.urlencoded({
    extended:false  //不使用第三方的qs模块，会使用querystring模块将查询字符串解析为对象
}))


server.use(express.static('public'));  //托管静态资源到public文件夹下

server.use('/user',user);   //把user挂载到特定的前缀

