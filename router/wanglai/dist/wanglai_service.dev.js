"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var axios = require("axios");

var _require = require("../../utils/serverConfig"),
    sql017 = _require.sql017; // 远程调用获取资源


function getWanglai(type, time) {
  return new Promise(function (reslove, reject) {
    axios.get(sql017 + "/wanglai", {
      params: {
        type: type,
        time: time
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
}

module.exports = {
  getWanglai: getWanglai
};