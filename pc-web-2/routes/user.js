const express = require('express');
const mysql = require('../pool.js');   //引入mysql连接模块
var router = express.Router();    //创建路由对象
const pool = require("../pool.js");


/*
router.get('/detail',(req,res)=>{
    var obj = req.query;
//验证uid是否为空
var $uid = obj.uid;
if(!$uid){
    res.send({code:401,msg:'uid required'});
    return;
}
pool.query(' SELECT * FROM xz_user WHERE uid = ?',[$uid],(err,result)=>{
    if(err) throw err;
if(result.length>0){
    res.send(result);
}else{
    res.send({code:301,msg:'can not find'});
}
});
});

//用户注册
router.post('/reg',(req,res)=>{
    var obj = req.body;

//验证数据是否为空
if(!obj.uname){
    res.send({code:401,msg:'uname required'});
    return;
}
if(!obj.upwd){
    res.send({code:402,msg:'upwd required'});
    return;
}
if(!obj.email){
    res.send({code:403,msg:'email required'});
    return;
}
if(!obj.phone){
    res.send({code:404,msg:'phone required'});
    return;
}

pool.query('insert into xz_user set ?',[obj],(err,result)=>{
    if(err) throw err;
if(result.affectedRows>0){
    res.send({code:200,msg:'reg suc'});
};
});
});
*/
/*注册*/
router.post('/signin',(req,res)=>{
    var obj = req.body;
    var str="insert into cate_user(uname,upwd,phone,email) values(?,?,?,?)";
    pool.query(str,[obj.uname,obj.upwd,obj.phone,obj.email],(err,result)=>{
        if(err) throw err;
        res.send({code:200,msg:result.affectedRows});
        return;
    });
});


/*登录*/
router.post('/login',(req,res)=>{
    var $uname = req.body.uname;
    var $upwd = req.body.upwd;
    if(!$uname){
        res.send({code:404,msg:'uname id null'});
        return;
    }
    if(!$upwd){
        res.send({code:404,msg:'upwd id null'});
        return;
    }
    var str="select uid,uname,phone,email from cate_user where uname=? and upwd=?";
    pool.query(str,[$uname,$upwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:200,msg:result[0]});
        }else{
            res.send({code:404,msg:'data is null'});
        }
    });
});


/*查询*/
router.get('/queryUser',(req,res)=>{
    var uname = req.query.uname;
    //验证uid是否为空
    if(!uname){
        res.send({code:401,msg:'uname required'});
        return;
    }
    pool.query(' SELECT * FROM cate_user WHERE uname = ?',[uname],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:200,msg:1});
        }else{
            res.send({code:200,msg:0});
        }
    });
});
module.exports = router;  //到处路由对象
