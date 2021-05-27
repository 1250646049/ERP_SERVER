"use strict";

var express = require("express");

var app = express();

var _require = require("./db/sqlService/wanglaiService"),
    selectGyshangYingFu = _require.selectGyshangYingFu,
    selectKehuKemu = _require.selectKehuKemu,
    selectGyshangYufu = _require.selectGyshangYufu; // 查询 and 导出


app.get("/wanglai", function _callee(req, resp) {
  var _req$query, type, time, gysYF, gysyf, data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$query = req.query, type = _req$query.type, time = _req$query.time;

          if (!(type === 'select')) {
            _context.next = 21;
            break;
          }

          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(selectGyshangYufu(time));

        case 5:
          gysYF = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(selectGyshangYingFu(time));

        case 8:
          gysyf = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(selectKehuKemu(time));

        case 11:
          data = _context.sent;
          console.log(gysYF, gysyf, data);
          resp.json({
            status: 1,
            message: "物流数据操作成功！",
            GYSYF: gysYF['list'],
            GYSYINFU: gysyf['list'],
            yinshou: data['yinshou'],
            yushou: data['yushou']
          });
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](2);
          resp.json({
            status: 0,
            message: "物流数据操作失败"
          });

        case 19:
          _context.next = 21;
          break;

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 16]]);
});
app.listen(3017, function (err, data) {
  if (!err) {
    console.log("http://localhost:3017服务启动成功！");
  }
});