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
  yibu = Number(yibu);
  erbu = Number(erbu);

  if (yibu && !erbu) {
    searchSql = "where main.bm='一部'";
    console.log(6666);
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

  if (content.trim()) {
    searchSql += " and  main.".concat(type, "='").concat(content, "'");
  }

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
} // 人事查询
// 考勤明细管理查询


function select_kaoqing(number, yibu, erbu, startTime, endTime, personCode) {
  yibu = Number(yibu);
  erbu = Number(erbu);
  var sql = "";
  var limit = "";

  if (yibu && !erbu) {
    sql = "where main.bm='一部'";
  } else if (!yibu && erbu) {
    sql = "where main.bm='二部'";
  } else {
    sql = "where 1=1";
  }

  if (startTime && !endTime) {
    sql += " and main.Data>='".concat(startTime, "'");
  } else if (!startTime && endTime) {
    sql += " and main.Data<='".concat(endTime, "'");
  } else if (startTime && endTime) {
    sql += " and main.Data >='".concat(startTime, "' and main.Data <= '").concat(endTime, "'");
  }

  if (personCode) {
    sql += " and p.PersonCode='".concat(personCode, "'");
  } // if(number&&number>0){
  //     limit=` top ${number}`
  // }else {
  //     limit="top 1000"
  // }


  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("select top 10000 s.PersonCode,main.Data,p.PersonName,p.cdepname,p.cdutycode,main.TeamName,s.Wages,s.AttendanceRecord,s.bs,s.Entry_Person\n             from Salarys s \n            left join Person p on s.PersonCode=p.PersonCode\n            left join Salary_Main main on main.Kqcode=s.Kqcode\n            ".concat(sql, "\n            order by main.Data desc\n            ")).then(function (r) {
        var data = r['recordset'];
        reslove({
          status: 1,
          message: "查询成功！",
          list: data.map(function (item, index) {
            item['key'] = index;
            return item;
          })
        });
      })["catch"](function (e) {
        console.log(e);
      });
    });
  });
} // 请假查询查询


function select_qingjia(number, yibu, erbu, startTime, endTime, personCode) {
  yibu = Number(yibu);
  erbu = Number(erbu);
  var sql = "";
  var limit = "";

  if (yibu && !erbu) {
    sql = "where main.bm='一部'";
  } else if (!yibu && erbu) {
    sql = "where main.bm='二部'";
  } else {
    sql = "where 1=1";
  }

  if (startTime && !endTime) {
    sql += " and main.Data>='".concat(startTime, "'");
  } else if (!startTime && endTime) {
    sql += " and main.Data<='".concat(endTime, "'");
  } else if (startTime && endTime) {
    sql += " and main.Data >='".concat(startTime, "' and main.Data <= '").concat(endTime, "'");
  }

  if (personCode) {
    sql += " and p.PersonCode='".concat(personCode, "'");
  }

  if (sql && sql.indexOf("where") !== -1) {
    sql += " and s.qjsj<>''";
  } else {
    sql += "where s.qjsj<>''";
  }

  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("select top 10000 main.Data,s.PersonCode,p.PersonName,main.WorkshopName,main.TeamName,s.qjlb,s.qjsj from Salarys s \n            left join Salary_Main main on main.Kqcode=s.Kqcode\n            left join Person p on p.PersonCode=s.PersonCode\n            ".concat(sql, "\n            order by main.Data desc\n            ")).then(function (r) {
        var data = r['recordset'];
        reslove({
          status: 1,
          message: "查询成功！",
          list: data.map(function (item, index) {
            item['key'] = index;
            return item;
          })
        });
      })["catch"](function (e) {
        console.log(e);
      });
    });
  });
} // 查询薪资信息总计


