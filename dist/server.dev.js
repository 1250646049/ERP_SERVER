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

var WanglaiRouter = require("./router/wanglai/wanglai"); // 解析 body


app.use(express.urlencoded({
  extended: true
})); // 设置静态文件目录

app.use(express["static"](path.join(__dirname, "public"))); // 设置session 

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
  }
});