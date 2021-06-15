"use strict";

var express = require("express");

var app = express();

var _require = require("./db/sqlService/yinshoukuan003"),
    selectOrders = _require.selectOrders,
    selectOrdersLike = _require.selectOrdersLike; // 查询订单数量 应收账款超期自动提醒


app.get("/selectYinshou", function _callee(req, resp) {
  var _req$query, number, type, search, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$query = req.query, number = _req$query.number, type = _req$query.type, search = _req$query.search;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(selectOrders(number, type, search));

        case 4:
          result = _context.sent;
          resp.json(result);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          resp.json({
            status: 0,
            message: "抱歉，查询失败！"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
app.get("/searchYinshou", function _callee2(req, resp) {
  var _req$query2, type, search, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$query2 = req.query, type = _req$query2.type, search = _req$query2.search;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(selectOrdersLike(type, search));

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
            message: "抱歉，查询失败！"
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
app.listen(3003, function (err, data) {
  if (!err) {
    console.log("http://localhost:3003服务启动成功！");
  }
});