function selectSalayTotal(yibu, erbu, startTime, endTime, personCode) {
  yibu = Number(yibu);
  erbu = Number(erbu);
  var sql = "";

  if (yibu && !erbu) {
    sql = " and a.bm='一部'";
  } else if (!yibu && erbu) {
    sql = " and a.bm='二部'";
  }

  if (startTime && !endTime) {
    sql += " and a.Data>='".concat(startTime, "'");
  } else if (!startTime && endTime) {
    sql += " and a.Data<='".concat(endTime, "'");
  } else if (startTime && endTime) {
    sql += " and a.Data between  '".concat(startTime, "' and '").concat(endTime, "'");
  }

  if (personCode) {
    sql += " and c.PersonCode='".concat(personCode, "'");
  }

  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("select \u5DE5\u53F7,\u59D3\u540D,\u90E8\u95E8,\u804C\u52A1,sum(\u603B\u8BA1) \u603B\u8BA1,sum(\u5DE5\u4F5C\u65E5) \u5DE5\u4F5C\u65E5 from(\n                select c.PersonCode '\u5DE5\u53F7',b.PersonName'\u59D3\u540D',b.cdepname'\u90E8\u95E8',b.cdutycode'\u804C\u52A1',sum(Wages)'\u603B\u8BA1',case when sum(AttendanceRecord)>=8 then 1 when sum(AttendanceRecord)<8 then sum(AttendanceRecord)/8 end '\u5DE5\u4F5C\u65E5' \n                from Salary_Main a,Person b,Salarys c where a.kqcode=c.kqcode and c.PersonCode=b.PersonCode \n                ".concat(sql, "\n                group by a.data,c.PersonCode,b.PersonName,b.cdepname,b.cdutycode,a.Entry_Person,c.id)aa  group by \u5DE5\u53F7,\u59D3\u540D,\u90E8\u95E8,\u804C\u52A1")).then(function (r) {
        reslove({
          status: 1,
          message: "查询成功！",
          list: r['recordset'].map(function (item, index) {
            item['key'] = index;
            return item;
          })
        });
      }).then(function (e) {
        reject({
          status: 0,
          message: "查询失败！"
        });
      });
    });
  });
} // 查询车间产量汇总表


function selectWorkNumbers(WorkshopName, bm, startTime, endTime) {
  var sql = "";

  if (bm) {
    bm = " and bm='".concat(bm, "'");
  } else {
    bm = '';
  }

  if (startTime && !endTime) {
    sql += " and Data>='".concat(startTime, "'");
  } else if (!startTime && endTime) {
    sql += " and Data<='".concat(endTime, "'");
  } else if (startTime && endTime) {
    sql += " and Data >='".concat(startTime, "' and Data <= '").concat(endTime, "'");
  }

  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("\n            select top 10000 WorkshopName'\u8F66\u95F4',code1 '\u5DE5\u5E8F\u7F16\u7801',name1'\u5DE5\u5E8F\u540D\u79F0',sum(output1) '\u5DE5\u5E8F\u4EA7\u91CF',sum(f.je)'\u91D1\u989D'from Salary_Main a,v_middle c,\n            (select b.kqcode,Jjaverage,bz1,sum(case when bz1='\u8BA1\u4EF6\u85AA\u8D441' then b.PieceworkWage1  when bz1='\u8BA1\u4EF6\u85AA\u8D442' then b.PieceworkWage2  when bz1='\u8BA1\u4EF6\u85AA\u8D443'\n             then b.PieceworkWage3 when bz1='\u8BA1\u4EF6\u85AA\u8D444' then b.PieceworkWage4  when bz1='\u8BA1\u4EF6\u85AA\u8D445' \n             then b.PieceworkWage5  when bz1='\u8BA1\u4EF6\u85AA\u8D446' then b.PieceworkWage6  when bz1='\u8BA1\u4EF6\u85AA\u8D447' \n             then b.PieceworkWage7  when bz1='\u8BA1\u4EF6\u85AA\u8D448' then b.PieceworkWage8  when bz1='\u8BA1\u4EF6\u85AA\u8D449' \n             then b.PieceworkWage9   when bz1='\u8BA1\u4EF6\u85AA\u8D4410' then b.PieceworkWage10   when bz1='\u8BA1\u4EF6\u85AA\u8D4411' \n             then b.PieceworkWage11   when bz1='\u8BA1\u4EF6\u85AA\u8D4412' then b.PieceworkWage12 when bz1='\u8BA1\u4EF6\u85AA\u8D4413' \n             then b.PieceworkWage13  when bz1='\u8BA1\u4EF6\u85AA\u8D4414' then b.PieceworkWage14  when bz1='\u8BA1\u4EF6\u85AA\u8D4415' \n             then b.PieceworkWage15 end *b.bs) je from Salarys b,v_middle d where b.kqcode=d.kqcode and jh=Jjaverage and len(Jjaverage)<11 and output1>0  \n             and b.kqcode in(select kqcode from Salary_Main where  WorkshopName ='".concat(WorkshopName, "'\n              ").concat(bm, "  ").concat(sql, ") \n             group by b.kqcode,Jjaverage,bz1)f \n             where a.kqcode=c.kqcode and f.kqcode=a.kqcode and jh=Jjaverage and f.bz1=c.bz1 and WorkshopName = '").concat(WorkshopName, "'\n             and output1>0 and  len(Jjaverage)<11 \n             group by WorkshopName,code1 ,name1\n            ")).then(function (r) {
        reslove({
          status: 1,
          message: "查询成功！",
          list: r['recordset'].map(function (item, index) {
            item['key'] = index;
            return item;
          })
        });
      })["catch"](function (e) {
        reject({
          status: 0,
          message: "查询失败！"
        });
      });
    });
  });
} // 查询问题处理单


