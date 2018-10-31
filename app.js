//引入express模块
const express = require('express');
//引入连接数据库模块
const db = require('./db');
//引入路由器模块
const router = require('./router');
//创建app应用对象
const app = express();
/*
  全局安装： npm i nodemon -g
 */

(async () => {
  await db;
  //应用路由器
  app.use(router);
})()

//监听端口号
app.listen(4000, err => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
})