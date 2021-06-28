"use strict";

var express = require("express");

var router = express.Router();

var _require = require("./salaryService"),
    selectAllNews = _require.selectAllNews,
    deleteContent = _require.deleteContent,
    updateWorkshop = _require.updateWorkshop,
    insertWorkshop = _require.insertWorkshop,
    insertTeam = _require.insertTeam,
    alterTeam = _require.alterTeam,
    insertPerson = _require.insertPerson,
    updatePerson = _require.updatePerson,
    selectPerson = _require.selectPerson,
    insertProcess = _require.insertProcess,
    updateProcess = _require.updateProcess; // 查询所有


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
}); // 插入一条员工信息

router.post("/insertPerson", function _callee7(req, resp) {
  var _req$body5, PersonCode, PersonName, WorkshopCode, Teamcode, result;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$body5 = req.body, PersonCode = _req$body5.PersonCode, PersonName = _req$body5.PersonName, WorkshopCode = _req$body5.WorkshopCode, Teamcode = _req$body5.Teamcode;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(insertPerson(PersonCode, PersonName, WorkshopCode, Teamcode));

        case 4:
          result = _context7.sent;
          resp.json(result);
          _context7.next = 11;
          break;

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](1);
          resp.json({
            status: 0,
            message: "抱歉，插入失败"
          });

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 更新一条台湾员工

router.post("/updatePerson", function _callee8(req, resp) {
  var _req$body6, PersonCode, PersonName, WorkshopCode, Teamcode, result;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _req$body6 = req.body, PersonCode = _req$body6.PersonCode, PersonName = _req$body6.PersonName, WorkshopCode = _req$body6.WorkshopCode, Teamcode = _req$body6.Teamcode;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(updatePerson(PersonCode, PersonName, WorkshopCode, Teamcode));

        case 4:
          result = _context8.sent;
          resp.json(result);
          _context8.next = 11;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](1);
          resp.json({
            status: 0,
            message: "修改失败！"
          });

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 查询所有员工

router.get("/selectPerson", function _callee9(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(selectPerson());

        case 3:
          result = _context9.sent;
          resp.json(result);
          _context9.next = 10;
          break;

        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          resp.json({
            status: 0,
            message: "抱歉，查询失败！"
          });

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 插入一条工序

router.post("/insertProcess", function _callee10(req, resp) {
  var _req$body7, cj, Code, Name, UnitPrice, bm, result;

  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _req$body7 = req.body, cj = _req$body7.cj, Code = _req$body7.Code, Name = _req$body7.Name, UnitPrice = _req$body7.UnitPrice, bm = _req$body7.bm;
          _context10.prev = 1;
          _context10.next = 4;
          return regeneratorRuntime.awrap(insertProcess(cj, Code, Name, UnitPrice, bm));

        case 4:
          result = _context10.sent;
          resp.json(result);
          _context10.next = 11;
          break;

        case 8:
          _context10.prev = 8;
          _context10.t0 = _context10["catch"](1);
          resp.json({
            status: 0,
            message: "插入工序失败！"
          });

        case 11:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 修改一条工序

router.post("/updateProcess", function _callee11(req, resp) {
  var _req$body8, cj, Code, Name, UnitPrice, bm, result;

  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _req$body8 = req.body, cj = _req$body8.cj, Code = _req$body8.Code, Name = _req$body8.Name, UnitPrice = _req$body8.UnitPrice, bm = _req$body8.bm;
          _context11.prev = 1;
          _context11.next = 4;
          return regeneratorRuntime.awrap(updateProcess(cj, Code, Name, UnitPrice, bm));

        case 4:
          result = _context11.sent;
          resp.json(result);
          _context11.next = 11;
          break;

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](1);
          resp.json({
            status: 0,
            message: "修改工序失败！"
          });

        case 11:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = router;