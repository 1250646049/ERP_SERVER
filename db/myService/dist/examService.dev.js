"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var connect = require("../mysqlDb"); // 模糊查询试题库


function selectExam(type, content) {
  return new Promise(function _callee(reslove, reject) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            connect.query("select * from f_exam where ".concat(type, " like ?"), ["%".concat(content, "%")], function (err, data) {
              if (!err) {
                reslove({
                  status: 1,
                  message: "查询成功",
                  list: data.length ? data.map(function (item, index) {
                    item['key'] = item['id'];
                    return _objectSpread({}, item);
                  }) : []
                });
              } else {
                reject({
                  status: 0,
                  message: "抱歉，查询失败！",
                  list: []
                });
              }
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  });
}

function selectCount() {
  return new Promise(function (reslove, reject) {
    connect.query("select count(*) from f_exam", function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "查询成功",
          count: _objectSpread({}, data[0])['count(*)']
        });
      } else {
        reject({
          status: 0,
          message: "查询失败！"
        });
      }
    });
  });
}

module.exports = {
  selectExam: selectExam,
  selectCount: selectCount
};