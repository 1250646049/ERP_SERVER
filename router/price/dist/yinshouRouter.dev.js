"use strict";

var express = require("express");

var router = express.Router();

var _require = require("./yinshouService"),
    getYingshoukuan = _require.getYingshoukuan,
    searchYingshoukuan = _require.searchYingshoukuan,
    searchYingshoukuan003 = _require.searchYingshoukuan003,
    getYingshoukuan003 = _require.getYingshoukuan003;

var _require2 = require("../../db/myService/yinshouServer"),
    addYinshou = _require2.addYinshou,
    selectShoukuan2AutoId = _require2.selectShoukuan2AutoId,
    alterYinshou = _require2.alterYinshou,
    deleteOrder = _require2.deleteOrder,
    alterJiean = _require2.alterJiean,
    select2autoId = _require2.select2autoId;

var _require3 = require("../../db/sqlService/shoukuanSJ"),
    selectAllList = _require3.selectAllList,
    selectAllList003 = _require3.selectAllList003; // 删除订单


router.get("/deleteOrder", function _callee(req, resp) {
  var id, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.query.id;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(deleteOrder(id));

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
            message: "删除失败！"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 修改结案状态

router.get("/alterJiean", function _callee2(req, resp) {
  var _req$query, jiean, id, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$query = req.query, jiean = _req$query.jiean, id = _req$query.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(alterJiean(jiean, id));

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
            message: "删除失败！"
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 查询AutoId

router.get("/select2autoId", function _callee3(req, resp) {
  var AutoId, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          AutoId = req.query.AutoId;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(select2autoId(AutoId));

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
            message: "查收失败！"
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 远程调用查询应收款到期 查询所有分页查询 017

router.get("/selectYsk", function _callee4(req, resp) {
  var result, data;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(getYingshoukuan());

        case 3:
          result = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(selectAllList());

        case 6:
          data = _context4.sent;
          result['shoukuan'] = data['list'];
          resp.json(result);
          _context4.next = 14;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          resp.json({
            status: 0,
            message: "抱歉，查询失败！"
          });

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // 远程调用查询应收款到期 查询所有分页查询 003

router.get("/selectYsk003", function _callee5(req, resp) {
  var result, data;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(getYingshoukuan003());

        case 3:
          result = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(selectAllList003());

        case 6:
          data = _context5.sent;
          result['shoukuan'] = data['list'];
          resp.json(result);
          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          resp.json({
            status: 0,
            message: "抱歉，查询失败！"
          });

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // 远程调用搜索收款到期 017

router.get("/searchYsk", function _callee6(req, resp) {
  var _req$query2, type, search, result;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _req$query2 = req.query, type = _req$query2.type, search = _req$query2.search;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(searchYingshoukuan(type, search));

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
            message: "抱歉，查询失败！"
          });

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 远程调用搜索收款到期 003

router.get("/searchYsk003", function _callee7(req, resp) {
  var _req$query3, type, search, result;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _req$query3 = req.query, type = _req$query3.type, search = _req$query3.search;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(searchYingshoukuan003(type, search));

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
            message: "抱歉，查询失败！"
          });

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 更改收款到期Mysql表

router.post("/alterYinshou", function _callee8(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(alterYinshou(req.body));

        case 3:
          result = _context8.sent;
          resp.json(result);
          _context8.next = 10;
          break;

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          resp.json({
            status: 0,
            message: "抱歉，操作失败！"
          });

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 添加收款到期记录

router.post("/addYinshou", function _callee9(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(addYinshou(req.body));

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
            message: "抱歉,添加失败！"
          });

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 根据 Autoid查询数据

router.get("/selectShoukuan2AutoId", function _callee10(req, resp) {
  var AutoId, result;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          AutoId = req.query.AutoId;
          _context10.prev = 1;
          _context10.next = 4;
          return regeneratorRuntime.awrap(selectShoukuan2AutoId(AutoId));

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
            message: "查询失败！"
          });

        case 11:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 修改一条记录

router.post("/alterYinshou", function _callee11(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(alterYinshou(req.body));

        case 3:
          result = _context11.sent;
          resp.json(result);
          _context11.next = 10;
          break;

        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](0);
          resp.json({
            status: 0,
            message: "抱歉，修改失败！"
          });

        case 10:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;