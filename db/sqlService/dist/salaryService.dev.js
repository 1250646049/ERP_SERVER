"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      r.query("select * from Team t left join Workshop w on t.WorkshopCode=w.WorkshopCode order by t.TeamCode asc").then(function (d) {
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
} // 添加一条班组信息


function addTeam(WorkshopCode, TeamName, number, bm) {
  var _ref2, Team, code, type;

  return regeneratorRuntime.async(function addTeam$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(selectTeam());

        case 2:
          _ref2 = _context2.sent;
          Team = _ref2.Team;

          if (Team[Team.length - 1]) {
            code = Team[Team.length - 1]['TeamCode'];
            code = Number(code.split("CJ")[1]);
            code += 1;
            type = code <= 999 ? '0' + code : code;
            code = "CJ" + type;
          }

          return _context2.abrupt("return", new Promise(function (reslove, reject) {
            connect.then(function (r) {
              r.query("insert into Team(TeamCode,WorkshopCode,TeamName,number,bm) values('".concat(code, "','").concat(WorkshopCode, "','").concat(TeamName, "','").concat(number, "','").concat(bm, "')")).then(function (d) {
                reslove({
                  status: 1,
                  message: "恭喜你，添加班组信息成功！"
                });
              })["catch"](function (e) {
                reject({
                  status: 0,
                  message: "抱歉，添加班组信息失败！"
                });
              });
            });
          }));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
} // 修改一条班组信息


function alterTeam(TeamCode, WorkshopCode, TeamName, number, bm) {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("update Team set WorkshopCode='".concat(WorkshopCode, "',TeamName='").concat(TeamName, "',number='").concat(number, "',bm='").concat(bm, "' where TeamCode='").concat(TeamCode, "'")).then(function (d) {
        reslove({
          status: 1,
          message: "恭喜你，修改班组信息成功！"
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "抱歉，修改班组信息失败！"
        });
      });
    });
  });
} // 查询所有员工信息


function selectPerson() {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("select p.PersonCode,p.PersonName,w.WorkshopCode,w.WorkshopName,t.TeamCode,t.TeamName from Person p \n            left join Workshop w on p.WorkshopCode=w.WorkshopCode \n            left join Team t on t.TeamCode=p.TeamCode\n            order by p.PersonCode asc \n            ").then(function (d) {
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
} // 添加一条员工内容


function insertPerson(PersonCode, PersonName, WorkshopCode, Teamcode) {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("insert into Person(PersonCode,PersonName,WorkshopCode,Teamcode) values('".concat(PersonCode, "','").concat(PersonName, "','").concat(WorkshopCode, "','").concat(Teamcode, "')")).then(function (_) {
        reslove({
          status: 1,
          message: "插入数据成功！"
        });
      })["catch"](function (_) {
        console.log(_);
        reject({
          status: 0,
          message: "插入数据失败！"
        });
      });
    });
  });
} // 修改指定的员工


function updatePersonById(PersonCode, PersonName, WorkshopCode, Teamcode) {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("update Person set PersonName='".concat(PersonName, "',WorkshopCode='").concat(WorkshopCode, "',Teamcode='").concat(Teamcode, "' where PersonCode='").concat(PersonCode, "'")).then(function (r) {
        reslove({
          status: 1,
          message: "恭喜你，修改成功！"
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "抱歉，修改失败！"
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
} // 添加一条工序内容


function insertProcess(cj, Code, Name, UnitPrice, bm) {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("insert into Process(cj,Code,Name,UnitPrice,bm) values('".concat(cj, "','").concat(Code, "','").concat(Name, "','").concat(UnitPrice, "','").concat(bm, "')")).then(function (r) {
        reslove({
          status: 1,
          message: "插入工序成功"
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "插入工序失败！"
        });
      });
    });
  });
} // 根据code修改指定工序内容


function alterProcess(cj, Code, Name, UnitPrice, bm) {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("update Process set cj='".concat(cj, "',Name='").concat(Name, "',UnitPrice='").concat(UnitPrice, "',bm='").concat(bm, "' where Code='").concat(Code, "'")).then(function (r) {
        reslove({
          status: 1,
          message: "修改工序成功！"
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "修改工序失败！"
        });
      });
    });
  });
} // 查询计时项目
// Project


function selectProject() {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("select * from Project order by ProjectCode asc").then(function (d) {
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
} // 添加项目


function insertProject(ParentCode, ProjectName, Money, bm) {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("insert into Project(ParentCode,ProjectName,Money,bm) values('".concat(ParentCode, "','").concat(ProjectName, "','").concat(Money, "','").concat(bm, "')")).then(function (d) {
        reslove({
          status: 1,
          message: "恭喜你，添加成功！"
        });
      })["catch"](function (e) {
        console.log(e);
        reject({
          status: 0,
          message: "抱歉，添加失败！"
        });
      });
    });
  });
} // 修改项目


