#设置客户端连接服务器端编码
SET NAMES UTF8;
#丢弃数据库，如果存在
DROP DATABASE IF EXISTS CATE;
#创建数据库，设置存储的编码
CREATE DATABASE CATE CHARSET=UTF8;
#进入该数据库
USE CATE;
#创建用户表
CREATE TABLE cate_user(
  uid TINYINT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(8) UNIQUE,
  upwd  varchar(6) not null,
  phone varchar(11),
  email varchar(6)
);
#插入数据
INSERT INTO cate_user VALUES(1,'12345678','123456','12345678901','aaa@qq.com');
INSERT INTO cate_user VALUES(2,'87654321','123456','12345678901','aaa@qq.com');
INSERT INTO cate_user VALUES(3,'12332112','123456','12345678901','aaa@qq.com');
INSERT INTO cate_user VALUES(4,'12365487','123456','12345678901','aaa@qq.com');
INSERT INTO cate_user VALUES(5,'12345687','123456','12345678901','aaa@qq.com');
