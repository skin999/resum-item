const express=require('express');
//引入MySQL连接模块
const pool=require('../pool.js');//../代表上一级
//使用express来创建路由器对象
var router=express.Router();
//往路由器添加路由
//1.检索用户
router.get('/detail',(req,res)=>{
	var obj=req.query;
	//验证uid是否为空
	var $uid=obj.uid;
	if (!$uid)//如果为空
	{
		res.send({code:401,msg:'uid required'});
		//阻止往回执行
		return;
	}
	//res.send('这是用户详情');
	//查询uid对应的数据
	pool.query('select * from xz_user where uid=?',[$uid],(err,result)=>{
		if(err) throw err;
		//如果返回的数组长度大于0，说明找到了该用户，把数据响应到浏览器；否者长度等于0，说明没有找到用户，响应一个对象
		if (result.length>0)
		{
			res.send(result);
		}else{
			res.send({code:301,msg:'can not find'});
		}
		console.log(result);
	});
});
//2.用户注册
router.post('/reg',(req,res)=>{
	var obj=req.body;
	//验证数据是否为空
	if (!obj.user_name)
	{
		res.send({code:401,msg:'uname required'});
		return;
	}
	if (!obj.upwd)
	{
		res.send({code:402,msg:'upwd required'});
		return;
	}
	if (!obj.email)
	{
		res.send({code:403,msg:'email required'});
		return;
	}
	if (!obj.phone)
	{
		res.send({code:404,msg:'phone required'});
		return;
	}
	pool.query('insert into xz_user set ?',[obj],(err,result)=>{
		if(err) throw err;
		if (result.affectedRows>0)
		{
			res.send({code:200,msg:'reg success'});
		}
	});
});
//3.用户登录
router.post('/login',(req,res)=>{
	var obj=req.body;
	//验证数据是否为空
	if (!obj.uname)
	{
		res.send({code:401,msg:'uname required'});
		return;
	}
	if (!obj.upwd)
	{
		res.send({code:402,msg:'upwd required'});
		return;
	}
	pool.query('select * from xz_user where uname=? and upwd=?',[obj.uname,obj.upwd],(err,result)=>{
		if(err) throw err;
		//如果数组长度为0，登录成功；否者等于0，登录失败
		if (result.length>0)
		{
			res.send({code:200,msg:'login success'});
		}else{
			res.send({code:301,msg:'upwd err'});
		}
	});
});
//4.用户修改
router.post('/update',(req,res)=>{
	var obj=req.body;
	//console.log(obj);
	//res.send(obj);
	//遍历对象的属性来批量验证是否为空
	var i=400;//错误集从400开始
	for (var key in obj)
	{
		i++;
		//console.log(obj[key]);
		//验证obj[key]是否为空，如果为空，响应对象
		if (!obj[key])
		{	//如果属性值为空，说明属性名是必须的
			res.send({code:i,msg:key+' required'});
			return;
		}
	}
	//res.send('修改成功');
  /*if (!obj.uid)
	{
		res.send({code:401,msg:'uid required'});
		return;
	}
	if (!obj.email)
	{
		res.send({code:402,msg:'email required'});
		return;
	}
	if (!obj.phone)
	{
		res.send({code:403,msg:'phone required'});
		return;
	}
	if (!obj.user_name)
	{
		res.send({code:404,msg:'user_name required'});
		return;
	}
	if (!obj.sex)
	{
		res.send({code:405,msg:'sex required'});
		return;
	}*/
	pool.query('update xz_user set email=?,phone=?,user_name=?,gender=? where uid=?',[obj.email,obj.phone,obj.user_name,obj.gender,obj.uid],(err,result)=>{
		if(err) throw err;
		if (result.affectedRows>0)
		{
			res.send({code:200,msg:'update success'});
		}else{
			res.send({code:301,msg:'update err'});
		}
		console.log(result);
	});
});
//5.用户列表
router.get('/list',(req,res)=>{
	var obj=req.query;
	var pno=obj.pno;
	var count=obj.count;
	//将数据转为整型
	pno=parseInt(pno);
	count=parseInt(count);
	//如果页码为空，默认值为1
	if(!pno) pno=1;
	//如果数量为空，默认值为5
	if(!count) count=5;
	//计算页面开始
	var start=(pno-1)*count;
	//执行SQL语句
	pool.query('select * from xz_user LIMIT ?,?',[start,count],(err,result)=>{
	if(err) throw err;
	res.send(result);
	});
});
//6.删除用户
router.get('/delete',(req,res)=>{
	var obj=req.query;
	if (!obj.uid)
	{
		res.send({code:401,msg:'delete required'});
		return;
	}
	pool.query('delete from xz_user where uid=?',[obj.uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0)
		{
			res.send({code:200,msg:'delete success'});
		}else
		{
			res.send({code:301,msg:'delete err'});
		}
	});
});

//把路由器对象导出
module.exports=router;  