function selectProblem(startTime, endTime) {
  var sql = "";

  if (startTime && !endTime) {
    sql += " and data>='".concat(startTime, "'");
  } else if (!startTime && endTime) {
    sql += " and data<='".concat(endTime, "'");
  } else if (startTime && endTime) {
    sql += " and data >='".concat(startTime, "' and data <= '").concat(endTime, "'");
  }

  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("select  data'\u65E5\u671F', supplier '\u4F9B\u5E94\u5546',Reason '\u4E0D\u826F\u539F\u56E0',sum(hourlywage*bs)'\u91D1\u989D'\n            from  v_supplier where projectname ='\u95EE\u9898\u5904\u7406\u5355'  ".concat(sql, "\n            \n            group by data,supplier,Reason\n            order by data desc\n            ")).then(function (d) {
        reslove({
          status: 1,
          message: "恭喜你，查询成功！",
          list: d['recordset'].map(function (item, index) {
            item['key'] = index;
            return item;
          })
        });
      })["catch"](function (e) {
        console.log(e);
        reject({
          status: 0,
          message: "查询失败！"
        });
      });
    });
  });
} // 查询财务考勤表


function selectCaiwu() {
  return new Promise(function (reslove, reject) {
    connect.then(function (r) {
      r.query("\n            SELECT  distinct top 10000    Salary_Main.Kqcode '\u8003\u52E4\u5355\u53F7', Data '\u65E5\u671F',Salarys.personCode '\u5DE5\u53F7',personName '\u5458\u5DE5\u59D3\u540D', WorkshopName \u8F66\u95F4\u540D\u79F0, TeamName \u73ED\u7EC4, bzNumber \u7F16\u5236\u4EBA\u6570, Number \u5B9E\u5230\u4EBA\u6570, AttendanceRecord \u51FA\u52E4\u60C5\u51B5,bs \u500D\u6570,ProjectName \u8BA1\u65F6\u9879\u76EE1,Hours \u8BA1\u65F6\u5C0F\u65F6\u65701,HourlyWage \u8BA1\u65F6\u85AA\u8D441,ProjectName2 \u8BA1\u65F6\u9879\u76EE2,Hours2 \u8BA1\u65F6\u5C0F\u65F6\u65702, HourlyWage2 \u8BA1\u65F6\u85AA\u8D442,ProjectName3 \u8BA1\u65F6\u9879\u76EE3, \n            Hours3 \u8BA1\u65F6\u5C0F\u65F6\u65703,HourlyWage3 \u8BA1\u65F6\u85AA\u8D443, jsxj \u8BA1\u65F6\u85AA\u8D44,Class \u73ED\u522B,Salary_Middle.code1 \u5DE5\u5E8F\u7F16\u78011,name1 \u5DE5\u5E8F\u540D\u79F01,Unitprice1 \u5355\u4EF71,\n            PieceworkWage1 \u8BA1\u4EF6\u85AA\u8D441,Salary_Middle.Output1 \u4EA7\u91CF1,Salary_Middle.code2 \u5DE5\u5E8F\u7F16\u78012,name2 \u5DE5\u5E8F\u540D\u79F02,Unitprice2 \u5355\u4EF72,\n            PieceworkWage2 \u8BA1\u4EF6\u85AA\u8D442,Salary_Middle.Output2 \u4EA7\u91CF2,Salary_Middle.code3 \u5DE5\u5E8F\u7F16\u78013,name3 \u5DE5\u5E8F\u540D\u79F03,Unitprice3 \u5355\u4EF73,\n            PieceworkWage3 \u8BA1\u4EF6\u85AA\u8D443,Salary_Middle.Output3 \u4EA7\u91CF3,Salary_Middle.code4 \u5DE5\u5E8F\u7F16\u78014,name4 \u5DE5\u5E8F\u540D\u79F04,Unitprice4 \u5355\u4EF74,PieceworkWage4 \u8BA1\u4EF6\u85AA\u8D444,Salary_Middle.Output4 \u4EA7\u91CF4,Salary_Middle.code5 \u5DE5\u5E8F\u7F16\u78015,name5 \u5DE5\u5E8F\u540D\u79F05,\n            Unitprice5 \u5355\u4EF75,PieceworkWage5 \u8BA1\u4EF6\u85AA\u8D445,Salary_Middle.Output5 \u4EA7\u91CF5,Salary_Middle.code6 \u5DE5\u5E8F\u7F16\u78016,name6 \u5DE5\u5E8F\u540D\u79F06,Unitprice6 \u5355\u4EF76,PieceworkWage6 \u8BA1\u4EF6\u85AA\u8D446,Salary_Middle.Output6 \u4EA7\u91CF6,Salary_Middle.code7 \u5DE5\u5E8F\u7F16\u78017,name7 \u5DE5\u5E8F\u540D\u79F07,Unitprice7 \u5355\u4EF77,PieceworkWage7 \u8BA1\u4EF6\u85AA\u8D447,Salary_Middle.Output7 \u4EA7\u91CF7,Salary_Middle.code8 \u5DE5\u5E8F\u7F16\u78018,name8 \u5DE5\u5E8F\u540D\u79F08,Unitprice8 \u5355\u4EF78,PieceworkWage8 \u8BA1\u4EF6\u85AA\u8D448,Salary_Middle.Output8 \u4EA7\u91CF8,Salary_Middle.code9 \u5DE5\u5E8F\u7F16\u78019,name9 \u5DE5\u5E8F\u540D\u79F09,Unitprice9 \u5355\u4EF79,PieceworkWage9 \u8BA1\u4EF6\u85AA\u8D449,Salary_Middle.Output9 \u4EA7\u91CF9,Salary_Middle.code10 \u5DE5\u5E8F\u7F16\u780110,\n            name10 \u5DE5\u5E8F\u540D\u79F010,Unitprice10 \u5355\u4EF710,PieceworkWage10 \u8BA1\u4EF6\u85AA\u8D4410,Salary_Middle.Output10 \u4EA7\u91CF10,Salary_Middle.code11 \u5DE5\u5E8F\u7F16\u780111,name11 \u5DE5\u5E8F\u540D\u79F011,Unitprice11 \u5355\u4EF711,PieceworkWage11 \u8BA1\u4EF6\u85AA\u8D4411,Salary_Middle.Output11 \u4EA7\u91CF11,Salary_Middle.code12 \u5DE5\u5E8F\u7F16\u780112,name12 \u5DE5\u5E8F\u540D\u79F012,Unitprice12 \u5355\u4EF712,PieceworkWage12 \u8BA1\u4EF6\u85AA\u8D4412,Salary_Middle.Output12 \u4EA7\u91CF12,Salary_Middle.code13 \u5DE5\u5E8F\u7F16\u780113,name13 \u5DE5\u5E8F\u540D\u79F013,Unitprice13 \u5355\u4EF713,PieceworkWage13 \u8BA1\u4EF6\u85AA\u8D4413,Salary_Middle.Output13 \u4EA7\u91CF13,Salary_Middle.code14 \u5DE5\u5E8F\u7F16\u780114,name14 \u5DE5\u5E8F\u540D\u79F014,Unitprice14 \u5355\u4EF714,PieceworkWage14 \u8BA1\u4EF6\u85AA\u8D4414,Salary_Middle.Output14 \u4EA7\u91CF14,Salary_Middle.code15 \u5DE5\u5E8F\u7F16\u780115,name15 \u5DE5\u5E8F\u540D\u79F015,Unitprice15 \u5355\u4EF715,PieceworkWage15 \u8BA1\u4EF6\u85AA\u8D4415,Salary_Middle.Output15 \u4EA7\u91CF15,jjxz \u8BA1\u4EF6\u85AA\u8D44,Jjaverage \u5907\u6CE8,SubsidyProject \u8865\u8D34\u9879\u76EE1,Subsidy \u8865\u8D34\u91D1\u989D1, SubsidyProject2 \u8865\u8D34\u9879\u76EE2, Subsidy2 \u8865\u8D34\u91D1\u989D2,SubsidyProject3 \u8865\u8D34\u9879\u76EE3,Subsidy3 \u8865\u8D34\u91D1\u989D3, btxz \u8865\u8D34\u85AA\u8D44,Wages \u5F53\u65E5\u85AA\u8D44,qtbs \u5176\u5B83\u500D\u6570,qjlb \u8BF7\u5047\u7C7B\u522B,qjsj \u8BF7\u5047\u65F6\u95F4,bs_x \u500D\u6570\u660E\u7EC6,yn_qj \u662F\u5426\u8BF7\u5047 FROM  Salary_Main inner join  Salarys ON (Salary_Main.Kqcode=Salarys.Kqcode)  \n             left outer join Person ON Person.personCode= Salarys.personCode  left outer join Salary_Middle ON Salarys.Kqcode=Salary_Middle.Kqcode and isnull(Salary_Middle.jh,'')=(case when isnull(Jjaverage,'')='' then isnull(Salary_Middle.jh,'') else Jjaverage end) \n             WHERE    Salary_Main.bm = '\u4E00\u90E8' order by Data desc\n            ").then(function (d) {
        reslove({
          status: status
        });
      })["catch"](function (e) {
        console.log(e);
      });
    });
  });
}

selectCaiwu();
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
  select_contents: select_contents,
  select_kaoqing: select_kaoqing,
  select_qingjia: select_qingjia,
  selectSalayTotal: selectSalayTotal,
  selectWorkNumbers: selectWorkNumbers,
  selectProblem: selectProblem
};