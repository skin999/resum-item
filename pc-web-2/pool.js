const mysql = require('mysql');  //引入mysql模块

var pool = mysql.createPool({  //创建连接池对象
    host:'127.0.0.1',   //数据库服务器IP
    prot:'3306',   //端口
    user:'root',    //用户名
    password:'',    //密码
    database:'CATE',   //要使用的数据库
    connectionLimit:20   //设置连接池的数量，默认15
});

module.exports = pool;