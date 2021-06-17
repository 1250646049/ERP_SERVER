"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../../db/myService/examService"),
    selectExam = _require.selectExam,
    selectCount = _require.selectCount; // 模糊匹配查询结果


router.get("/selectExamLike", function _callee(req, resp) {
  var _req$query, type, content, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$query = req.query, type = _req$query.type, content = _req$query.content;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(selectExam(type, content));

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
            message: "查询失败！"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
router.get("/selectCount", function _callee2(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(selectCount());

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
            message: "查询失败！"
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;