#���ÿͻ������ӷ������˱���
SET NAMES UTF8;
#�������ݿ⣬�������
DROP DATABASE IF EXISTS CATE;
#�������ݿ⣬���ô洢�ı���
CREATE DATABASE CATE CHARSET=UTF8;
#��������ݿ�
USE CATE;
#�����û���
CREATE TABLE cate_user(
  uid TINYINT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(8) UNIQUE,
  upwd  varchar(6) not null,
  phone varchar(11),
  email varchar(6)
);
#��������
INSERT INTO cate_user VALUES(1,'12345678','123456','12345678901','aaa@qq.com');
INSERT INTO cate_user VALUES(2,'87654321','123456','12345678901','aaa@qq.com');
INSERT INTO cate_user VALUES(3,'12332112','123456','12345678901','aaa@qq.com');
INSERT INTO cate_user VALUES(4,'12365487','123456','12345678901','aaa@qq.com');
INSERT INTO cate_user VALUES(5,'12345687','123456','12345678901','aaa@qq.com');
