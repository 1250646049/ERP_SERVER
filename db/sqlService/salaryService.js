const connect = require("../WageDb")



// 查询车间信息

function selectWorkshop() {

    return new Promise((reslove, reject) => {
        connect.then(resp => {
            resp.query("select * from Workshop order by WorkshopCode asc")
                .then(d => {
                    reslove({
                        status: 1,
                        message: "查询成功！",
                        Work: d['recordset'].length ? d['recordset'].map((item, index) => {
                            item['key'] = index
                            return {
                                ...item
                            }
                        }) : []
                    })
                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "查询失败！"
                    })
                })

        })
    })



}

// 更新车间信息

function updateWorkshop(WorkshopName, workCode) {
    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`update Workshop set WorkshopName='${WorkshopName}' where WorkshopCode='${workCode}'`)
                .then(d => {
                    reslove({
                        status: 1,
                        message: "更新成功！"
                    })
                })
                .catch((e) => {
                    console.log(e);
                    reject({
                        status: 0,
                        message: "更新失败！"
                    })


                })


        })



    })



}

// 添加一条车间信息

async function addWorkshop(WorkshopName, bm) {
    let {
        Work
    } = await selectWorkshop()
    let code = 123
    if (Work[Work.length - 1]) {
        code = Work[Work.length - 1]['WorkshopCode']
        code = Number(code.split("CJ")[1])
        code += 1
        let type = code <= 999 ? ('0' + code) : code
        code = "CJ" + type

    }
    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`insert into Workshop(WorkshopCode,WorkshopName,bm) values('${code}','${WorkshopName}','${bm}')`)
                .then(r => {
                    reslove({
                        status: 1,
                        message: "插入数据成功！"
                    })
                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "插入数据失败！"
                    })
                })
        })



    })
}

// 查询班组信息
function selectTeam() {

    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query("select * from Team t left join Workshop w on t.WorkshopCode=w.WorkshopCode order by t.TeamCode asc")
                .then(d => {
                    reslove({
                        status: 1,
                        message: "查询成功！",
                        Team: d['recordset'].length ? d['recordset'].map((item, index) => {
                            item['key'] = index
                            return {
                                ...item
                            }
                        }) : []
                    })
                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "查询失败！"
                    })
                })

        })


    })





}
// 添加一条班组信息
async function addTeam(WorkshopCode, TeamName, number, bm) {
    let {
        Team
    } = await selectTeam()
    let code;
    if (Team[Team.length - 1]) {
        code = Team[Team.length - 1]['TeamCode']
        code = Number(code.split("CJ")[1])
        code += 1
        let type = code <= 999 ? ('0' + code) : code
        code = "CJ" + type
    }
    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`insert into Team(TeamCode,WorkshopCode,TeamName,number,bm) values('${code}','${WorkshopCode}','${TeamName}','${number}','${bm}')`)
                .then(d => {
                    reslove({
                        status: 1,
                        message: "恭喜你，添加班组信息成功！"
                    })
                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "抱歉，添加班组信息失败！"
                    })
                })
        })



    })
}
// 修改一条班组信息
function alterTeam(TeamCode, WorkshopCode, TeamName, number, bm) {
    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`update Team set WorkshopCode='${WorkshopCode}',TeamName='${TeamName}',number='${number}',bm='${bm}' where TeamCode='${TeamCode}'`)
                .then(d => {
                    reslove({
                        status: 1,
                        message: "恭喜你，修改班组信息成功！"
                    })
                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "抱歉，修改班组信息失败！"
                    })
                })
        })



    })
}
// 查询所有员工信息

