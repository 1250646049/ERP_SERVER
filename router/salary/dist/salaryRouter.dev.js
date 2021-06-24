"use strict";

var express = require("express");

var router = express.Router();

var _require = require("./salaryService"),
    selectAllNews = _require.selectAllNews,
    deleteContent = _require.deleteContent,
    updateWorkshop = _require.updateWorkshop,
    insertWorkshop = _require.insertWorkshop,
    insertTeam = _require.insertTeam,
    alterTeam = _require.alterTeam; // 查询所有


router.get("/selectAllNews", function _callee(req, resp) {
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
}); // 拼接sql删除内容

router.get("/deleteContent", function _callee2(req, resp) {
  var _req$query, data, type, code, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$query = req.query, data = _req$query.data, type = _req$query.type, code = _req$query.code;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(deleteContent(data, type, code));

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
}); // 更新workshop

router.post("/updateWorkshop", function _callee3(req, resp) {
  var _req$body, WorkshopName, WorkshopCode, result;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, WorkshopName = _req$body.WorkshopName, WorkshopCode = _req$body.WorkshopCode;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(updateWorkshop(WorkshopName, WorkshopCode));

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
}); // 添加一条Workshop

router.post("/insertWorkshop", function _callee4(req, resp) {
  var _req$body2, WorkshopName, bm, result;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, WorkshopName = _req$body2.WorkshopName, bm = _req$body2.bm;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(insertWorkshop(WorkshopName, bm));

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
            message: "添加WorkShop数据失败！"
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 添加一条Team班组

router.post("/insertTeam", function _callee5(req, resp) {
  var _req$body3, WorkshopCode, TeamName, number, bm, result;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body3 = req.body, WorkshopCode = _req$body3.WorkshopCode, TeamName = _req$body3.TeamName, number = _req$body3.number, bm = _req$body3.bm;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(insertTeam(WorkshopCode, TeamName, number, bm));

        case 4:
          result = _context5.sent;
          resp.json(result);
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          resp.json({
            status: 0,
            message: "添加数据失败！"
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 修改一条班组

router.post("/alterTeam", function _callee6(req, resp) {
  var _req$body4, TeamCode, WorkshopCode, TeamName, number, bm, result;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$body4 = req.body, TeamCode = _req$body4.TeamCode, WorkshopCode = _req$body4.WorkshopCode, TeamName = _req$body4.TeamName, number = _req$body4.number, bm = _req$body4.bm;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(alterTeam(TeamCode, WorkshopCode, TeamName, number, bm));

        case 4:
          result = _context6.sent;
          resp.json(result);
          _context6.next = 11;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](1);
          resp.json({
            status: 0,
            message: "修改失败！"
          });

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = router;