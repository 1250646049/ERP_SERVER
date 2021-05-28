"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var jwt = require("jsonwebtoken"); // 加密token


function addjwt(data, content) {
  if (content) {
    return jwt.sign(data, "lhyveryshuai", {
      expiresIn: "7d"
    });
  }

  return jwt.sign(data, 'lhy', {
    expiresIn: "7d"
  });
} // 解密token


function devjwt(datas) {
  var data = "";

  try {
    data = {
      data: _objectSpread({}, jwt.verify(datas, "lhy"))
    };
  } catch (_unused) {
    data = {
      error: 1,
      message: "token过期"
    };
  }

  return data.error ? data : _objectSpread({}, data.data);
} // 判断啊token是否过期
// 判断请求头是否有token


function TokenLogin(headers) {
  return new Promise(function (resove, reject) {
    var Authetication = headers["authetication"];

    if (Authetication) {
      Authetication = Authetication.indexOf("Bearer") != -1 ? Authetication.slice(7) : Authetication;
      var result = devjwt(Authetication);
      var data = null;

      if (!result.error) {
        data = {
          status: 1,
          user: _objectSpread({}, result)
        };
        data["user"].token = Authetication;
      } else data = result;

      resove(data);
    } else {
      reject({
        error: 1,
        message: "抱歉，您无权限访问！"
      });
    }
  });
} // 解密token


function devUserjwt(datas) {
  var data = "";

  try {
    data = {
      data: _objectSpread({}, jwt.verify(datas, "lhyveryshuai"))
    };
  } catch (_unused2) {
    data = {
      error: 1,
      message: "token过期"
    };
  }

  return data.error ? data : _objectSpread({}, data.data);
}

module.exports = {
  addjwt: addjwt,
  devjwt: devjwt,
  TokenLogin: TokenLogin,
  devUserjwt: devUserjwt
};