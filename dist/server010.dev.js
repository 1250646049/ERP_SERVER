"use strict";

var express = require("express");

var app = express();

var _require = require("./db/sqlService/yinshoukuan"),
    selectOrders = _require.selectOrders; // 查询订单数量 应收账款超期自动提醒


app.get("/selectYinshou", function _callee(req, resp) {
  var number, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          number = req.query.number;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(selectOrders(number));

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
app.listen(3010, function (err, data) {
  if (!err) {
    console.log("http://localhost:3010服务启动成功！");
  }
});