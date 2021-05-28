"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var connect = require("../sqlDb17");
/**
 * 查询客户资料
 * 根据用户编码查询客户资料
 * Customer
 * @returns 
 */


function selectKehu(bianma) {
  return new Promise(function (reslove, reject) {
    connect.then(function (resp) {
      resp.query("select  * from dbo.Customer where cCusCode='".concat(bianma, "'")).then(function (r) {
        return reslove({
          status: 1,
          message: "查询客户成功！",
          data: r['recordset'][0]
        });
      })["catch"](function (e) {
        return reject({
          status: 0,
          message: "抱歉，查询失败！"
        });
      });
    });
  });
}
/**
 * 
 * @param {*} iYPeriod 
 * @returns 
 */


function selectVendor(bianma) {
  return new Promise(function (reslove, reject) {
    connect.then(function (resp) {
      resp.query("select  * from dbo.Vendor where cVenCode='".concat(bianma, "'")).then(function (r) {
        return reslove({
          status: 1,
          message: "查询客户成功！",
          data: r['recordset'][0]
        });
      })["catch"](function (e) {
        return reject({
          status: 0,
          message: "抱歉，查询失败！"
        });
      });
    });
  });
}
/**
 * 查询客户科目余额表
 * 预收 应收
 * @argument 年份 编码
 */


function selectKehuKemu(iYPeriod) {
  if (!iYPeriod) {
    var d = new Date();
    var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    iYPeriod = d.getFullYear() + "" + month;
  }

  return new Promise(function (reslove, reject) {
    connect.then(function (resp) {
      resp.query("select i_id, ccode,ccus_id,iperiod,me,cendd_c,cCusName,cCusCreditCompany,dCusCreateDatetime,dRecentDeliveryDate,mb,iyear from dbo.GL_accass ass left join dbo.Customer c on ass.ccus_id=c.cCusCode where ccode='213101' and iYPeriod='".concat(iYPeriod, "'")).then(function (r) {
        var content = r['recordset'];
        var yinshou = content.filter(function (item, index) {
          item['key'] = index;
          return item['cendd_c'] === '借';
        });
        var yushou = content.filter(function (item, index) {
          item['key'] = index;
          return item['cendd_c'] === '贷';
        });
        reslove({
          status: 1,
          message: "查询成功",
          yushou: yushou,
          yinshou: yinshou
        });
      })["catch"](function (e) {
        return reject({
          status: 0,
          message: "抱歉，查询失败！"
        });
      });
    });
  });
}
/**
 * 查询供应商科目余额表
 * 借 预付
 */


function selectGyshangYufu(iYPeriod) {
  if (!iYPeriod) {
    var d = new Date();
    var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    iYPeriod = d.getFullYear() + "" + month;
  }

  return new Promise(function (reslove, reject) {
    connect.then(function (resp) {
      resp.query("select i_id,ccode,mb,cVenName,dModifyDate,me,cendd_c,iyear,iperiod from  dbo.GL_accass ass left join dbo.Vendor c on ass.csup_id=c.cVenCode where ccode='115101' and iYPeriod='".concat(iYPeriod, "' and cendd_c='\u501F'")).then(function (r) {
        return reslove({
          status: 1,
          message: "预付数据查询成功",
          list: r['recordset'].length ? r['recordset'].map(function (item, index) {
            item['key'] = index;
            return _objectSpread({}, item);
          }) : [],
          size: r['rowsAffected'][0]
        });
      })["catch"](function (e) {
        return reject({
          status: 0,
          message: "抱歉，查询失败！"
        });
      });
    })["catch"](function (e) {
      reject({
        status: 0,
        message: "抱歉，查询失败！"
      });
    });
  });
}
/**
 * 查询供应商科目余额表
 * 贷 应付
 */


function selectGyshangYingFu(iYPeriod) {
  if (!iYPeriod) {
    var d = new Date();
    var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    iYPeriod = d.getFullYear() + "" + month;
  }

  return new Promise(function (reslove, reject) {
    connect.then(function (resp) {
      resp.query("select i_id,ccode,mb,cVenName,dModifyDate,me,cendd_c,iyear,iperiod from  dbo.GL_accass ass left join dbo.Vendor c on ass.csup_id=c.cVenCode where ccode in (212101,115101) and iYPeriod='".concat(iYPeriod, "' and cendd_c='\u8D37'")).then(function (r) {
        return reslove({
          status: 1,
          message: "应付数据查询成功",
          list: r['recordset'].length ? r['recordset'].map(function (item, index) {
            item['key'] = index;
            return _objectSpread({}, item);
          }) : [],
          size: r['rowsAffected'][0]
        });
      })["catch"](function (e) {
        return reject({
          status: 0,
          message: "抱歉，查询失败！"
        });
      });
    })["catch"](function (e) {
      reject({
        status: 0,
        message: "抱歉，查询失败！"
      });
    });
  });
}
/**
 * 查询其他应收
 * 发生额及余额表
 */


function selectOther(iYPeriod) {
  if (!iYPeriod) {
    var d = new Date();
    var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    iYPeriod = d.getFullYear() + "" + month;
  } //i_id,ccode,cdept_id,cperson_id,cPersonName,iperiod,cendd_c,mb,csup_id,iyear,cVenName,cCusName 


  return new Promise(function (reslove, reject) {
    connect.then(function (resp) {
      resp.query("select i_id,ccode,cdept_id,cperson_id,cPersonName,iperiod,cendd_c,mb,me,csup_id,iyear,cVenName,cCusName,cDepName  \n            from dbo.GL_accass ass \n            left join dbo.Person p on ass.cperson_id=p.cPersonCode \n            left join dbo.Vendor c on ass.csup_id=c.cVenCode \n            left join dbo.Customer d on ass.ccus_id=d.cCusCode \n            left join dbo.Department e on e.cDepCode=ass.cdept_id\n            where ccode in (113302,113301,11330301) and iYPeriod=".concat(iYPeriod)).then(function (r) {
        reslove({
          status: 1,
          message: "查询其他内容成功！",
          list: r['recordset'].length ? r['recordset'].map(function (item, index) {
            item['key'] = index;
            item['qimo'] = item['cendd_c'] === '贷' ? -item['me'] : item['me'];
            return _objectSpread({}, item);
          }) : []
        });
      })["catch"](function (e) {
        return reject({
          status: 0,
          message: "查询其他应收失败！"
        });
      });
    })["catch"](function (e) {
      return reject({
        status: 0,
        message: "查询其他应收失败！"
      });
    });
  });
}

module.exports = {
  selectKehuKemu: selectKehuKemu,
  selectGyshangYingFu: selectGyshangYingFu,
  selectGyshangYufu: selectGyshangYufu,
  selectOther: selectOther
};