function updateProject(ParentCode, ProjectCode, ProjectName, Money, bm) {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("update Project set ParentCode='".concat(ParentCode, "',ProjectName='").concat(ProjectName, "',Money='").concat(Money, "',bm='").concat(bm, "' where ProjectCode='").concat(ProjectCode, "'")).then(function (r) {
        reslove({
          status: 1,
          message: "修改数据成功！"
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "修改数据失败！"
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
} // 添加补贴项目


function insertSubsidyProject(SubsidyName, Price, bm) {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("insert into SubsidyProject(SubsidyName,Price,bm) values('".concat(SubsidyName, "','").concat(Price, "','").concat(bm, "')")).then(function (d) {
        reslove({
          status: 1,
          message: "恭喜你，添加成功！"
        });
      })["catch"](function (e) {
        console.log(e);
        reject({
          status: 0,
          message: "抱歉，添加失败！"
        });
      });
    });
  });
} // 修改补贴项目


function updateSubsidyProject(Id, SubsidyName, Price, bm) {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("update SubsidyProject set SubsidyName='".concat(SubsidyName, "',Price='").concat(Price, "',bm='").concat(bm, "' where Id='").concat(Id, "'")).then(function (d) {
        reslove({
          status: 1,
          message: "恭喜你，添加成功！"
        });
      })["catch"](function (e) {
        console.log(e);
        reject({
          status: 0,
          message: "抱歉，添加失败！"
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
} // 添加请假类别


function insertHY_Department(d_Name, bm) {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("insert into HY_Department(d_Name,bm) values('".concat(d_Name, "','").concat(bm, "')")).then(function (d) {
        reslove({
          status: 1,
          message: "恭喜你，添加成功！"
        });
      })["catch"](function (e) {
        console.log(e);
        reject({
          status: 0,
          message: "抱歉，添加失败！"
        });
      });
    });
  });
} // 整合所有内容 信息维护


function selectAllNews() {
  var work, team, process, project, subsidyProject, HY_Department;
  return regeneratorRuntime.async(function selectAllNews$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(selectWorkshop());

        case 3:
          work = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(selectTeam());

        case 6:
          team = _context3.sent;
          _context3.next = 9;
          return regeneratorRuntime.awrap(selectProcess());

        case 9:
          process = _context3.sent;
          _context3.next = 12;
          return regeneratorRuntime.awrap(selectProject());

        case 12:
          project = _context3.sent;
          _context3.next = 15;
          return regeneratorRuntime.awrap(selectSubsidyProject());

        case 15:
          subsidyProject = _context3.sent;
          _context3.next = 18;
          return regeneratorRuntime.awrap(selectHY_Department());

        case 18:
          HY_Department = _context3.sent;
          return _context3.abrupt("return", {
            status: 1,
            message: "查询成功！",
            work: work['Work'],
            team: team['Team'],
            process: process['Process'],
            project: project['Project'],
            subsidyProject: subsidyProject['SubsidyProject'],
            HY_Department: HY_Department['HY_Department']
          });

        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", {
            status: 0,
            message: "查询失败！"
          });

        case 25:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 22]]);
} // 拼接sql语句删除对应字段


function DeleteContent(data, type, code) {
  console.log(data, type, code);
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
} // 信息查询 Salary_Main


function selectSalary_Main(number) {
  var _ref3, total;

  return regeneratorRuntime.async(function selectSalary_Main$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!number) number = 10;
          _context4.next = 3;
          return regeneratorRuntime.awrap(selectSalary_count());

        case 3:
          _ref3 = _context4.sent;
          total = _ref3.total;
          return _context4.abrupt("return", new Promise(function (reslove, reject) {
            connect.then(function (r) {
              r.query("select top ".concat(number, " main.Kqcode,main.Data,main.WorkshopName,main.TeamName,main.Number,main.Class,main.glyn,main.rsyn,main.cwyn,main.bm,sum(s.Wages) as wages\n            from Salary_Main main \n            left join Salarys s on s.Kqcode=main.Kqcode\n        \n            group by main.Kqcode,main.Data,main.WorkshopName,main.TeamName,main.Number,main.Class,main.glyn,main.rsyn,main.cwyn,main.bm\n          \n            order by main.Data desc  \n          \n            ")).then(function (r) {
                var data = r.recordset;
                reslove({
                  status: 1,
                  message: "查询成功！",
                  list: data.length ? data.map(function (item, index) {
                    item['key'] = index;
                    return item;
                  }) : [],
                  total: total[0]['']
                });
              });
            })["catch"](function (e) {
              reject({
                status: 0,
                message: "抱歉，查询失败！"
              });
            });
          }));

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
} // 查询总条数