function selectPerson() {

    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`select p.PersonCode,p.PersonName,w.WorkshopCode,w.WorkshopName,t.TeamCode,t.TeamName from Person p 
            left join Workshop w on p.WorkshopCode=w.WorkshopCode 
            left join Team t on t.TeamCode=p.TeamCode
            order by p.PersonCode asc 
            `)
                .then(d => {
                    reslove({
                        status: 1,
                        message: "查询成功！",
                        Person: d['recordset'].length ? d['recordset'].map((item, index) => {
                            item['key'] = index
                            return {
                                ...item
                            }
                        }) : []
                    })
                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "查询失败！"
                    })
                })


        })
    })



}
// 添加一条员工内容
function insertPerson(PersonCode, PersonName, WorkshopCode, Teamcode) {

    return new Promise((reslove, reject) => {
        connect.then((r) => {
            r.query(`insert into Person(PersonCode,PersonName,WorkshopCode,Teamcode) values('${PersonCode}','${PersonName}','${WorkshopCode}','${Teamcode}')`)
                .then(_ => {
                    reslove({
                        status: 1,
                        message: "插入数据成功！"
                    })
                })
                .catch(_ => {
                    console.log(_);
                    reject({
                        status: 0,
                        message: "插入数据失败！"
                    })
                })
        })


    })

}
// 修改指定的员工
function updatePersonById(PersonCode, PersonName, WorkshopCode, Teamcode) {

    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`update Person set PersonName='${PersonName}',WorkshopCode='${WorkshopCode}',Teamcode='${Teamcode}' where PersonCode='${PersonCode}'`)
                .then(r => {
                    reslove({
                        status: 1,
                        message: "恭喜你，修改成功！"
                    })
                })
                .catch(e => {

                    reject({
                        status: 0,
                        message: "抱歉，修改失败！"
                    })
                })
        })




    })



}
// 查询工序工价
function selectProcess() {

    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query("select * from Process")
                .then(d => {
                    reslove({
                        status: 1,
                        message: "查询成功！",
                        Process: d['recordset'].length ? d['recordset'].map((item, index) => {
                            item['key'] = index
                            return {
                                ...item
                            }
                        }) : []
                    })
                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "查询失败！"
                    })
                })


        })
    })



}

// 添加一条工序内容
function insertProcess(cj, Code, Name, UnitPrice, bm) {
    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`insert into Process(cj,Code,Name,UnitPrice,bm) values('${cj}','${Code}','${Name}','${UnitPrice}','${bm}')`)
                .then(r => {
                    reslove({
                        status: 1,
                        message: "插入工序成功"
                    })
                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "插入工序失败！"
                    })
                })
        })


    })


}

// 根据code修改指定工序内容
function alterProcess(cj, Code, Name, UnitPrice, bm) {
    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`update Process set cj='${cj}',Name='${Name}',UnitPrice='${UnitPrice}',bm='${bm}' where Code='${Code}'`)
                .then(r => {
                    reslove({
                        status: 1,
                        message: "修改工序成功！"
                    })
                }).catch(e => {

                    reject({
                        status: 0,
                        message: "修改工序失败！"
                    })
                })
        })


    })
}
// 查询计时项目

// Project
function selectProject() {

    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query("select * from Project order by ProjectCode asc")
                .then(d => {
                    reslove({
                        status: 1,
                        message: "查询成功！",
                        Project: d['recordset'].length ? d['recordset'].map((item, index) => {
                            item['key'] = index
                            return {
                                ...item
                            }
                        }) : []
                    })
                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "查询失败！"
                    })
                })


        })
    })



}

// 添加项目

function insertProject(ParentCode, ProjectName, Money, bm) {


    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`insert into Project(ParentCode,ProjectName,Money,bm) values('${ParentCode}','${ProjectName}','${Money}','${bm}')`)
                .then(d => {
                    reslove({
                        status: 1,
                        message: "恭喜你，添加成功！"
                    })
                }).catch(e => {
                    console.log(e);
                    reject({
                        status: 0,
                        message: "抱歉，添加失败！"
                    })
                })
        })


    })
}

// 修改项目
function updateProject(ParentCode, ProjectCode, ProjectName, Money, bm) {
    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`update Project set ParentCode='${ParentCode}',ProjectName='${ProjectName}',Money='${Money}',bm='${bm}' where ProjectCode='${ProjectCode}'`)
                .then(r => {
                    reslove({
                        status: 1,
                        message: "修改数据成功！"
                    })
                }).catch(e => {
                    reject({
                        status: 0,
                        message: "修改数据失败！"
                    })
                })
        })



    })


}
// 补贴项目 
// SubsidyProject
function selectSubsidyProject() {

    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query("select * from SubsidyProject")
                .then(d => {
                    reslove({
                        status: 1,
                        message: "查询成功！",
                        SubsidyProject: d['recordset'].length ? d['recordset'].map((item, index) => {
                            item['key'] = index
                            return {
                                ...item
                            }
                        }) : []
                    })
                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "查询失败！"
                    })
                })


        })
    })



}
// 添加补贴项目
function insertSubsidyProject(SubsidyName, Price, bm) {

    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`insert into SubsidyProject(SubsidyName,Price,bm) values('${SubsidyName}','${Price}','${bm}')`)
                .then(d => {
                    reslove({
                        status: 1,
                        message: "恭喜你，添加成功！"
                    })
                }).catch(e => {
                    console.log(e);
                    reject({
                        status: 0,
                        message: "抱歉，添加失败！"
                    })
                })
        })


    })
}

