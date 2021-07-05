"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var axios = require("axios");

var _require = require("../../utils/serverConfig"),
    sql017 = _require.sql017,
    sql003 = _require.sql003; // 远程调用获取资源


function getYingshoukuan(number) {
  return new Promise(function (reslove, reject) {
    axios.get(sql017 + "/selectYinshou", {
      params: {
        number: number
      }
    }).then(function (r) {
      return reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      return reject({
        status: 0,
        message: "抱歉，查询失败！"
      });
    });
  });
} // 远程调用获取资源 搜索 017账套


function searchYingshoukuan(type, search) {
  return new Promise(function (reslove, reject) {
    axios.get(sql017 + "/searchYinshou", {
      params: {
        type: type,
        search: search
      }
    }).then(function (r) {
      return reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      return reject({
        status: 0,
        message: "抱歉，查询失败！"
      });
    });
  });
} // 远程调用获取资源 搜索 003账套


function searchYingshoukuan003(type, search) {
  return new Promise(function (reslove, reject) {
    axios.get(sql003 + "/searchYinshou", {
      params: {
        type: type,
        search: search
      }
    }).then(function (r) {
      return reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      return reject({
        status: 0,
        message: "抱歉，查询失败！"
      });
    });
  });
} // 远程调用获取资源 搜索 查询账套


function getYingshoukuan003() {
  return new Promise(function (reslove, reject) {
    axios.get(sql003 + "/selectYinshou", {}).then(function (r) {
      return reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      return reject({
        status: 0,
        message: "抱歉，查询失败！"
      });
    });
  });
}

module.exports = {
  getYingshoukuan: getYingshoukuan,
  searchYingshoukuan: searchYingshoukuan,
  searchYingshoukuan003: searchYingshoukuan003,
  getYingshoukuan003: getYingshoukuan003
};