function selectSalary_count() {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("select count(*) from Salary_Main").then(function (d) {
        reslove({
          status: 1,
          message: "查询成功",
          total: d['recordset']
        });
      })["catch"](function () {
        reject({
          status: 0,
          message: "查询失败！"
        });
      });
    });
  });
} // 根据考勤单号整理数据返回


function selectSalary_code(Kqcode) {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("select top 1 Code1,Code2,Code3,Code4,Code5,Code6,Code7,Code8,Code9,Code10,\n            Output1,Output2,Output3,Output4,Output5,Output6,Output7,Output8,Output9,Output10,\n            Name1,Name2,Name3,Name4,Name5,Name6,Name7,Name8,Name9,Name10,jh\n            \n            from Salary_Middle where Kqcode='".concat(Kqcode, "'")).then(function (r) {
        var data = r['recordset'][0];
        var arr = [];
        var values = Object.keys(data);
        var Code = values.filter(function (item, index) {
          return item.indexOf("Code") !== -1;
        });
        var Output = values.filter(function (item, index) {
          return item.indexOf("Output") !== -1;
        });
        var Name = values.filter(function (item, index) {
          return item.indexOf("Name") !== -1;
        });

        for (var i = 0; i < Code.length; i++) {
          var obj = {};
          obj['code'] = data[Code[i]];
          obj['output'] = data[Output[i]];
          obj['name'] = data[Name[i]];
          obj['jh'] = data['jh'];
          obj['key'] = i;
          arr.push(obj);
        }

        reslove({
          status: 1,
          message: "查询成功！",
          list: arr
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "查询失败！",
          list: []
        });
      });
    });
  });
} // 拼接字符串进行查询


function select_contents(yibu, erbu, type, content, startTime, endTime) {
  var searchSql = "";
  yibu = Boolean(yibu);
  erbu = Boolean(erbu);

  if (yibu && !erbu) {
    searchSql = "where main.bm='一部'";
  } else if (!yibu && erbu) {
    searchSql = "where main.bm='二部'";
  } else {
    searchSql = "where 1=1";
  }

  if (startTime && !endTime) {
    searchSql += " and main.Data>='".concat(startTime, "'");
  } else if (!startTime && endTime) {
    searchSql += " and main.Data<='".concat(endTime, "'");
  } else if (startTime && endTime) {
    searchSql += " and main.Data >='".concat(startTime, "' and main.Data <= '").concat(endTime, "'");
  }

  searchSql += " and  main.".concat(type, "='").concat(content, "'");
  console.log(searchSql);
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("select  main.Kqcode,main.Data,main.WorkshopName,main.TeamName,main.Number,main.Class,main.glyn,main.rsyn,main.cwyn,main.bm,sum(s.Wages) as wages\n            from Salary_Main main \n            left join Salarys s on s.Kqcode=main.Kqcode\n            ".concat(searchSql, " \n            group by main.Kqcode,main.Data,main.WorkshopName,main.TeamName,main.Number,main.Class,main.glyn,main.rsyn,main.cwyn,main.bm\n          \n            order by main.Data desc  \n          \n            ")).then(function (r) {
        var data = r.recordset;
        reslove({
          status: 1,
          message: "查询成功！",
          list: data.length ? data.map(function (item, index) {
            item['key'] = index;
            return item;
          }) : []
        });
      });
    })["catch"](function (e) {
      console.log(e);
      reject({
        status: 0,
        message: "抱歉，查询失败！"
      });
    });
  });
}

module.exports = {
  selectAllNews: selectAllNews,
  DeleteContent: DeleteContent,
  updateWorkshop: updateWorkshop,
  addWorkshop: addWorkshop,
  addTeam: addTeam,
  alterTeam: alterTeam,
  insertPerson: insertPerson,
  updatePersonById: updatePersonById,
  selectPerson: selectPerson,
  insertProcess: insertProcess,
  alterProcess: alterProcess,
  insertHY_Department: insertHY_Department,
  insertProject: insertProject,
  updateProject: updateProject,
  insertSubsidyProject: insertSubsidyProject,
  updateSubsidyProject: updateSubsidyProject,
  selectSalary_Main: selectSalary_Main,
  selectSalary_code: selectSalary_code,
  select_contents: select_contents
};