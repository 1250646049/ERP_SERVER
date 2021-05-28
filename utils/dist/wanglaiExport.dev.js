"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ejs = require("ejsexcel");

var fs = require("fs");

var path = require("path"); // 导出内容


function exportDatas(data) {
  return new Promise(function (reslove, reject) {
    // 读excel模板文件
    var d = fs.readFileSync(path.join(__dirname, "../public/moban/wanglai.xlsx")); //    data['GYSyinfuTotal']=computeTotal(data['GYSYINFU'])
    // 设置求和公式

    data['sumGYSyinfu'] = "SUM(E4:E".concat(data['GYSYINFU'].length + 3, ")");
    data['sumGYSyf'] = "SUM(E4:E".concat(data['GYSYF'].length + 3, ")");
    data['sumyinshou'] = "SUM(B4:B".concat(data['yinshou'].length + 3, ")");
    data['sumyushou'] = "SUM(E4:E".concat(data['yushou'].length + 3, ")");
    data['sumother'] = "SUM(E4:E".concat(data['other'].length + 3, ")");
    data['others'] = computeOthers(data['other']); // 读取内容

    ejs.renderExcel(d, data).then(function (resp) {
      fs.writeFileSync(path.join(__dirname, "../public/content/\u4E50\u8FC8\u5F80\u6765\u8868--".concat(data['times'], ".xlsx")), resp);
      reslove({
        status: 1,
        message: "恭喜你，导出成功！",
        url: "/content/\u4E50\u8FC8\u5F80\u6765\u8868--".concat(data['times'], ".xlsx")
      });
    })["catch"](function (e) {
      reject({
        status: 0,
        message: "抱歉，导出往来数据操作失败！"
      });
    });
  });
}

function computeOthers(data) {
  return data.map(function (item) {
    if (item['ccode'] == '113301') {
      item['content'] = item['cDepName'];
    } else if (item['ccode'] == '11330301') {
      item['content'] = item['cVenName'];
    } else {
      item['content'] = item['cPersonName'];
    }

    return _objectSpread({}, item);
  });
}

module.exports = {
  exportDatas: exportDatas
};