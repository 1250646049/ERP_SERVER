"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var connect = require("../mysqlDb");

var _require = require("../../utils/utils"),
    addPassword = _require.addPassword;

var _require2 = require("../../utils/jwt"),
    addjwt = _require2.addjwt;
/**
 * table_name 业务员
 * 添加一条用户数据
 */


function addUser(_ref) {
  var username = _ref.username,
      password = _ref.password,
      sex = _ref.sex,
      phone = _ref.phone,
      depart = _ref.depart,
      name = _ref.name,
      qxlbR = _ref.qxlbR;
  return new Promise(function (reslove, reject) {
    connect.query("insert into y_user(username,password,sex,phone,depart,can,name,auth,qxlbR) values(?,?,?,?,?,?,?,?,?)", [username, addPassword(password), sex, phone, depart, 1, name, 0, qxlbR], function (err) {
      if (!err) {
        reslove({
          status: 1,
          message: "添加成功！"
        });
      } else {
        console.log(err);
        reject({
          status: 0,
          message: "添加失败！"
        });
      }
    });
  });
}
/**
 * table_name 部门表
 * 添加一条部门数据
 */


function addDepart(_ref2) {
  var bumen = _ref2.bumen,
      zongji = _ref2.zongji,
      yiji = _ref2.yiji,
      erji = _ref2.erji,
      code = _ref2.code;
  return new Promise(function (reslove, reject) {
    connect.query("insert into y_depart(bumen,zongji,yiji,erji,code) values(?,?,?,?,?)", [bumen, zongji, yiji, erji, code], function (err) {
      if (!err) {
        reslove({
          status: 1,
          message: "添加成功！"
        });
      } else {
        reject({
          status: 0,
          message: "添加失败！"
        });
      }
    });
  });
}
/**
 * 根据用户名匹配用户
 */


function selectUser(username, password) {
  return new Promise(function (reslove, reject) {
    connect.query("select * from y_user where username=? and password=?", [username, addPassword(password)], function (err, data) {
      if (!err) {
        if (!data.length) {
          reslove({
            status: 0,
            message: "抱歉，用户名或密码错误！"
          });
        } else {
          var user = _objectSpread({}, data[0]);

          delete user['password'];
          var token = addjwt(user);
          user['token'] = token;
          reslove({
            status: 1,
            message: "恭喜你，登录成功！",
            data: user
          });
        }
      } else {
        reject({
          status: 0,
          message: "抱歉，查询失败！"
        });
      }
    });
  });
}
/**
 * 用户操作手册下载
 */


function selectWord() {
  return new Promise(function (reslove, reject) {
    connect.query("select * from u_word", function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: '恭喜你，查询成功！',
          list: data.length > 0 ? data.map(function (item, index) {
            item['key'] = index;
            return _objectSpread({}, item);
          }) : []
        });
      } else console.log(err);
    });
  });
}
/**
 * 查询用户肖像图 部门
 */


function selectDepartOrder() {
  return new Promise(function (reslove, reject) {
    connect.query("select * from y_user where depart!='' group by depart", function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "查询部门成功",
          list: data.length ? data.map(function (item, index) {
            item['key'] = index; //    let lists=await selectUser2Order(item['depart'])

            return _objectSpread({}, item);
          }) : []
        });
      } else {
        console.log(err);
        reject({
          status: 0,
          message: "抱歉，查询失败！"
        });
      }
    });
  });
}
/**
 * 查询用户图
 */


function selectUser2Order(depart) {
  return new Promise(function _callee(reslove, reject) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            connect.query("select * from y_user where depart=?", [depart], function (err, data) {
              if (!err) {
                reslove({
                  status: 1,
                  message: "恭喜你，查询成功！",
                  list: data.length ? data.map(function (item, index) {
                    item['key'] = index;
                    return _objectSpread({}, item);
                  }) : []
                });
              } else {
                reject({
                  status: 0,
                  message: "查询失败"
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
/**
 * 用户权限查询
 */


function selectShior(depart, type) {
  return new Promise(function (reslove, reject) {
    connect.query("select * from y_autho_depart where depart=? and autho=? limit 1", [depart, type], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "查询成功！",
          list: data.length ? _objectSpread({}, data[0]) : {}
        });
      } else {
        reject({
          status: 0,
          message: "抱歉，查询失败！"
        });
      }
    });
  });
}
/**
 *获取所有的菜单 
 */


function getAllCaidan() {
  return new Promise(function (reslove, reject) {
    connect.query("select * from y_autho where sort=2", function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "查询成功！",
          list: data.length ? data.map(function (item, index) {
            item['key'] = item['biaoshi'];
            item['title'] = item['name'];
            return item;
          }) : []
        });
      } else {
        reject({
          status: 0,
          message: "抱歉，查询失败！"
        });
      }
    });
  });
}
/**
 * 用户权限回显
 */


function selectCaidan2User(depart) {
  return new Promise(function (reslove, reject) {
    connect.query("select * from y_autho_depart where depart=?", [depart], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "恭喜你查询成功！",
          list: data.length ? data.map(function (item, index) {
            item['key'] = item['autho'];
            item['title'] = item['name'];
            return _objectSpread({}, item);
          }) : []
        });
      } else {
        console.log(err);
        reject({
          status: 0,
          message: "抱歉，查询失败！"
        });
      }
    });
  });
}
/**
 *更新权限 
 */


