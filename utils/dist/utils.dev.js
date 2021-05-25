"use strict";

var md5 = require("md5");

var fs = require("fs");

var monent = require("moment");

var path = require("path"); // 加密密码


var _require = require("../db/myService/wuliuServer"),
    setMoban = _require.setMoban;

function addPassword(password) {
  return md5(password);
} // 获取当前日期时间


function getCurrentTimes() {
  return monent().format("YYYY-MM-DD HH:mm:ss");
}

function getDate() {
  return monent().format("YYYY-MM-DD");
} // 物流上传保存


function uploadWuliu(file) {
  var originalname, type;
  return regeneratorRuntime.async(function uploadWuliu$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          originalname = file.originalname;
          type = originalname.substring(originalname.lastIndexOf("."));
          _context.prev = 2;
          fs.writeFileSync("public/moban/物流部物料到货预测表" + type, file.buffer, {
            encoding: "binary"
          });
          filePath = path.join(__dirname, "../public/moban/物流部物料到货预测表" + type);
          _context.next = 7;
          return regeneratorRuntime.awrap(setMoban(filePath));

        case 7:
          result = _context.sent;
          return _context.abrupt("return", result);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", {
            status: 0,
            message: "抱歉，上传失败！"
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 11]]);
} // sqltime 转化为 时间


function sqlTime2times(time) {
  return monent(time).format("YYYY-MM-DD hh:ss:mm");
}

module.exports = {
  addPassword: addPassword,
  uploadWuliu: uploadWuliu,
  getCurrentTimes: getCurrentTimes,
  sqlTime2times: sqlTime2times,
  getDate: getDate
};