// 修改补贴项目
function updateSubsidyProject(Id, SubsidyName, Price, bm) {

    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`update SubsidyProject set SubsidyName='${SubsidyName}',Price='${Price}',bm='${bm}' where Id='${Id}'`)
                .then(d => {
                    reslove({
                        status: 1,
                        message: "恭喜你，添加成功！"
                    })
                }).catch(e => {
                    console.log(e);
                    reject({
                        status: 0,
                        message: "抱歉，添加失败！"
                    })
                })
        })


    })
}

// 请假类别
// HY_Department
function selectHY_Department() {

    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query("select * from HY_Department")
                .then(d => {
                    reslove({
                        status: 1,
                        message: "查询成功！",
                        HY_Department: d['recordset'].length ? d['recordset'].map((item, index) => {
                            item['key'] = index
                            return {
                                ...item
                            }
                        }) : []
                    })
                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "查询失败！"
                    })
                })


        })
    })



}

// 添加请假类别
function insertHY_Department(d_Name, bm) {
    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`insert into HY_Department(d_Name,bm) values('${d_Name}','${bm}')`)
                .then(d => {
                    reslove({
                        status: 1,
                        message: "恭喜你，添加成功！"
                    })
                }).catch(e => {
                    console.log(e);
                    reject({
                        status: 0,
                        message: "抱歉，添加失败！"
                    })
                })
        })


    })

}
// 整合所有内容 信息维护

async function selectAllNews() {
    try {
        let work = await selectWorkshop()
        let team = await selectTeam()

        let process = await selectProcess()
        let project = await selectProject()
        let subsidyProject = await selectSubsidyProject()
        let HY_Department = await selectHY_Department()
        return {
            status: 1,
            message: "查询成功！",
            work: work['Work'],
            team: team['Team'],

            process: process['Process'],
            project: project['Project'],
            subsidyProject: subsidyProject['SubsidyProject'],
            HY_Department: HY_Department['HY_Department']
        }


    } catch {

        return {
            status: 0,
            message: "查询失败！"
        }

    }



}

// 拼接sql语句删除对应字段
function DeleteContent(data, type, code) {
    console.log(data, type, code);
    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`delete from ${data} where ${type}='${code}'`)
                .then(d => {

                    reslove({
                        status: 1,
                        message: "删除失败！"
                    })
                })
                .catch(e => {
                    console.log(e);
                    reject({
                        status: 0,
                        message: "删除失败！"
                    })
                })


        })
    })



}
// 信息查询 Salary_Main

async function selectSalary_Main(number) {
    if (!number) number = 10
    let {
        total
    } = await selectSalary_count()

    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`select top ${number} main.Kqcode,main.Data,main.WorkshopName,main.TeamName,main.Number,main.Class,main.glyn,main.rsyn,main.cwyn,main.bm,sum(s.Wages) as wages
            from Salary_Main main 
            left join Salarys s on s.Kqcode=main.Kqcode
        
            group by main.Kqcode,main.Data,main.WorkshopName,main.TeamName,main.Number,main.Class,main.glyn,main.rsyn,main.cwyn,main.bm
          
            order by main.Data desc  
          
            `)
                .then(r => {
                    let data = r.recordset
                    reslove({
                        status: 1,
                        message: "查询成功！",
                        list: data.length ? data.map((item, index) => {
                            item['key'] = index;
                            return item;
                        }) : [],
                        total: total[0]['']
                    })
                })
        }).catch(e => {

            reject({
                status: 0,
                message: "抱歉，查询失败！"
            })

        })


    })


}

