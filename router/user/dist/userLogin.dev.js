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
    selectAllOath = _require2.selectAllOath,
    alterOath = _require2.alterOath,
    selectUser2Order = _require2.selectUser2Order,
    selectShior = _require2.selectShior,
    selectNoneOath = _require2.selectNoneOath,
    getAllCaidan = _require2.getAllCaidan,
    selectCaidan2User = _require2.selectCaidan2User,
    updateUserOuthor = _require2.updateUserOuthor,
    deleteOuthor = _require2.deleteOuthor,
    addUserDepart = _require2.addUserDepart,
    addOnePath = _require2.addOnePath,
    addTixing = _require2.addTixing,
    selectTixing = _require2.selectTixing,
    selectTodayBobao = _require2.selectTodayBobao,
    addBobao = _require2.addBobao;

var _require3 = require("../../utils/jwt"),
    devjwt = _require3.devjwt;

var path = require("path"); // 物流信息


var _require4 = require("../../db/sqlService/userService"),
    selectAllWuliu = _require4.selectAllWuliu; // 引入爬虫程序


var _require5 = require("../../spider/spider_index"),
    UserPosition = _require5.UserPosition; // 生成验证码


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
          console.log(555);
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(selectDepartOrder());

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
}); // 查询不需要授权的地址

router.get("/selectNoneOauth", function _callee12(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(selectNoneOath());

        case 3:
          result = _context12.sent;
          resp.json(result);
          _context12.next = 10;
          break;

        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](0);
          resp.json({
            status: 0,
            message: "查询失败"
          });

        case 10:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 查询所有权限列表

router.get("/selectAllOath", function _callee13(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(selectAllOath());

        case 3:
          result = _context13.sent;
          resp.json(result);
          _context13.next = 10;
          break;

        case 7:
          _context13.prev = 7;
          _context13.t0 = _context13["catch"](0);
          resp.json({
            status: 0,
            message: "抱歉，查询失败！"
          });

        case 10:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 更新是否受控url

router.get("/alterOath", function _callee14(req, resp) {
  var _req$query3, id, contro, result;

  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _req$query3 = req.query, id = _req$query3.id, contro = _req$query3.contro;
          _context14.prev = 1;
          _context14.next = 4;
          return regeneratorRuntime.awrap(alterOath(id, contro));

        case 4:
          result = _context14.sent;
          resp.json(result);
          _context14.next = 11;
          break;

        case 8:
          _context14.prev = 8;
          _context14.t0 = _context14["catch"](1);
          resp.json({
            status: 0,
            message: "抱歉，更新失败！"
          });

        case 11:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 添加一条路由信息

router.post("/addOnePath", function _callee15(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap(addOnePath(req.body));

        case 3:
          result = _context15.sent;
          resp.json(result);
          _context15.next = 10;
          break;

        case 7:
          _context15.prev = 7;
          _context15.t0 = _context15["catch"](0);
          resp.json({
            status: 0,
            message: "抱歉，添加失败！"
          });

        case 10:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 添加一条日程提醒

router.post("/addTixing", function _callee16(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(addTixing(req.body));

        case 3:
          result = _context16.sent;
          resp.json(result);
          _context16.next = 10;
          break;

        case 7:
          _context16.prev = 7;
          _context16.t0 = _context16["catch"](0);
          resp.json({
            status: 0,
            message: "抱歉，操作失败！"
          });

        case 10:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 查询提醒

router.get("/selectTixing", function _callee17(req, resp) {
  var username, result;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          username = req.query.username;
          _context17.prev = 1;
          _context17.next = 4;
          return regeneratorRuntime.awrap(selectTixing(username));

        case 4:
          result = _context17.sent;
          resp.json(result);
          _context17.next = 11;
          break;

        case 8:
          _context17.prev = 8;
          _context17.t0 = _context17["catch"](1);
          resp.json({
            status: 0,
            message: "抱歉，查询失败！"
          });

        case 11:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 获取今日资讯

router.get("/getZixun", function _callee18(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return regeneratorRuntime.awrap(new UserPosition().init());

        case 3:
          result = _context18.sent;
          resp.json(result);
          _context18.next = 10;
          break;

        case 7:
          _context18.prev = 7;
          _context18.t0 = _context18["catch"](0);
          resp.json({
            status: 0,
            message: "抱歉，操作失败！"
          });

        case 10:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // 查询是否显示播报

router.get("/selectBobao", function _callee19(req, resp) {
  var username, result;
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          username = req.query.username;
          _context19.prev = 1;
          _context19.next = 4;
          return regeneratorRuntime.awrap(selectTodayBobao(username));

        case 4:
          result = _context19.sent;
          resp.json(result);
          _context19.next = 11;
          break;

        case 8:
          _context19.prev = 8;
          _context19.t0 = _context19["catch"](1);
          resp.json({
            status: 0,
            message: "查询失败"
          });

        case 11:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 添加播报信息

router.post("/addBobao", function _callee20(req, resp) {
  var username, result;
  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          username = req.body.username;
          _context20.prev = 1;
          _context20.next = 4;
          return regeneratorRuntime.awrap(addBobao(username));

        case 4:
          result = _context20.sent;
          resp.json(result);
          _context20.next = 11;
          break;

        case 8:
          _context20.prev = 8;
          _context20.t0 = _context20["catch"](1);
          resp.json({
            status: 0,
            message: "抱歉，查询失败！"
          });

        case 11:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // 物料到货预测临时

router.get("/selectAllWuliu", function _callee21(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _context21.next = 3;
          return regeneratorRuntime.awrap(selectAllWuliu());

        case 3:
          result = _context21.sent;
          resp.json(result);
          _context21.next = 10;
          break;

        case 7:
          _context21.prev = 7;
          _context21.t0 = _context21["catch"](0);
          resp.json({
            status: 0,
            message: "查询失败！"
          });

        case 10:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;