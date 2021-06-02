"use strict";

var express = require("express");

var router = express.Router();

var _require = require("./yinshouService"),
    getYingshoukuan = _require.getYingshoukuan;

var _require2 = require("../../db/myService/yinshouServer"),
    alterYinshou = _require2.alterYinshou,
    addYinshou = _require2.addYinshou,
    selectShoukuan2AutoId = _require2.selectShoukuan2AutoId; // 远程调用查询应收款到期


router.get("/selectYsk", function _callee(req, resp) {
  var number, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          number = req.query.number;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(getYingshoukuan(number));

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
}); // 更改收款到期Mysql表

router.post("/alterYinshou", function _callee2(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(alterYinshou(req.body));

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
            message: "抱歉，操作失败！"
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 添加收款到期记录

router.post("/addYinshou", function _callee3(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(addYinshou(req.body));

        case 3:
          result = _context3.sent;
          resp.json(result);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          resp.json({
            status: 0,
            message: "抱歉,添加失败！"
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 根据 Autoid查询数据

router.get("/selectShoukuan2AutoId", function _callee4(req, resp) {
  var AutoId, result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          AutoId = req.query.AutoId;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(selectShoukuan2AutoId(AutoId));

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
            message: "查询失败！"
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = router;