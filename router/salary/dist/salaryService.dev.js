"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var axios = require("axios");

var _require = require("../../utils/serverConfig"),
    Wage = _require.Wage;

var qs = require("qs");

var connect = require("../../db/mysqlDb"); // 用axios实例化的方式更新post请求


var instance = axios.create({});
instance.interceptors.request.use(function (config) {
  config['data'] = qs.stringify(config['data']);
  return config;
}); // 远程调用资源查询

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
} // 调用资源更新workShop


function updateWorkshop(WorkshopName, workCode) {
  return new Promise(function (reslove, reject) {
    instance.post(Wage + "/salary/updateWorkshop", {
      WorkshopName: WorkshopName,
      workCode: workCode
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function () {
      reject({
        status: 0,
        message: "更新失败！"
      });
    });
  });
} // 调用远程资源添加一条workShop


function insertWorkshop(WorkshopName, bm) {
  return new Promise(function (reslove, reject) {
    instance.post(Wage + "/salary/addContent", {
      WorkshopName: WorkshopName,
      bm: bm
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject({
        status: 0,
        message: "添加失败"
      });
    });
  });
} // 调用远程资源添加一条Team


function insertTeam(WorkshopCode, TeamName, number, bm) {
  return new Promise(function (reslove, reject) {
    instance.post(Wage + "/salary/addTeam", {
      WorkshopCode: WorkshopCode,
      TeamName: TeamName,
      number: number,
      bm: bm
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject({
        status: 0,
        message: "抱歉，添加item班组信息失败！"
      });
    });
  });
} // 远程调用资源修改一条Team


function alterTeam(TeamCode, WorkshopCode, TeamName, number, bm) {
  return new Promise(function (reslove, reject) {
    instance.post(Wage + "/salary/alterTeam", {
      TeamCode: TeamCode,
      WorkshopCode: WorkshopCode,
      TeamName: TeamName,
      number: number,
      bm: bm
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject({
        status: 0,
        message: "修改失败！"
      });
    });
  });
} // 远程调用资源插入一条数据


function insertPerson(PersonCode, PersonName, WorkshopCode, Teamcode) {
  return new Promise(function (reslove, reject) {
    instance.post(Wage + "/salary/insertPerson", {
      PersonCode: PersonCode,
      PersonName: PersonName,
      WorkshopCode: WorkshopCode,
      Teamcode: Teamcode
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 远程调用资源修改员工信息


function updatePerson(PersonCode, PersonName, WorkshopCode, Teamcode) {
  return new Promise(function (reslove, reject) {
    instance.post(Wage + "/salary/updatePersonById", {
      PersonCode: PersonCode,
      PersonName: PersonName,
      WorkshopCode: WorkshopCode,
      Teamcode: Teamcode
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 远程调用查询所有员工信息


function selectPerson() {
  return new Promise(function (reslove, reject) {
    instance.get(Wage + "/salary/selectPerson").then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      console.log(e);
      reject(_objectSpread({}, e.data));
    });
  });
} // 远程调用资源插入一条工序


function insertProcess(cj, Code, Name, UnitPrice, bm) {
  return new Promise(function (reslove, reject) {
    instance.post(Wage + "/salary/insertProcess", {
      cj: cj,
      Code: Code,
      Name: Name,
      UnitPrice: UnitPrice,
      bm: bm
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 远程调用资源更新一条工序


function updateProcess(cj, Code, Name, UnitPrice, bm) {
  return new Promise(function (reslove, reject) {
    instance.post(Wage + "/salary/updateProcess", {
      cj: cj,
      Code: Code,
      Name: Name,
      UnitPrice: UnitPrice,
      bm: bm
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 计时项目
// 添加


function insertProject(ParentCode, ProjectName, Money, bm) {
  return new Promise(function (reslove, reject) {
    instance.post(Wage + "/salary/insertProject", {
      ParentCode: ParentCode,
      ProjectName: ProjectName,
      Money: Money,
      bm: bm
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 修改


function updateProject(ParentCode, ProjectCode, ProjectName, Money, bm) {
  return new Promise(function (reslove, reject) {
    instance.post(Wage + "/salary/updateProject", {
      ParentCode: ParentCode,
      ProjectCode: ProjectCode,
      ProjectName: ProjectName,
      Money: Money,
      bm: bm
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 补贴项目
// 添加


function insertSubsidyProject(SubsidyName, Price, bm) {
  return new Promise(function (reslove, reject) {
    instance.post(Wage + "/salary/SubsidyProject", {
      SubsidyName: SubsidyName,
      Price: Price,
      bm: bm
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 修改


function updateSubsidyProject(Id, SubsidyName, Price, bm) {
  return new Promise(function (reslove, reject) {
    instance.post(Wage + "/salary/updateSubsidyProject", {
      Id: Id,
      SubsidyName: SubsidyName,
      Price: Price,
      bm: bm
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 请假类别
// 添加


function insertHY_Department(d_Name, bm) {
  return new Promise(function (reslove, reject) {
    instance.post(Wage + "/salary/insertHY_Department", {
      d_Name: d_Name,
      bm: bm
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 查询总工序


function selectSalary_Main(number) {
  return new Promise(function (reslove, reject) {
    instance.get(Wage + "/salary/selectSalary_Main", {
      params: {
        number: number
      }
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.error));
    });
  });
} // 根据工序id查询工序


function selectSalary_code(kqcode) {
  return new Promise(function (reslove, reject) {
    instance.get(Wage + "/salary/selectSalary_code", {
      params: {
        kqcode: kqcode
      }
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(function (e) {
        e.data;
      });
    });
  });
} // 搜索所有工序
// 查询所有结果


function select_contents() {
  return new Promise(function (reslove, reject) {
    instance.get(Wage + "/selectSalary_code").then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, r.error));
    });
  });
} // search内容


function search_content(yibu, erbu, type, content, startTime, endTime) {
  return new Promise(function (reslove, reject) {
    instance.get(Wage + "/salary/select_contents", {
      params: {
        yibu: yibu,
        erbu: erbu,
        type: type,
        content: content,
        startTime: startTime,
        endTime: endTime
      }
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 查询考勤信息


function select_kaoqing(number, yibu, erbu, startTime, endTime, personCode) {
  return new Promise(function (reslove, reject) {
    instance.get(Wage + "/salary/select_kaoqing", {
      params: {
        number: number,
        yibu: yibu,
        erbu: erbu,
        startTime: startTime,
        endTime: endTime,
        personCode: personCode
      }
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 查询请假信息


function select_qingjia(number, yibu, erbu, startTime, endTime, personCode) {
  return new Promise(function (reslove, reject) {
    instance.get(Wage + "/salary/select_qingjia", {
      params: {
        number: number,
        yibu: yibu,
        erbu: erbu,
        startTime: startTime,
        endTime: endTime,
        personCode: personCode
      }
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 查询薪资汇总


function select_salary_total(yibu, erbu, startTime, endTime, personCode) {
  return new Promise(function (reslove, reject) {
    instance.get(Wage + "/salary/selectSalayTotal", {
      params: {
        yibu: yibu,
        erbu: erbu,
        startTime: startTime,
        endTime: endTime,
        personCode: personCode
      }
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 远程查询部门薪资汇总


function select_depart_salary(WorkshopName, bm, startTime, endTime) {
  return new Promise(function (reslove, reject) {
    instance.get(Wage + "/salary/selectWorkNumbers", {
      params: {
        WorkshopName: WorkshopName,
        bm: bm,
        startTime: startTime,
        endTime: endTime
      }
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 远程查询问题处理单


function select_problem(startTime, endTime) {
  return new Promise(function (reslove, reject) {
    instance.get(Wage + "/salary/selectProblem", {
      params: {
        startTime: startTime,
        endTime: endTime
      }
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 远程查询财务考勤


function select_caiwu_kaoqing(yibu, erbu, startTime, endTime) {
  return new Promise(function (reslove, reject) {
    instance.get(Wage + "/salary/selectCaiwu", {
      params: {
        yibu: yibu,
        erbu: erbu,
        startTime: startTime,
        endTime: endTime
      }
    }).then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
} // 远程查询所有订单信息


function selectAllOrders() {
  return new Promise(function (reslove, reject) {
    instance.get(Wage + "/salary/selectOrders").then(function (r) {
      reslove(_objectSpread({}, r.data));
    })["catch"](function (e) {
      reject(_objectSpread({}, e.data));
    });
  });
}

module.exports = {
  selectAllNews: selectAllNews,
  deleteContent: deleteContent,
  updateWorkshop: updateWorkshop,
  insertWorkshop: insertWorkshop,
  insertTeam: insertTeam,
  alterTeam: alterTeam,
  insertPerson: insertPerson,
  updatePerson: updatePerson,
  selectPerson: selectPerson,
  insertProcess: insertProcess,
  updateProcess: updateProcess,
  insertProject: insertProject,
  insertSubsidyProject: insertSubsidyProject,
  insertHY_Department: insertHY_Department,
  updateSubsidyProject: updateSubsidyProject,
  updateProject: updateProject,
  selectSalary_Main: selectSalary_Main,
  selectSalary_code: selectSalary_code,
  select_contents: select_contents,
  search_content: search_content,
  select_kaoqing: select_kaoqing,
  select_qingjia: select_qingjia,
  select_salary_total: select_salary_total,
  select_depart_salary: select_depart_salary,
  select_problem: select_problem,
  select_caiwu_kaoqing: select_caiwu_kaoqing,
  selectAllOrders: selectAllOrders
};