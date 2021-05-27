"use strict";

var sqlDb = require("../sqlDb");

var _require = require("../../utils/utils"),
    sqlTime2times = _require.sqlTime2times;
/**
 * 查询sql 比较子表
 */


function selectBijia() {
  var page,
      number,
      connect,
      result,
      size,
      _args = arguments;
  return regeneratorRuntime.async(function selectBijia$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          page = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1;
          number = _args.length > 1 && _args[1] !== undefined ? _args[1] : 10;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(sqlDb);

        case 5:
          connect = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(connect.query("select top ".concat(page * number, " * from dbo.\u6BD4\u8D28\u6BD4\u4EF7\u5B50\u8868 order by sxrq desc")));

        case 8:
          result = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(connect.query("select count(*) from dbo.比质比价子表"));

        case 11:
          size = _context.sent;
          return _context.abrupt("return", {
            status: 1,
            message: "查询成功！",
            list: result['recordset'].map(function (item, index) {
              item['key'] = index;
              item['sxrq'] = sqlTime2times(item['sxrq']);
              item['sxrq2'] = sqlTime2times(item['sxrq2']);
              return item;
            }),
            size: size['recordset'][0]['']
          });

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", {
            status: 0,
            message: "抱歉，查询字段失败！"
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 15]]);
}
/**
 * 模糊匹配
 */


function selectLikeBijia(type, name) {
  var connect, result;
  return regeneratorRuntime.async(function selectLikeBijia$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(sqlDb);

        case 2:
          connect = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(connect.query("select * from dbo.\u6BD4\u8D28\u6BD4\u4EF7\u5B50\u8868 where ".concat(type, " like '%").concat(name, "%'  ")));

        case 5:
          result = _context2.sent;
          sql.close();
          return _context2.abrupt("return", {
            status: 1,
            message: "查询成功！",
            list: result['recordset'].length > 0 ? result['recordset'].map(function (item, index) {
              item['key'] = index;
              item['sxrq'] = sqlTime2times(item['sxrq']);
              item['sxrq2'] = sqlTime2times(item['sxrq2']);
              return item;
            }) : [],
            size: result['rowsAffected'][0]
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = {
  selectBijia: selectBijia,
  selectLikeBijia: selectLikeBijia
};