// 查询总条数
function selectSalary_count() {
    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query("select count(*) from Salary_Main")
                .then((d) => {
                    reslove({
                        status: 1,
                        message: "查询成功",
                        total: d['recordset']
                    })

                })
                .catch(() => {
                    reject({
                        status: 0,
                        message: "查询失败！"
                    })
                })
        })
    })
}

// 根据考勤单号整理数据返回

function selectSalary_code(Kqcode) {
    
    return new Promise((reslove, reject) => {
        connect.then(r => {
            r.query(`select top 1 Code1,Code2,Code3,Code4,Code5,Code6,Code7,Code8,Code9,Code10,
            Output1,Output2,Output3,Output4,Output5,Output6,Output7,Output8,Output9,Output10,
            Name1,Name2,Name3,Name4,Name5,Name6,Name7,Name8,Name9,Name10,jh
            
            from Salary_Middle where Kqcode='${Kqcode}'`)
                .then(r => {
                    let data = r['recordset'][0]
                    let arr = []
                    let values = Object.keys(data)

                    let Code = values.filter((item, index) => {

                        return item.indexOf("Code") !== -1
                    })
                    let Output = values.filter((item, index) => {

                        return item.indexOf("Output") !== -1
                    })
                    let Name = values.filter((item, index) => {

                        return item.indexOf("Name") !== -1
                    })
                    for (let i = 0; i < Code.length; i++) {
                        let obj = {}
                        obj['code'] = data[Code[i]]
                        obj['output'] = data[Output[i]]
                        obj['name'] = data[Name[i]]
                        obj['jh'] = data['jh']
                        obj['key'] = i
                        arr.push(obj)
                    }
                    reslove({
                        status: 1,
                        message: "查询成功！",
                        list: arr
                    })
                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "查询失败！",
                        list: []
                    })
                })
        })


    })
}

// 拼接字符串进行查询
function select_contents(yibu, erbu, type, content, startTime, endTime) {
   
    let searchSql = ""
    yibu=Boolean(yibu)
    erbu=Boolean(erbu)
    if (yibu && !erbu) {
        searchSql = "where main.bm='一部'"
    } else if (!yibu && erbu) {
        searchSql = "where main.bm='二部'"
    }else {
        searchSql="where 1=1"
    }
    if (startTime && !endTime) {
        searchSql += ` and main.Data>='${startTime}'`
    } else if (!startTime && endTime) {
        searchSql += ` and main.Data<='${endTime}'`
    } else if (startTime && endTime) {
        searchSql += ` and main.Data >='${startTime}' and main.Data <= '${endTime}'`
    }
    searchSql+=` and  main.${type}='${content}'`
    console.log(searchSql);
    return new Promise((reslove,reject)=>{
        connect.then(r => {
            r.query(`select  main.Kqcode,main.Data,main.WorkshopName,main.TeamName,main.Number,main.Class,main.glyn,main.rsyn,main.cwyn,main.bm,sum(s.Wages) as wages
            from Salary_Main main 
            left join Salarys s on s.Kqcode=main.Kqcode
            ${searchSql} 
            group by main.Kqcode,main.Data,main.WorkshopName,main.TeamName,main.Number,main.Class,main.glyn,main.rsyn,main.cwyn,main.bm
          
            order by main.Data desc  
          
            `)
                .then(r => {
                    let data = r.recordset
                    reslove({
                        status: 1,
                        message: "查询成功！",
                        list: data.length ? data.map((item, index) => {
                            item['key'] = index;
                            return item;
                        }) : [],
                  
                    })
                })
        }).catch(e => {
            console.log(e);
            reject({
                status: 0,
                message: "抱歉，查询失败！"
            })

        })


    })
}

module.exports = {
    selectAllNews,
    DeleteContent,
    updateWorkshop,
    addWorkshop,
    addTeam,
    alterTeam,
    insertPerson,
    updatePersonById,
    selectPerson,
    insertProcess,
    alterProcess,
    insertHY_Department,
    insertProject,
    updateProject,
    insertSubsidyProject,
    updateSubsidyProject,
    selectSalary_Main,
    selectSalary_code,
    select_contents
}