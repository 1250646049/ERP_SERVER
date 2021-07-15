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
            r.query(`select p.PersonCode,p.PersonName,w.WorkshopCode,w.WorkshopName,p.cdutycode,t.TeamCode,t.TeamName from Person p 
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
    yibu=Number(yibu)
    erbu=Number(erbu)

    if (yibu && !erbu) {
        searchSql = "where main.bm='一部'"
        console.log(6666);
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
    if(content.trim()){
        searchSql+=` and  main.${type}='${content}'`
    }
    
    
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

// 人事查询

// 考勤明细管理查询
function select_kaoqing(number,yibu,erbu,startTime,endTime,personCode){
   
    yibu=Number(yibu)
    erbu=Number(erbu)
    let sql=""
    let limit=""
    if(yibu && !erbu){
        sql="where main.bm='一部'"
    }else if(!yibu && erbu){
        sql="where main.bm='二部'"
    }else {
        sql="where 1=1"
    }
    if (startTime && !endTime) {
        sql += ` and main.Data>='${startTime}'`
    } else if (!startTime && endTime) { 
        sql += ` and main.Data<='${endTime}'`
    } else if (startTime && endTime) {
        sql += ` and main.Data >='${startTime}' and main.Data <= '${endTime}'`
    }
    if(personCode){
        sql+=` and p.PersonCode='${personCode}'`
    }
    // if(number&&number>0){
    //     limit=` top ${number}`
    // }else {
    //     limit="top 1000"
    // }
  
    return new Promise((reslove,reject)=>{ 
        connect.then(r=>{
            r.query(`select top 10000 s.PersonCode,main.Data,p.PersonName,p.cdepname,p.cdutycode,main.TeamName,s.Wages,s.AttendanceRecord,s.bs,s.Entry_Person
             from Salarys s 
            left join Person p on s.PersonCode=p.PersonCode
            left join Salary_Main main on main.Kqcode=s.Kqcode
            ${sql}
            order by main.Data desc
            `) .then(r=>{
                let data=r['recordset']
                reslove({
                    status:1,
                    message:"查询成功！",
                    list:data.map((item,index)=>{
                        item['key']=index
                        return item;
                    })
                })
            })
            .catch(e=>{
                console.log(e);
            })
    
        })
       


    })


}
// 请假查询查询
function select_qingjia(number,yibu,erbu,startTime,endTime,personCode){
   
    yibu=Number(yibu)
    erbu=Number(erbu)
    let sql=""
    let limit=""
    if(yibu && !erbu){
        sql="where main.bm='一部'"
    }else if(!yibu && erbu){
        sql="where main.bm='二部'"
    }else {
        sql="where 1=1"
    }
    if (startTime && !endTime) {
        sql += ` and main.Data>='${startTime}'`
    } else if (!startTime && endTime) { 
        sql += ` and main.Data<='${endTime}'`
    } else if (startTime && endTime) {
        sql += ` and main.Data >='${startTime}' and main.Data <= '${endTime}'`
    }
    if(personCode){
        sql+=` and p.PersonCode='${personCode}'`
    }
    if(sql && sql.indexOf("where") !==-1){
        sql+=" and s.qjsj<>''"
    }else {
        sql+="where s.qjsj<>''"
    }

    return new Promise((reslove,reject)=>{ 
        connect.then(r=>{
            r.query(`select top 10000 main.Data,s.PersonCode,p.PersonName,main.WorkshopName,main.TeamName,s.qjlb,s.qjsj from Salarys s 
            left join Salary_Main main on main.Kqcode=s.Kqcode
            left join Person p on p.PersonCode=s.PersonCode
            ${sql}
            order by main.Data desc
            `) .then(r=>{
                let data=r['recordset']
                reslove({
                    status:1,
                    message:"查询成功！",
                    list:data.map((item,index)=>{
                        item['key']=index
                        return item;
                    })
                })
            })
            .catch(e=>{
                console.log(e);
            })
    
        })
       


    })


}
// 查询薪资信息总计
function selectSalayTotal(yibu,erbu,startTime,endTime,personCode){
    yibu=Number(yibu)
    erbu=Number(erbu)
    let sql=""
    if(yibu && !erbu){
        sql=" and a.bm='一部'"
    }else if(!yibu && erbu){
        sql=" and a.bm='二部'"
    }
    if (startTime && !endTime) {
        sql += ` and a.Data>='${startTime}'`
    } else if (!startTime && endTime) { 
        sql += ` and a.Data<='${endTime}'`
    } else if (startTime && endTime) {
        sql += ` and a.Data between  '${startTime}' and '${endTime}'`
    }
    if(personCode){
        sql+=` and c.PersonCode='${personCode}'`
    }
    
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`select 工号,姓名,部门,职务,sum(总计) 总计,sum(工作日) 工作日 from(
                select c.PersonCode '工号',b.PersonName'姓名',b.cdepname'部门',b.cdutycode'职务',sum(Wages)'总计',case when sum(AttendanceRecord)>=8 then 1 when sum(AttendanceRecord)<8 then sum(AttendanceRecord)/8 end '工作日' 
                from Salary_Main a,Person b,Salarys c where a.kqcode=c.kqcode and c.PersonCode=b.PersonCode 
                ${sql}
                group by a.data,c.PersonCode,b.PersonName,b.cdepname,b.cdutycode,a.Entry_Person,c.id)aa  group by 工号,姓名,部门,职务`)
            .then(r=>{
                
               reslove({
                   status:1,
                   message:"查询成功！",
                   list:r['recordset'].map((item,index)=>{
                    item['key']=index;
                    return item;
                   })
               }) 
            })
            .then(e=>{
                reject({
                    status:0,
                    message:"查询失败！"
                })
            })
        })

    })


}

// 查询车间产量汇总表
function selectWorkNumbers(WorkshopName,bm,startTime,endTime){
    let sql=""    
    if (bm){
        bm=` and bm='${bm}'`
    }else {
        bm=''
    }
    if (startTime && !endTime) {
        sql += ` and Data>='${startTime}'`
    } else if (!startTime && endTime) { 
        sql += ` and Data<='${endTime}'`
    } else if (startTime && endTime) {
        sql += ` and Data >='${startTime}' and Data <= '${endTime}'`
    }
    return new Promise((reslove,reject)=>{ 
        connect.then(r=>{
            r.query(`
            select top 10000 WorkshopName'车间',code1 '工序编码',name1'工序名称',sum(output1) '工序产量',sum(f.je)'金额'from Salary_Main a,v_middle c,
            (select b.kqcode,Jjaverage,bz1,sum(case when bz1='计件薪资1' then b.PieceworkWage1  when bz1='计件薪资2' then b.PieceworkWage2  when bz1='计件薪资3'
             then b.PieceworkWage3 when bz1='计件薪资4' then b.PieceworkWage4  when bz1='计件薪资5' 
             then b.PieceworkWage5  when bz1='计件薪资6' then b.PieceworkWage6  when bz1='计件薪资7' 
             then b.PieceworkWage7  when bz1='计件薪资8' then b.PieceworkWage8  when bz1='计件薪资9' 
             then b.PieceworkWage9   when bz1='计件薪资10' then b.PieceworkWage10   when bz1='计件薪资11' 
             then b.PieceworkWage11   when bz1='计件薪资12' then b.PieceworkWage12 when bz1='计件薪资13' 
             then b.PieceworkWage13  when bz1='计件薪资14' then b.PieceworkWage14  when bz1='计件薪资15' 
             then b.PieceworkWage15 end *b.bs) je from Salarys b,v_middle d where b.kqcode=d.kqcode and jh=Jjaverage and len(Jjaverage)<11 and output1>0  
             and b.kqcode in(select kqcode from Salary_Main where  WorkshopName ='${WorkshopName}'
              ${bm}  ${sql}) 
             group by b.kqcode,Jjaverage,bz1)f 
             where a.kqcode=c.kqcode and f.kqcode=a.kqcode and jh=Jjaverage and f.bz1=c.bz1 and WorkshopName = '${WorkshopName}'
             and output1>0 and  len(Jjaverage)<11 
             group by WorkshopName,code1 ,name1
            `).then((r)=>{
                reslove({
                    status:1,
                    message:"查询成功！",
                    list:r['recordset'].map((item,index)=>{
                        item['key']=index
                        return item;
                    })
                })
            })
            .catch(e=>{
                reject({
                    status:0,
                    message:"查询失败！"
                })
            })
        })



    })
}

// 查询问题处理单
function selectProblem(startTime,endTime){
    let sql=""
    if (startTime && !endTime) {
        sql += ` and data>='${startTime}'`
    } else if (!startTime && endTime) { 
        sql += ` and data<='${endTime}'`
    } else if (startTime && endTime) {
        sql += ` and data >='${startTime}' and data <= '${endTime}'`
    }
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`select  data'日期', supplier '供应商',Reason '不良原因',sum(hourlywage*bs)'金额'
            from  v_supplier where projectname ='问题处理单'  ${sql}
            
            group by data,supplier,Reason
            order by data desc
            `)
            .then(d=>{
               reslove({
                   status:1,
                   message:"恭喜你，查询成功！",
                   list:d['recordset'].map((item,index)=>{
                    item['key']=index
                    return item;
                   })
               })
            })
            .catch(e=>{
                console.log(e);
               reject({
                   status:0,
                   message:"查询失败！"
               })
            })
        })


        
    })



}
// 查询财务考勤表
function selectCaiwu(yibu,erbu,startTime,endTime){
    let searchSql = ""
    yibu=Number(yibu)
    erbu=Number(erbu)

    if (yibu && !erbu) {
        searchSql = "  and Salary_Main.bm='一部'"
        console.log(6666);
    } else if (!yibu && erbu) {
        searchSql = "  and Salary_Main.bm='二部'"
      
    }else {
        searchSql="where 1=1"
    }
    if (startTime && !endTime) {
        searchSql += ` and Data>='${startTime}'`
    } else if (!startTime && endTime) { 
        searchSql += ` and Data<='${endTime}'`
    } else if (startTime && endTime) {
        searchSql += ` and Data>='${startTime}' and Data<= '${endTime}'`
    }
    console.log(searchSql);
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`
            SELECT  distinct top 10000    Salary_Main.Kqcode '考勤单号', Data '日期',Salarys.personCode '工号',personName '员工姓名', WorkshopName 车间名称, TeamName 班组, bzNumber 编制人数, Number 实到人数, AttendanceRecord 出勤情况,bs 倍数,ProjectName 计时项目1,Hours 计时小时数1,HourlyWage 计时薪资1,ProjectName2 计时项目2,Hours2 计时小时数2, HourlyWage2 计时薪资2,ProjectName3 计时项目3, 
            Hours3 计时小时数3,HourlyWage3 计时薪资3, jsxj 计时薪资,Class 班别,Salary_Middle.code1 工序编码1,name1 工序名称1,Unitprice1 单价1,
            PieceworkWage1 计件薪资1,Salary_Middle.Output1 产量1,Salary_Middle.code2 工序编码2,name2 工序名称2,Unitprice2 单价2,
            PieceworkWage2 计件薪资2,Salary_Middle.Output2 产量2,Salary_Middle.code3 工序编码3,name3 工序名称3,Unitprice3 单价3,
            PieceworkWage3 计件薪资3,Salary_Middle.Output3 产量3,Salary_Middle.code4 工序编码4,name4 工序名称4,Unitprice4 单价4,PieceworkWage4 计件薪资4,Salary_Middle.Output4 产量4,Salary_Middle.code5 工序编码5,name5 工序名称5,
            Unitprice5 单价5,PieceworkWage5 计件薪资5,Salary_Middle.Output5 产量5,Salary_Middle.code6 工序编码6,name6 工序名称6,Unitprice6 单价6,PieceworkWage6 计件薪资6,Salary_Middle.Output6 产量6,Salary_Middle.code7 工序编码7,name7 工序名称7,Unitprice7 单价7,PieceworkWage7 计件薪资7,Salary_Middle.Output7 产量7,Salary_Middle.code8 工序编码8,name8 工序名称8,Unitprice8 单价8,PieceworkWage8 计件薪资8,Salary_Middle.Output8 产量8,Salary_Middle.code9 工序编码9,name9 工序名称9,Unitprice9 单价9,PieceworkWage9 计件薪资9,Salary_Middle.Output9 产量9,Salary_Middle.code10 工序编码10,
            name10 工序名称10,Unitprice10 单价10,PieceworkWage10 计件薪资10,Salary_Middle.Output10 产量10,Salary_Middle.code11 工序编码11,name11 工序名称11,Unitprice11 单价11,PieceworkWage11 计件薪资11,Salary_Middle.Output11 产量11,Salary_Middle.code12 工序编码12,name12 工序名称12,Unitprice12 单价12,PieceworkWage12 计件薪资12,Salary_Middle.Output12 产量12,Salary_Middle.code13 工序编码13,name13 工序名称13,Unitprice13 单价13,PieceworkWage13 计件薪资13,Salary_Middle.Output13 产量13,Salary_Middle.code14 工序编码14,name14 工序名称14,Unitprice14 单价14,PieceworkWage14 计件薪资14,Salary_Middle.Output14 产量14,Salary_Middle.code15 工序编码15,name15 工序名称15,Unitprice15 单价15,PieceworkWage15 计件薪资15,Salary_Middle.Output15 产量15,jjxz 计件薪资,Jjaverage 备注,SubsidyProject 补贴项目1,Subsidy 补贴金额1, SubsidyProject2 补贴项目2, Subsidy2 补贴金额2,SubsidyProject3 补贴项目3,Subsidy3 补贴金额3, btxz 补贴薪资,Wages 当日薪资,qtbs 其它倍数,qjlb 请假类别,qjsj 请假时间,bs_x 倍数明细,yn_qj 是否请假 FROM  Salary_Main inner join  Salarys ON (Salary_Main.Kqcode=Salarys.Kqcode)  
             left outer join Person ON Person.personCode= Salarys.personCode  left outer join Salary_Middle ON Salarys.Kqcode=Salary_Middle.Kqcode and isnull(Salary_Middle.jh,'')=(case when isnull(Jjaverage,'')='' then isnull(Salary_Middle.jh,'') else Jjaverage end) 
               ${searchSql}  order by Data desc
            `).then(d=>{
                reslove({
                    status:1,
                    message:"查询成功！",
                    list:d['recordset']?.map((item,index)=>{
                        item['key']=index
                        return item;
                    })
                })
            })
            .catch(e=>{
                reject({
                    status:0,
                    message:"查询失败！",
                    list:[]
                })
            })
        })


    })
}
// 查询订单表
function selectOrders(){

    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`select ordercode,num,hj,bm  from Budget`)
            .then(d=>{
                reslove({
                    status:1,
                    message:"查询成功！",
                    list:d['recordset'].map((item,index)=>{
                        item['key']=index;
                        return item;
                    })
                })
            })
            .catch(e=>{
              
                reject({
                    status:0,
                    message:"查询失败！",
                    list:[]
                })
            })
        })


    })


}

// 根据订单查询车间预算数据

function selectYusuan(){

    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`
            select cj 车间,Process.Code 工序编码,Name 工序名称,UnitPrice 单价,bm 部门,ordercode from Process,Budgets where 
            yn='1' and Budgets.code=Process.code 
            `).then(d=>{
                 reslove({
                     status:1,
                     message:"查询成功！",
                     list:d['recordset'].map((item,index)=>{
                        item['key']=index
                        return item;
                     })
                 })
            })
            .catch(e=>{
                reject({
                    status:0,
                    message:"查询失败！"
                })
            })
        })

    })


}
// 插入一条订单记录

function insertYusuan(ordercode,code,yn){

    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`insert into Budgets (ordercode,code,yn) values ('${ordercode}','${code}','${yn}')`)
            .then(d=>{
                reslove({
                    status:1,
                    message:"添加数据成功！"
                })

            })
            .catch(e=>{
                console.log(e);
                reject({
                    status:0,
                    message:"添加数据失败！"
                })
            })
        })


    })


}

//查询逻辑
/**1.select Money from Project where ProjectName= '多种花色'and bm='一部'
 * Money: 10.34 
 * 2.select Price from SubsidyProject where SubsidyName= '劳动强度补贴'and  bm='一部'
 * { Price: 0 } 
 * 
 * 3.insert into Salary_Main (Kqcode,Data,WorkshopName,TeamName,Number,Class,bzNumber,Entry_Person,bm,yn_tx)
 * values
 * ('KQ-20210715110351','2021-07-15','强化压贴车间','9#压机,夜班管理人员','1','白班','27','52814','一部','')
 */
function selectContent(){
    return new Promise(()=>{
        connect.then(r=>{
            r.query(`select sum(AttendanceRecord) from Salarys a ,Salary_Main b where personcode=right('000000'+ltrim('52814'),5) and Class='白班' and a.kqcode=b.kqcode and b.data='2021-07-15'and a.kqcode<>'KQ-20210715110351'`)
            .then(d=>{
                console.log(d)
            })
        }).catch(e=>{
            console.log(e);
        })


    })


}
selectContent()
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
    select_contents,
    select_kaoqing,
    select_qingjia,
    selectSalayTotal,
    selectWorkNumbers,
    selectProblem,
    selectCaiwu,
    selectOrders,
    selectYusuan,
    insertYusuan
}