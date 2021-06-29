"use strict";

var express = require("express");

var app = express();

var cors = require("cors");

var _require = require("./db/sqlService/wanglaiService"),
    selectGyshangYingFu = _require.selectGyshangYingFu,
    selectKehuKemu = _require.selectKehuKemu,
    selectGyshangYufu = _require.selectGyshangYufu,
    selectOther = _require.selectOther;

var _require2 = require("./db/sqlService/yinshoukuan"),
    selectOrders = _require2.selectOrders,
    selectOrdersLike = _require2.selectOrdersLike,
    selectcNewsOrders = _require2.selectcNewsOrders; // 引入导出工具类


var _require3 = require("./utils/wanglaiExport"),
    exportDatas = _require3.exportDatas; // 引入跨域
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
// });
// 查询 and 导出 


app.get("/wanglai", function _callee(req, resp) {
  var _req$query, type, time, gysYF, gysyf, data, other, _gysYF, _gysyf, _data, _other, exportData, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$query = req.query, type = _req$query.type, time = _req$query.time;

          if (!(type === 'select')) {
            _context.next = 23;
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
          _context.next = 14;
          return regeneratorRuntime.awrap(selectOther(time));

        case 14:
          other = _context.sent;
          resp.json({
            status: 1,
            message: "物流数据操作成功！",
            GYSYF: gysYF['list'],
            GYSYINFU: gysyf['list'],
            yinshou: data['yinshou'],
            yushou: data['yushou'],
            other: other['list']
          });
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](2);
          resp.json({
            status: 0,
            message: "物流数据操作失败"
          });

        case 21:
          _context.next = 46;
          break;

        case 23:
          _context.prev = 23;
          _context.next = 26;
          return regeneratorRuntime.awrap(selectGyshangYufu(time));

        case 26:
          _gysYF = _context.sent;
          _context.next = 29;
          return regeneratorRuntime.awrap(selectGyshangYingFu(time));

        case 29:
          _gysyf = _context.sent;
          _context.next = 32;
          return regeneratorRuntime.awrap(selectKehuKemu(time));

        case 32:
          _data = _context.sent;
          _context.next = 35;
          return regeneratorRuntime.awrap(selectOther(time));

        case 35:
          _other = _context.sent;
          exportData = {
            times: time,
            deparent: "上海乐迈地板有限公司",
            GYSYF: _gysYF['list'],
            GYSYINFU: _gysyf['list'],
            yinshou: _data['yinshou'],
            yushou: _data['yushou'],
            other: _other['list']
          };
          _context.next = 39;
          return regeneratorRuntime.awrap(exportDatas(exportData));

        case 39:
          result = _context.sent;
          resp.json(result);
          _context.next = 46;
          break;

        case 43:
          _context.prev = 43;
          _context.t1 = _context["catch"](23);
          resp.json({
            status: 0,
            message: "导出失败！"
          });

        case 46:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 18], [23, 43]]);
}); // 查询订单数量 应收账款超期自动提醒

app.get("/selectYinshou", function _callee2(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(selectcNewsOrders());

        case 3:
          result = _context2.sent;
          resp.json(result);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          resp.json({
            status: 0,
            message: "抱歉，查询失败！"
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.get("/searchYinshou", function _callee3(req, resp) {
  var _req$query2, type, search, result;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$query2 = req.query, type = _req$query2.type, search = _req$query2.search;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(selectOrdersLike(type, search));

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
            message: "抱歉，查询失败！"
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
app.listen(3017, function (err, data) {
  if (!err) {
    console.log("http://localhost:3017服务启动成功！");
  }
});