function updateUserOuthor(depart, oathor) {
  return new Promise(function (reslove, reject) {
    connect.query("select * from y_autho_depart where depart=? and autho=? limit 1", [depart, oathor], function (err, data) {
      if (!err) {
        if (!data.length) {
          connect.query("insert into y_autho_depart(depart,autho) values(?,?)", [depart, oathor], function (err, data) {
            if (!err) {
              reslove({
                status: 1,
                message: "恭喜你，添加成功!"
              });
            } else {
              reject({
                status: 0,
                message: "添加失败！"
              });
            }
          });
        }
      } else {
        console.log("error");
      }
    });
  });
}
/**
 * 删除所有的权限
 */


function deleteOuthor(depart) {
  return new Promise(function (relove, reject) {
    connect.query("delete from y_autho_depart where depart=?", [depart], function (err, data) {
      if (!err) {
        relove({
          status: 1,
          message: "恭喜你，删除成功！"
        });
      } else {
        reject({
          status: 0,
          message: "抱歉，删除失败！"
        });
      }
    });
  });
}
/**
 * 添加一条用户
 */


function addUserDepart(data) {
  var username = data.username,
      sex = data.sex,
      phone = data.phone,
      depart = data.depart,
      name = data.name,
      qxlbR = data.qxlbR;
  return new Promise(function (reslove, reject) {
    connect.query("insert into y_user(username,password,sex,phone,depart,can,name,auth,qxlbr) values(?,?,?,?,?,?,?,?,?)", [username, '81dc9bdb52d04dc20036dbd8313ed055', sex, phone, depart, 1, name, 0, qxlbR], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "恭喜你，添加成功！"
        });
      } else {
        console.log(err);
        reject({
          status: 0,
          message: "抱歉，添加失败！"
        });
      }
    });
  });
}
/**
 * 查询不需要授权的地址
 */


function selectNoneOath() {
  return new Promise(function (reslove, reject) {
    connect.query("select * from y_autho where contro=0", function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "恭喜你，查询成功！",
          list: data.length ? data.map(function (item) {
            return _objectSpread({}, item);
          }) : []
        });
      } else {
        reject({
          status: 0,
          message: "抱歉，查询失败"
        });
      }
    });
  });
}
/**
 * 查询所有地址权限
 */


function selectAllOath() {
  return new Promise(function (reslove, reject) {
    connect.query("select * from y_autho order by sort", function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "恭喜你，查询成功！",
          list: data.length ? data.map(function (item, index) {
            item['key'] = index;
            return _objectSpread({}, item);
          }) : []
        });
      } else {
        reject({
          status: 0,
          message: "抱歉，查询数据失败！"
        });
      }
    });
  });
}
/**
 * 根据id更改权限
 */


function alterOath(id, contro) {
  return new Promise(function (reslove, reject) {
    connect.query("update y_autho set contro=? where id=?", [contro, id], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "恭喜你，更新成功！"
        });
      } else {
        console.log(err);
        reject({
          status: 0,
          message: "抱歉，更新失败！"
        });
      }
    });
  });
}
/**
 * 加入一条新的路由权限
 */


function addOnePath(data) {
  var name = data.name,
      path = data.path,
      biaoshi = data.biaoshi,
      sort = data.sort,
      contro = data.contro;
  return new Promise(function (reslove, reject) {
    connect.query("insert into y_autho(name,path,biaoshi,sort,contro) values(?,?,?,?,?)", [name, path, biaoshi, sort, contro], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "恭喜你，添加成功！"
        });
      } else {
        console.log(err);
        reject({
          status: 0,
          message: "抱歉，添加失败！"
        });
      }
    });
  });
}
/**
 * 添加日历提醒
 */


function addTixing(data) {
  var year = data.year,
      month = data.month,
      date = data.date,
      uid = data.uid,
      content = data.content,
      status = data.status,
      start = data.start;
  return new Promise(function (reslove, reject) {
    connect.query("insert into s_tixing(content,status,start,year,month,date,uid) values(?,?,?,?,?,?,?)", [content, status, start, year, month, date, uid], function (err, data) {
      if (!err) {
        reslove({
          'status': 1,
          message: "加入成功！"
        });
      } else {
        reject({
          'status': 0,
          message: "抱歉，加入失败！"
        });
      }
    });
  });
}

module.exports = {
  addDepart: addDepart,
  addUser: addUser,
  selectUser: selectUser,
  selectWord: selectWord,
  selectDepartOrder: selectDepartOrder,
  selectUser2Order: selectUser2Order,
  selectShior: selectShior,
  getAllCaidan: getAllCaidan,
  selectCaidan2User: selectCaidan2User,
  updateUserOuthor: updateUserOuthor,
  deleteOuthor: deleteOuthor,
  addUserDepart: addUserDepart,
  selectNoneOath: selectNoneOath,
  selectAllOath: selectAllOath,
  alterOath: alterOath,
  addOnePath: addOnePath,
  addTixing: addTixing
};