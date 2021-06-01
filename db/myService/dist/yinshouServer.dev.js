"use strict";

var connect = require("../mysqlDb"); // 查询是否含有收款项


function alterYinshou(data) {
  var id = data.id,
      email = data.email,
      type = data.type,
      jiean = data.jiean,
      jilu = data.jilu,
      riqi = data.riqi,
      price = data.price,
      beizhu = data.beizhu,
      status = data.status,
      shoujianren = data.shoujianren,
      jiedian = data.jiedian,
      edu = data.edu,
      quyu = data.quyu;
  return new Promise(function (reslove, reject) {
    connect.query("select * from w_yinshou where id=?", [id], function (err, data) {
      if (!err) {
        if (data.length) {
          // 更新记录
          connect.query("update w_yinshou set email=?,type=?,jiean=?,jilu=?,riqi=?,price=?,beizhu=?,status=?,shoujianren=?,jiedian=?,edu=?,quyu=? where id=?", [email, type, jiean, jilu, riqi, price, beizhu, status, shoujianren, jiedian, edu, quyu, id], function (err, data) {
            if (!err) {
              reslove({
                status: 1,
                message: "更新成功！"
              });
            } else {
              reject({
                status: 0,
                message: "抱歉，更新失败！"
              });
            }
          });
        } else {
          connect.query("insert into w_yinshou(id,email,type,jiean,jilu,riqi,price,beizhu,status,shoujianren,jiedian,edu,quyu) values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [id, email, type, jiean, jilu, riqi, price, beizhu, status, shoujianren, jiedian, edu, quyu], function (err, data) {
            if (!err) {
              reslove({
                status: 1,
                message: "添加成功"
              });
            } else {
              reject({
                status: 0,
                message: "抱歉，添加失败！"
              });
            }
          });
        }
      } else {
        reject({
          status: 0,
          message: "抱歉，操作失败！"
        });
      }
    });
  });
}

module.exports = {
  alterYinshou: alterYinshou
};