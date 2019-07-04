//创建web服务器
const express=require('express');
//引入路由器
const userRouter=require('./routes/user.js');
//引入
const bodyParser=require('body-parser');
var server=express();
server.listen(8080);

//托管静态资源到public下
server.use(express.static('html'));
//配置中间件
server.use(bodyParser.urlencoded({
	extended:false
}));

//服务器使用
//把路由器挂载到特定的前缀 /user
//访问形式 /user/detail
server.use('/user',userRouter);










