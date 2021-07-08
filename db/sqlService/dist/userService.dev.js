"use strict";

var sqlDb = require("../sqlDb");

var _require = require("../../utils/statusCode"),
    CODE = _require.CODE,
    MESSAGE = _require.MESSAGE;
/**
 * 获取所有业务员
 * table_name 业务员
 */


function getAllUser() {
  return new Promise(function (reslove, reject) {
    sqlDb.then(function (connect) {
      connect.query("select * from dbo.业务员").then(function (r) {
        reslove({
          status: CODE.succerr,
          message: MESSAGE.select.success,
          data: r['recordsets'][0],
          total: r['recordsets'][0].length
        });
      })["catch"](function (error) {
        reject({
          status: CODE.error,
          message: MESSAGE.select.error,
          data: []
        });
      });
    });
  });
}
/**
 * 获取所有部门
 * table_name 部门表
 */


function getAllDepart() {
  return new Promise(function (reslove, reject) {
    sqlDb.then(function (connect) {
      connect.query("select * from dbo.Table_部门").then(function (r) {
        reslove({
          status: CODE.succerr,
          message: MESSAGE.select.success,
          data: r['recordsets'][0],
          total: r['recordsets'][0].length
        });
      })["catch"](function (error) {
        reject({
          status: CODE.error,
          message: MESSAGE.select.error,
          data: []
        });
      });
    });
  });
}

function selectAllWuliu() {
  return new Promise(function (reslove, reject) {
    sqlDb.then(function (r) {
      r.query("select * from \u7269\u6599\u5230\u8D27\u9884\u6D4B\u4E3B\u8868 order by Item_ID asc").then(function (r) {
        var data = r['recordset'];
        reslove({
          status: 1,
          message: "查询成功",
          list: data.map(function (item, index) {
            item['key'] = index;
            return item;
          })
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "查询失败！"
        });
      });
    });
  });
}

module.exports = {
  getAllUser: getAllUser,
  getAllDepart: getAllDepart,
  selectAllWuliu: selectAllWuliu
};