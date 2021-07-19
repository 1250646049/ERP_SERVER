"use strict";

var _require = require("./redisDb"),
    redisConnect = _require.redisConnect; // 获取person列表


function get_person() {
  return new Promise(function (reslove, reject) {
    redisConnect.get("person", function (err, data) {
      if (!err) {
        var list = JSON.parse(data);
        reslove({
          status: 1,
          message: "查询成功！",
          list: list.map(function (item, index) {
            item['index'] = index;
            return item;
          })
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
  get_person: get_person
};