"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var connect = require("../mysqlDb");

var _require = require("../../utils/utils"),
    getCurrentTimes = _require.getCurrentTimes; // 查询是否含有收款项


function altersYinshou(data) {
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
    connect.query("select * from w_yinshou where AutoId=?", [id], function (err, data) {
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
} // 添加一条收款项


function addYinshou(data) {
  var AutoId = data.AutoId,
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
      quyu = data.quyu,
      username = data.username,
      name = data.name,
      cCusName = data.cCusName,
      chae = data.chae,
      totalprice = data.totalprice,
      personemail = data.personemail,
      iQuantity = data.iQuantity,
      iSum = data.iSum;
  return new Promise(function (reslove, reject) {
    select2cCusName(cCusName).then(function (d) {
      var data = d.data;

      if (JSON.stringify(data) === '{}') {
        // 为空 要添加number
        connect.query("insert into w_yinshou(email,type,jiean,jilu,riqi,price,beizhu,status,shoujianren,jiedian,edu,quyu,AutoId,number,uptime,name,username,cCusName,chae,totalprice,ku,personemail,iQuantity,iSum) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [email, type, jiean, jilu, riqi, price, beizhu, status, shoujianren, jiedian, edu, quyu, AutoId, 1, getCurrentTimes(), name, username, cCusName, chae, totalprice, 1, personemail, iQuantity, iSum], function (err, data) {
          if (!err) {
            reslove({
              status: 1,
              message: "添加应收款成功！"
            });
          } else {
            reject({
              status: 0,
              message: "抱歉，添加失败！"
            });
          }
        });
      } else {
        // 不为空 获取number
        var number = data.number;
        connect.query("insert into w_yinshou(email,type,jiean,jilu,riqi,price,beizhu,status,shoujianren,jiedian,edu,quyu,AutoId,number,uptime,name,username,cCusName,chae,totalprice,ku,personemail,iQuantity,iSum) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [email, type, jiean, jilu, riqi, price, beizhu, status, shoujianren, jiedian, edu, quyu, AutoId, number + 1, getCurrentTimes(), name, username, cCusName, chae, totalprice, 1, personemail, iQuantity, iSum], function (err, data) {
          if (!err) {
            reslove({
              status: 1,
              message: "添加应收款成功！"
            });
          } else {
            reject({
              status: 0,
              message: "抱歉，添加失败！"
            });
          }
        });
      }
    })["catch"](function (r) {
      reject(r);
    });
  });
} // 根据客户名称查询任意一条记录 判断次数


function select2cCusName(cCusName) {
  return new Promise(function (reslove, reject) {
    connect.query("select * from w_yinshou where cCusName=? and ku=1 order by number desc limit 1", [cCusName], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "查询成功",
          data: _objectSpread({}, data[0])
        });
      } else {
        reject({
          status: 0,
          message: "查询失败！"
        });
      }
    });
  });
} // 查询收款记录


function selectShoukuan2AutoId(id) {
  return new Promise(function (reslove, reject) {
    connect.query("select * from w_yinshou where AutoId=? order by number asc", [id], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "查询成功！",
          list: data.map(function (item, index) {
            item['key'] = index;
            return _objectSpread({}, item);
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
} // 修改一条收款项 mysql


function alterYinshou(data) {
  var email = data.email,
      type = data.type,
      jilu = data.jilu,
      riqi = data.riqi,
      price = data.price,
      beizhu = data.beizhu,
      status = data.status,
      shoujianren = data.shoujianren,
      jiedian = data.jiedian,
      edu = data.edu,
      quyu = data.quyu,
      id = data.id,
      name = data.name,
      username = data.username,
      iQuantity = data.iQuantity,
      iSum = data.iSum;
  return new Promise(function (reslove, reject) {
    connect.query("update w_yinshou set email=?,type=?,jilu=?,riqi=?,price=?,beizhu=?,status=?,shoujianren=?,jiedian=?,edu=?,quyu=?,name=?,username=?,iQuantity=?,iSum=? where id=?", [email, type, jilu, riqi, price, beizhu, status, shoujianren, jiedian, edu, quyu, name, username, iQuantity, iSum, id], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "恭喜你，成功成功！"
        });
      } else {
        reject({
          status: 0,
          message: "抱歉，修改失败！"
        });
      }
    });
  });
} // 修改是否结案


function alterJiean(jiean, id) {
  return new Promise(function (reslove, reject) {
    connect.query("update w_yinshou set jiean=? where id=?", [jiean, id], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "更新成功！"
        });
      } else {
        reject({
          status: 0,
          message: "更新失败！"
        });
      }
    });
  });
} // 删除订单


function deleteOrder(id) {
  return new Promise(function (reslove, reject) {
    connect.query("delete from w_yinshou where id=?", [id], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "删除成功！"
        });
      } else {
        reject({
          status: 0,
          message: "删除失败！"
        });
      }
    });
  });
} // 根据Auti id 排序查询


function select2autoId(AutoId) {
  return new Promise(function (reslove, reject) {
    connect.query("select * from w_yinshou where AutoId=? order by number asc", [AutoId], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "查询成功！",
          list: data.length ? data.map(function (item) {
            return _objectSpread({}, item);
          }) : []
        });
      } else {
        reject({
          status: 0,
          message: "查询失败！",
          list: []
        });
      }
    });
  });
}

module.exports = {
  addYinshou: addYinshou,
  selectShoukuan2AutoId: selectShoukuan2AutoId,
  alterYinshou: alterYinshou,
  alterJiean: alterJiean,
  deleteOrder: deleteOrder,
  select2autoId: select2autoId
};