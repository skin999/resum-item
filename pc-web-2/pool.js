const mysql = require('mysql');  //����mysqlģ��

var pool = mysql.createPool({  //�������ӳض���
    host:'127.0.0.1',   //���ݿ������IP
    prot:'3306',   //�˿�
    user:'root',    //�û���
    password:'',    //����
    database:'CATE',   //Ҫʹ�õ����ݿ�
    connectionLimit:20   //�������ӳص�������Ĭ��15
});

module.exports = pool;