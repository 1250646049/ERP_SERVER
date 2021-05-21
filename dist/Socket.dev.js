"use strict";

var SocketIo = require("./server");

var Socket = require("socket.io");

var io = Socket(SocketIo); // 设置在线用户池

var User = {};
var messageList = []; // 在线人数

var person = 0; // socket连接

io.on("connection", function (socket) {
  //    设置在线用户
  socket.on("disconnect", function () {
    console.log("dis", socket.name);
    delete User[socket.name];
    io.emit("userList", User);
    person--;
  }); // 用户登录成功通信

  socket.on("login", function (data) {
    var username = data.username,
        name = data.name,
        depart = data.depart,
        phone = data.phone,
        sex = data.sex;
    socket.name = username;
    User[username] = {
      name: name,
      depart: depart,
      phone: phone,
      sex: sex
    };
    person++; // 发布在线用户

    io.emit("userList", User); // 发送公告消息

    io.emit("message", messageList);
  }); // 发布消息

  socket.on("publish", function (data) {
    messageList.push(data);
    io.emit("message", messageList);
  });
});