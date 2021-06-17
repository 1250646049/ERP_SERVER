"use strict";

var express = require("express");

var path = require("path");

var session = require("express-session");

var app = express();

var Socket = require("socket.io"); // 引入路由


var UserLogin = require("./router/user/userLogin");

var WuliuRouter = require("./router/wuliu/wuliuRouter");

var CommonRouter = require("./router/common/commonRouter");

var PriceRouter = require("./router/price/bijiaRouter");

var WanglaiRouter = require("./router/wanglai/wanglai");

var ExamRouter = require("./router/fuzhu/examRouter"); // 引入应收款路由


var YinshouRouter = require("./router/price/yinshouRouter");

var cors = require("cors"); // 解析 body


app.use(express.urlencoded({
  extended: true
})); // 设置静态文件目录

app.use(express["static"](path.join(__dirname, "public"))); //  引入跨域
// app.all("*", function(req, res, next) {
//     if (!req.get("Origin")) return next();
//      // use "*" here to accept any origin
//      res.set("Access-Control-Allow-Origin",req.headers.origin);  
//      res.set("Access-Control-Allow-Methods", "GET");
//      res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//      res.header('Access-Control-Allow-Credentials', 'true');
//      // res.set('Access-Control-Allow-Max-Age', 3600);
//      if ("OPTIONS" === req.method) return res.sendStatus(200);
//      next(); 
// 设置session    

app.use(session({
  secret: 'erpsystem',
  name: 'testapp',
  cookie: {
    maxAge: 5 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true
}));
app.listen(3008, function (err) {
  if (!err) {
    console.log("监听3008端口成功：http://localhost:3008");
    app.use(UserLogin);
    app.use(WuliuRouter);
    app.use(CommonRouter);
    app.use(PriceRouter);
    app.use(WanglaiRouter);
    app.use(YinshouRouter);
    app.use(ExamRouter);
  }
});