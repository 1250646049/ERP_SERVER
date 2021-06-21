"use strict";

var express = require("express");

var app = express(); // 导入操作数据库资源

var _require = require("./db/sqlService/salaryService"),
    selectAllNews = _require.selectAllNews,
    DeleteContent = _require.DeleteContent,
    updateWorkshop = _require.updateWorkshop,
    addWorkshop = _require.addWorkshop; // 设置允许解析body
// 解析 body


app.use(express.urlencoded({
  extended: true
})); // 查询所有基础内容

app.get("/salary/selectAllNews", function _callee(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(selectAllNews());

        case 3:
          result = _context.sent;
          resp.json(result);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          resp.json({
            status: 0,
            message: "查询失败！"
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 拼接sql 删除内容

app.get("/salary/deleteContent", function _callee2(req, resp) {
  var _req$query, data, type, code, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$query = req.query, data = _req$query.data, type = _req$query.type, code = _req$query.code;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(DeleteContent(data, type, code));

        case 4:
          result = _context2.sent;
          resp.json(result);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          resp.json({
            status: 0,
            message: "抱歉，删除失败！"
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 更新车间信息

app.post("/salary/updateWorkshop", function _callee3(req, resp) {
  var _req$body, WorkshopName, workCode, result;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, WorkshopName = _req$body.WorkshopName, workCode = _req$body.workCode;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(updateWorkshop(WorkshopName, workCode));

        case 4:
          result = _context3.sent;
          resp.json(result);
          _context3.next = 11;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          resp.json({
            status: 0,
            message: "更新失败！"
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 添加一条车间信息

app.post("/salary/addContent", function _callee4(req, resp) {
  var _req$body2, WorkshopName, bm, result;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, WorkshopName = _req$body2.WorkshopName, bm = _req$body2.bm;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(addWorkshop(WorkshopName, bm));

        case 4:
          result = _context4.sent;
          resp.json(result);
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          resp.json({
            status: 0,
            message: "添加失败"
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
app.listen(3099, function (err, data) {
  if (!err) {
    console.log("http://localhost:3099服务启动成功！");
  }
});