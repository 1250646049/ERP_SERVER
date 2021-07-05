"use strict";

var express = require("express");

var app = express();

var cors = require("cors");

var _require = require("./db/sqlService/yinshoukuan003"),
    selectOrders = _require.selectOrders,
    selectOrdersLike = _require.selectOrdersLike,
    selectcNewsOrders = _require.selectcNewsOrders; // app.all("*", function(req, res, next) {
//     if (!req.get("Origin")) return next();
//      // use "*" here to accept any origin
//      res.set("Access-Control-Allow-Origin",req.headers.origin);  
//      res.set("Access-Control-Allow-Methods", "GET");
//      res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//      res.header('Access-Control-Allow-Credentials', 'true');
//      // res.set('Access-Control-Allow-Max-Age', 3600);
//      if ("OPTIONS" === req.method) return res.sendStatus(200);
//      next();
// });
// 查询订单数量 应收账款超期自动提醒


app.get("/selectYinshou", function _callee(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(selectcNewsOrders());

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
            message: "抱歉，查询失败！"
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.get("/searchYinshou", function _callee2(req, resp) {
  var _req$query, type, search, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$query = req.query, type = _req$query.type, search = _req$query.search;
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