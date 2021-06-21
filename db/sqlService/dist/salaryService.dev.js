"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require("express"),
    json = _require.json;

var connect = require("../WageDb"); // 查询车间信息


function selectWorkshop() {
  return new Promise(function (reslove, reject) {
    connect.then(function (resp) {
      resp.query("select * from Workshop order by WorkshopCode asc").then(function (d) {
        reslove({
          status: 1,
          message: "查询成功！",
          Work: d['recordset'].length ? d['recordset'].map(function (item, index) {
            item['key'] = index;
            return _objectSpread({}, item);
          }) : []
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "查询失败！"
        });
      });
    });
  });
} // 更新车间信息


function updateWorkshop(WorkshopName, workCode) {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("update Workshop set WorkshopName='".concat(WorkshopName, "' where WorkshopCode='").concat(workCode, "'")).then(function (d) {
        reslove({
          status: 1,
          message: "更新成功！"
        });
      })["catch"](function (e) {
        console.log(e);
        reject({
          status: 0,
          message: "更新失败！"
        });
      });
    });
  });
} // 添加一条车间信息


function addWorkshop(WorkshopName, bm) {
  var _ref, Work, code, type;

  return regeneratorRuntime.async(function addWorkshop$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(selectWorkshop());

        case 2:
          _ref = _context.sent;
          Work = _ref.Work;
          code = 123;

          if (Work[Work.length - 1]) {
            code = Work[Work.length - 1]['WorkshopCode'];
            code = Number(code.split("CJ")[1]);
            code += 1;
            type = code <= 999 ? '0' + code : code;
            code = "CJ" + type;
          }

          return _context.abrupt("return", new Promise(function (reslove, reject) {
            connect.then(function (r) {
              r.query("insert into Workshop(WorkshopCode,WorkshopName,bm) values('".concat(code, "','").concat(WorkshopName, "','").concat(bm, "')")).then(function (r) {
                reslove({
                  status: 1,
                  message: "插入数据成功！"
                });
              })["catch"](function (e) {
                reject({
                  status: 0,
                  message: "插入数据失败！"
                });
              });
            });
          }));

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
} // 查询班组信息


function selectTeam() {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("select * from Team t left join Workshop w on t.WorkshopCode=w.WorkshopCode").then(function (d) {
        reslove({
          status: 1,
          message: "查询成功！",
          Team: d['recordset'].length ? d['recordset'].map(function (item, index) {
            item['key'] = index;
            return _objectSpread({}, item);
          }) : []
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "查询失败！"
        });
      });
    });
  });
} // 查询所有员工信息


function selectPerson() {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("select * from Person p \n            left join Workshop w on p.WorkshopCode=w.WorkshopCode \n            left join Team t on t.TeamCode=p.TeamCode").then(function (d) {
        reslove({
          status: 1,
          message: "查询成功！",
          Person: d['recordset'].length ? d['recordset'].map(function (item, index) {
            item['key'] = index;
            return _objectSpread({}, item);
          }) : []
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "查询失败！"
        });
      });
    });
  });
} // 查询工序工价


function selectProcess() {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("select * from Process").then(function (d) {
        reslove({
          status: 1,
          message: "查询成功！",
          Process: d['recordset'].length ? d['recordset'].map(function (item, index) {
            item['key'] = index;
            return _objectSpread({}, item);
          }) : []
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "查询失败！"
        });
      });
    });
  });
} // 查询计时项目
// Project


function selectProject() {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("select * from Project").then(function (d) {
        reslove({
          status: 1,
          message: "查询成功！",
          Project: d['recordset'].length ? d['recordset'].map(function (item, index) {
            item['key'] = index;
            return _objectSpread({}, item);
          }) : []
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "查询失败！"
        });
      });
    });
  });
} // 补贴项目 
// SubsidyProject


function selectSubsidyProject() {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("select * from SubsidyProject").then(function (d) {
        reslove({
          status: 1,
          message: "查询成功！",
          SubsidyProject: d['recordset'].length ? d['recordset'].map(function (item, index) {
            item['key'] = index;
            return _objectSpread({}, item);
          }) : []
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "查询失败！"
        });
      });
    });
  });
} // 请假类别
// HY_Department


function selectHY_Department() {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("select * from HY_Department").then(function (d) {
        reslove({
          status: 1,
          message: "查询成功！",
          HY_Department: d['recordset'].length ? d['recordset'].map(function (item, index) {
            item['key'] = index;
            return _objectSpread({}, item);
          }) : []
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "查询失败！"
        });
      });
    });
  });
} // 整合所有内容 信息维护


function selectAllNews() {
  var work, team, person, process, project, subsidyProject, HY_Department;
  return regeneratorRuntime.async(function selectAllNews$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(selectWorkshop());

        case 3:
          work = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap(selectTeam());

        case 6:
          team = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(selectPerson());

        case 9:
          person = _context2.sent;
          _context2.next = 12;
          return regeneratorRuntime.awrap(selectProcess());

        case 12:
          process = _context2.sent;
          _context2.next = 15;
          return regeneratorRuntime.awrap(selectProject());

        case 15:
          project = _context2.sent;
          _context2.next = 18;
          return regeneratorRuntime.awrap(selectSubsidyProject());

        case 18:
          subsidyProject = _context2.sent;
          _context2.next = 21;
          return regeneratorRuntime.awrap(selectHY_Department());

        case 21:
          HY_Department = _context2.sent;
          return _context2.abrupt("return", {
            status: 1,
            message: "查询成功！",
            work: work['Work'],
            team: team['Team'],
            person: person['Person'],
            process: process['Process'],
            project: project['Project'],
            subsidyProject: subsidyProject['SubsidyProject'],
            HY_Department: HY_Department['HY_Department']
          });

        case 25:
          _context2.prev = 25;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", {
            status: 0,
            message: "查询失败！"
          });

        case 28:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 25]]);
} // 拼接sql语句删除对应字段


function DeleteContent(data, type, code) {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("delete from ".concat(data, " where ").concat(type, "='").concat(code, "'")).then(function (d) {
        reslove({
          status: 1,
          message: "删除失败！"
        });
      })["catch"](function (e) {
        console.log(e);
        reject({
          status: 0,
          message: "删除失败！"
        });
      });
    });
  });
}

module.exports = {
  selectAllNews: selectAllNews,
  DeleteContent: DeleteContent,
  updateWorkshop: updateWorkshop,
  addWorkshop: addWorkshop
};