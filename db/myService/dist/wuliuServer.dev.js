"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var connect = require("../mysqlDb"); // 查询物流到货预测邮箱发送


function getEmail() {
  var person = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'cb';
  return new Promise(function (reslove, reject) {
    connect.query("select * from w_emails where perpson=?", [person], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "恭喜你查询成功！",
          data: _objectSpread({}, data[0])
        });
      } else {
        reject({
          status: 0,
          message: "抱歉，查询失败！",
          data: []
        });
      }
    });
  });
} // 添加内容 物流到货预计


function setEmail(content) {
  var username = content.username,
      password = content.password,
      sendEmail = content.sendEmail,
      shouEmail = content.shouEmail,
      subject = content.subject;
  return new Promise(function (reslove, reject) {
    connect.query("update w_emails set username=?,password=?,sendEmail=?,shouEmail=?,subject=? where perpson='cb'", [username, password, sendEmail, shouEmail, subject], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "恭喜你，添加成功！"
        });
      } else {
        reject({
          status: 0,
          message: "抱歉，添加失败"
        });
      }
    });
  });
} // 更新上传模板设置


function setMoban(moban) {
  return new Promise(function (reslove, reject) {
    connect.query("update  w_emails set moban=?,times=? where perpson='cb'", [moban, ""], function (err, data) {
      if (!err) {
        reslove({
          status: 1,
          message: "success"
        });
      } else {
        reject({
          status: 0,
          message: "error"
        });
      }
    });
  });
} // 查询所有预测信息


module.exports = {
  getEmail: getEmail,
  setEmail: setEmail,
  setMoban: setMoban
};