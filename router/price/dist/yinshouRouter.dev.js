"use strict";

var express = require("express");

var router = express.Router();

var _require = require("./yinshouService"),
    getYingshoukuan = _require.getYingshoukuan;

var _require2 = require("../../db/myService/yinshouServer"),
    alterYinshou = _require2.alterYinshou; // 远程调用查询应收款到期


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
});
module.exports = router;