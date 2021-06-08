"use strict";

var express = require("express");

var app = express();
app.listen(3010, function (err, data) {
  if (!err) {
    console.log("http://localhost:3010服务启动成功！");
  }
});