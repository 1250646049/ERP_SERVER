"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var connect = require("../sqlDb10");

var Myconnect = require("../mysqlDb");
/**
 * 关联查询销售订单主表 销售订单子表
 * zhu.cSOCode,zhu.cPersonCode,zhu.cMaker,zhu.cVerifier,zhu.dDate,zhu.cChecker,zi.fnattaxpasum,zi.ftaxpasum,zi.iQuantity,zi.iTaxUnitPrice,zi.iSum,zi.iMoney,zi.cCusInvName,zhu.cCusName
 */


function selectOrders(number) {
  if (!number) number = 10;
  return new Promise(function (reslove, reject) {
    connect.then(function _callee(resp) {
      var count;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(selectCount());

            case 2:
              count = _context.sent;
              resp.query("select top ".concat(number, " zi.AutoID ,zi.SBVID,per.cPersonName, cu.cCusAbbName,zhu.cSOCode,zhu.cPersonCode,zhu.dDate,zhu.cChecker,zi.iQuantity,zi.iTaxUnitPrice,zi.iSum,zi.iMoney,zhu.cCusName,zhu.cCusCode\n         from dbo.SaleBillVouch zhu\n         right join dbo.SaleBillVouchs zi on zhu.SBVID=zi.SBVID\n         left join dbo.Person per on zhu.cPersonCode=per.cPersonCode\n         left join dbo.Customer cu on cu.cCusCode=zhu.cCusCode \n         order by dDate desc")).then(function (r) {
                var data = r['recordset']; // reslove({
                //     status: 1,
                //     message: "查询成功！",
                //     list: data.map((item,index)=>{
                //         item['key']=index;    
                //         return {...item};
                //     }),
                //     size: data.length,
                //     total: count.data
                // })

                var flag = false;
                data.forEach(function (item, index) {
                  (function (item) {
                    Myconnect.query("select * from w_yinshou where AutoId=? order by number asc", [item['AutoID']], function (err, d) {
                      if (!err) {
                        flag = true;
                        item['mysql'] = d.map(function (item, index) {
                          item['key'] = index;
                          return _objectSpread({}, item);
                        });
                        item['key'] = item['AutoID'];

                        if (data.length - 1 == index) {
                          reslove({
                            status: 1,
                            message: "查询成功！",
                            list: data,
                            size: data.length,
                            total: count.data
                          });
                        }
                      } else {
                        reject({
                          status: 0,
                          message: "抱歉，查询失败！",
                          list: []
                        });
                      }
                    });
                  })(item);
                });
              })["catch"](function (e) {
                reject({
                  status: 0,
                  message: "抱歉，查询失败！",
                  list: []
                });
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  });
}
/**
 * 查询总数
 */


function selectCount() {
  return new Promise(function (reslove, reject) {
    connect.then(function (resp) {
      resp.query("select count(*)\n             from dbo.SaleBillVouch zhu\n             right join dbo.SaleBillVouchs zi on zhu.SBVID=zi.SBVID\n             left join dbo.Customer cu on cu.cCusCode=zhu.cCusCode \n            ").then(function (r) {
        reslove({
          status: 1,
          data: r['recordset'][0]['']
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "抱歉，查询失败！",
          list: []
        });
      });
    });
  });
}

module.exports = {
  selectOrders: selectOrders
};