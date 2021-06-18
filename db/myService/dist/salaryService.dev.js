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
      resp.query("select * from Workshop").then(function (d) {
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
      r.query("select * from Person").then(function (d) {
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
  return regeneratorRuntime.async(function selectAllNews$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(selectWorkshop());

        case 3:
          work = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(selectTeam());

        case 6:
          team = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(selectPerson());

        case 9:
          person = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(selectProcess());

        case 12:
          process = _context.sent;
          _context.next = 15;
          return regeneratorRuntime.awrap(selectProject());

        case 15:
          project = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(selectSubsidyProject());

        case 18:
          subsidyProject = _context.sent;
          _context.next = 21;
          return regeneratorRuntime.awrap(selectHY_Department());

        case 21:
          HY_Department = _context.sent;
          return _context.abrupt("return", {
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
          _context.prev = 25;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", {
            status: 0,
            message: "查询失败！"
          });

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 25]]);
}

module.exports = {
  selectAllNews: selectAllNews
};