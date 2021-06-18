"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var axios = require("axios");

var _require = require("../../utils/serverConfig"),
    Wage = _require.Wage; // 远程调用资源查询


function selectAllNews() {
  return new Promise(function (reslove, reject) {
    axios.get(Wage + "/salary/selectAllNews").then(function (r) {
      reslove({
        status: 1,
        message: "查询成功！",
        data: _objectSpread({}, r.data)
      });
    })["catch"](function (e) {
      reject({
        status: 0,
        message: "查询失败！"
      });
    });
  });
} // 远程调用资源删除
// /salary/deleteContent


function deleteContent(data, type, code) {
  return new Promise(function (reslove, reject) {
    axios.get(Wage + "/salary/deleteContent", {
      params: {
        data: data,
        type: type,
        code: code
      }
    }).then(function (r) {
      reslove({
        status: 1,
        message: "删除成功！"
      });
    })["catch"](function (e) {
      reject({
        status: 0,
        message: "删除失败！"
      });
    });
  });
}

module.exports = {
  selectAllNews: selectAllNews,
  deleteContent: deleteContent
};