const express = require('express');
const mysql = require('../pool.js');   //����mysql����ģ��
var router = express.Router();    //����·�ɶ���
const pool = require("../pool.js");


/*
router.get('/detail',(req,res)=>{
    var obj = req.query;
//��֤uid�Ƿ�Ϊ��
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

//�û�ע��
router.post('/reg',(req,res)=>{
    var obj = req.body;

//��֤�����Ƿ�Ϊ��
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
/*ע��*/
router.post('/signin',(req,res)=>{
    var obj = req.body;
    var str="insert into cate_user(uname,upwd,phone,email) values(?,?,?,?)";
    pool.query(str,[obj.uname,obj.upwd,obj.phone,obj.email],(err,result)=>{
        if(err) throw err;
        res.send({code:200,msg:result.affectedRows});
        return;
    });
});


/*��¼*/
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


/*��ѯ*/
router.get('/queryUser',(req,res)=>{
    var uname = req.query.uname;
    //��֤uid�Ƿ�Ϊ��
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
module.exports = router;  //����·�ɶ���
