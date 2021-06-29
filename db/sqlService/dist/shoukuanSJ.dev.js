"use strict";

var sqlDb = require("../sqlDb"); // 整理查询所有的收款登记列表信息


function selectAllList() {
  return new Promise(function (reslove, reject) {
    sqlDb.then(function (r) {
      r.query("select money,Ccusname from \u6536\u6B3E\u767B\u8BB0017\u4E3B\u8868").then(function (d) {
        var data = d['recordset'];
        var result = data.reduce(function (reduce, item, index) {
          var money = item['money'] ? Number(item['money']) : 0;
          var Ccusname = item['Ccusname'];

          if (reduce[Ccusname]) {
            var price = reduce[Ccusname]['money'] ? Number(reduce[Ccusname]['money']) : 0;
            reduce[Ccusname]['money'] = (money + price).toFixed(4);
          } else {
            reduce[Ccusname] = {
              money: money,
              Ccusname: Ccusname
            };
          }

          return reduce;
        }, {});
        reslove({
          status: 1,
          message: "查询成功！",
          list: result,
          total: Object.values(result).length
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "抱歉，查询失败！"
        });
      });
    });
  });
}

module.exports = {
  selectAllList: selectAllList
};