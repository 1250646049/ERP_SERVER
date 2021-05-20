"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var router = express.Router(); // 引入验证码插件

var captcha = require("svg-captcha");

var _require = require("../../utils/statusCode"),
    CODE = _require.CODE; // 引入操作数据库模块


var _require2 = require("../../db/myService/userService"),
    selectUser = _require2.selectUser,
    selectWord = _require2.selectWord,
    selectDepartOrder = _require2.selectDepartOrder,
    selectUser2Order = _require2.selectUser2Order,
    selectShior = _require2.selectShior,
    getAllCaidan = _require2.getAllCaidan,
    selectCaidan2User = _require2.selectCaidan2User,
    updateUserOuthor = _require2.updateUserOuthor,
    deleteOuthor = _require2.deleteOuthor,
    addUserDepart = _require2.addUserDepart;

var _require3 = require("../../utils/jwt"),
    devjwt = _require3.devjwt;

var path = require("path"); // 生成验证码


router.get("/yzm", function (req, resp) {
  var data = captcha.create({
    width: 120,
    height: 40,
    ignoreChars: '0o1i',
    size: 4
  });
  var yzmCode = data['text'];
  req.session.code = yzmCode;
  delete data['text'];
  resp.json(_objectSpread({
    status: CODE.succerr
  }, data));
}); // 业务员登录

router.post("/user/login", function _callee(req, resp) {
  var yzmCode, _req$body, yzm, password, username, result;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          yzmCode = req.session.code;
          _req$body = req.body, yzm = _req$body.yzm, password = _req$body.password, username = _req$body.username;

          if (!(!yzmCode || yzm.toLocaleLowerCase() !== yzmCode.toLocaleLowerCase())) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", resp.json({
            status: 0,
            message: "抱歉，验证码填写失败"
          }));

        case 4:
          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(selectUser(username, password));

        case 7:
          result = _context.sent;
          resp.json(result);
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          resp.json(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 11]]);
}); // 自动登录

router.post("/user/auto", function (req, resp) {
  var token = req.body.token;
  var data = devjwt(token);
  resp.json(data);
}); // 查询用户功能操作手册

router.get("/user/word", function _callee2(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(selectWord());

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
}); // 查询用户部门列表

router.get("/user/departs", function _callee3(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(selectDepartOrder());

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
            message: "抱歉，查询失败！"
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 查询用户管理部门

router.get("/depart/user", function _callee4(req, resp) {
  var name, result;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          name = req.query.name;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(selectUser2Order(name));

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
            message: "抱歉，查询失败！"
          });

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 用户权限控制

router.get("/user/oathor", function _callee5(req, resp) {
  var _req$query, depart, author, result;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$query = req.query, depart = _req$query.depart, author = _req$query.author;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(selectShior(depart, author));

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
            message: "查询失败！"
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 查询所有菜单

router.get("/depart/caidan", function _callee6(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(getAllCaidan());

        case 3:
          result = _context6.sent;
          resp.json(result);
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          resp.json({
            status: 0,
            message: "抱歉，查询失败！"
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 查询部门所对应的权限列表

router.get("/user2oathor", function _callee7(req, resp) {
  var depart, result;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          depart = req.query.depart;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(selectCaidan2User(depart));

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
}); // 更新用户权限

router.get("/updateOathor", function _callee8(req, resp) {
  var _req$query2, depart, oauthor, result;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _req$query2 = req.query, depart = _req$query2.depart, oauthor = _req$query2.oauthor;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(updateUserOuthor(depart, oauthor));

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
            message: "更新失败！"
          });

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); //删除部门对应的权限

router.get("/deleteOauthor", function _callee9(req, resp) {
  var depart, result;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          depart = req.query.depart;
          _context9.prev = 1;
          _context9.next = 4;
          return regeneratorRuntime.awrap(deleteOuthor(depart));

        case 4:
          result = _context9.sent;
          resp.json(result);
          _context9.next = 11;
          break;

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](1);
          resp.json({
            status: 0,
            message: "抱歉，更新失败！"
          });

        case 11:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 测试下载内容

router.get("/down", function _callee10(req, resp) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          resp.download(path.join(__dirname, "../../15.xlsx"));

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
}); // 添加一条用户记录

router.post("/addUserDepart", function _callee11(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(addUserDepart(req.body));

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
            message: "抱歉，更新失败！"
          });

        case 10:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;