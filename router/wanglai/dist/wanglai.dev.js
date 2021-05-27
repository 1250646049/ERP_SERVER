"use strict";

var express = require("express");

var router = express.Router();

var _require = require("./wanglai_service"),
    getWanglai = _require.getWanglai; // 远程调用服务


router.get("/getWanglai", function _callee(req, resp) {
  var _req$query, type, time, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$query = req.query, type = _req$query.type, time = _req$query.time;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(getWanglai(type, time));

        case 4:
          result = _context.sent;
          resp.json(result);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          resp.json(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = router;