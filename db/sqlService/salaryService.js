
const connect=require("../WageDb")



// 查询车间信息

function selectWorkshop(){

   return new Promise((reslove,reject)=>{
    connect.then(resp=>{
        resp.query("select * from Workshop order by WorkshopCode asc")
        .then(d=>{
            reslove({
                status:1,
                message:"查询成功！",
                Work:d['recordset'].length?d['recordset'].map((item,index)=>{
                    item['key']=index
                    return {...item}
                }):[] 
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

// 更新车间信息

function updateWorkshop(WorkshopName,workCode){
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`update Workshop set WorkshopName='${WorkshopName}' where WorkshopCode='${workCode}'`)
            .then(d=>{
                reslove({
                    status:1,
                    message:"更新成功！"
                })
            })
            .catch((e)=>{
                console.log(e);
                reject({
                    status:0,
                    message:"更新失败！"
                })


            })


        })



    })



}

// 添加一条车间信息

async function addWorkshop(WorkshopName,bm){
    let {Work}=await selectWorkshop()
    let code=123
    if(Work[Work.length-1]){
        code=Work[Work.length-1]['WorkshopCode']
        code=Number(code.split("CJ")[1])
        code+=1 
        let type=code<=999?('0'+code):code
        code="CJ"+type 
    
    } 
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`insert into Workshop(WorkshopCode,WorkshopName,bm) values('${code}','${WorkshopName}','${bm}')`)
            .then(r=>{
                reslove({
                    status:1,
                    message:"插入数据成功！"          
                })
            })
            .catch(e=>{
                reject({
                    status:0,
                    message:"插入数据失败！"
                })
            })
        })



    })
}

// 查询班组信息
function selectTeam(){

    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query("select * from Team t left join Workshop w on t.WorkshopCode=w.WorkshopCode order by t.TeamCode asc")
            .then(d=>{
                reslove({
                    status:1,
                    message:"查询成功！",
                    Team:d['recordset'].length?d['recordset'].map((item,index)=>{
                        item['key']=index
                        return {...item}
                    }):[]
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
// 添加一条班组信息
async function addTeam(WorkshopCode,TeamName,number,bm){
    let {Team}=await selectTeam()
    let code;
    if(Team[Team.length-1]){
        code=Team[Team.length-1]['TeamCode']
        code=Number(code.split("CJ")[1])
        code+=1 
        let type=code<=999?('0'+code):code
        code="CJ"+type 
    } 
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`insert into Team(TeamCode,WorkshopCode,TeamName,number,bm) values('${code}','${WorkshopCode}','${TeamName}','${number}','${bm}')`)
            .then(d=>{
                reslove({
                    status:1,
                    message:"恭喜你，添加班组信息成功！"
                })
            })
            .catch(e=>{
                reject({
                    status:0,
                    message:"抱歉，添加班组信息失败！"
                })
            })
        })



    })
}
// 修改一条班组信息
function alterTeam(TeamCode,WorkshopCode,TeamName,number,bm){
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`update Team set WorkshopCode='${WorkshopCode}',TeamName='${TeamName}',number='${number}',bm='${bm}' where TeamCode='${TeamCode}'`)
            .then(d=>{
                reslove({
                    status:1,
                    message:"恭喜你，修改班组信息成功！"
                })
            })
            .catch(e=>{
                reject({
                    status:0,
                    message:"抱歉，修改班组信息失败！"
                })
            })
        })



    })
}
// 查询所有员工信息

function selectPerson(){

    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`select p.PersonCode,p.PersonName,w.WorkshopCode,w.WorkshopName,t.TeamCode,t.TeamName from Person p 
            left join Workshop w on p.WorkshopCode=w.WorkshopCode 
            left join Team t on t.TeamCode=p.TeamCode
            order by p.PersonCode asc 
            `)
            .then(d=>{
                reslove({
                    status:1,
                    message:"查询成功！",
                    Person:d['recordset'].length?d['recordset'].map((item,index)=>{
                        item['key']=index
                        return {...item}
                    }):[]
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
// 添加一条员工内容
function insertPerson(PersonCode,PersonName,WorkshopCode,Teamcode){

    return new Promise((reslove,reject)=>{
        connect.then((r)=>{
            r.query(`insert into Person(PersonCode,PersonName,WorkshopCode,Teamcode) values('${PersonCode}','${PersonName}','${WorkshopCode}','${Teamcode}')`)
            .then(_=>{
                reslove({
                    status:1,
                    message:"插入数据成功！"
                })
            })
            .catch(_=>{
               console.log(_);
                reject({
                    status:0,
                    message:"插入数据失败！"
                })
            })
        })


    })

}
// 修改指定的员工
function updatePersonById(PersonCode,PersonName,WorkshopCode,Teamcode){
   
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`update Person set PersonName='${PersonName}',WorkshopCode='${WorkshopCode}',Teamcode='${Teamcode}' where PersonCode='${PersonCode}'`)
            .then(r=>{
                reslove({
                    status:1,
                    message:"恭喜你，修改成功！"
                })
            })
            .catch(e=>{
                
                reject({
                    status:0,
                    message:"抱歉，修改失败！"
                })
            })
        })




    })



}
// 查询工序工价
function selectProcess(){

    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query("select * from Process")
            .then(d=>{
                reslove({
                    status:1,
                    message:"查询成功！",
                    Process:d['recordset'].length?d['recordset'].map((item,index)=>{
                        item['key']=index
                        return {...item}
                    }):[]
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

// 添加一条工序内容
function insertProcess(cj,Code,Name,UnitPrice,bm){
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`insert into Process(cj,Code,Name,UnitPrice,bm) values('${cj}','${Code}','${Name}','${UnitPrice}','${bm}')`)
            .then(r=>{
                reslove({
                    status:1,
                    message:"插入工序成功"
                })
            })
            .catch(e=>{
                reject({
                    status:0,
                    message:"插入工序失败！"
                })
            })
        })


    })


}

// 根据code修改指定工序内容
function alterProcess(cj,Code,Name,UnitPrice,bm){
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`update Process set cj='${cj}',Name='${Name}',UnitPrice='${UnitPrice}',bm='${bm}' where Code='${Code}'`)
            .then(r=>{
                reslove({
                    status:1,
                    message:"修改工序成功！"
                })
            }).catch(e=>{
            
                reject({
                    status:0,
                    message:"修改工序失败！"
                })
            })
        })


    })
}
// 查询计时项目

// Project
function selectProject(){

    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query("select * from Project order by ProjectCode asc")
            .then(d=>{
                reslove({
                    status:1,
                    message:"查询成功！",
                    Project:d['recordset'].length?d['recordset'].map((item,index)=>{
                        item['key']=index
                        return {...item}
                    }):[]
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

// 添加项目

 function insertProject(ParentCode,ProjectName,Money,bm){
 
   
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`insert into Project(ParentCode,ProjectName,Money,bm) values('${ParentCode}','${ProjectName}','${Money}','${bm}')`)
            .then(d=>{
                reslove({
                    status:1,
                    message:"恭喜你，添加成功！"
                })
            }).catch(e=>{
                console.log(e);
                reject({
                    status:0,
                    message:"抱歉，添加失败！" 
                })
            })
        })


    })
}

// 修改项目
function updateProject(ParentCode,ProjectCode,ProjectName,Money,bm){
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`update Project set ParentCode='${ParentCode}',ProjectName='${ProjectName}',Money='${Money}',bm='${bm}' where ProjectCode='${ProjectCode}'`)
            .then(r=>{
                reslove({
                    status:1,
                    message:"修改数据成功！"
                })
            }).catch(e=>{
                reject({
                    status:0,
                    message:"修改数据失败！"
                })
            })
        })



    })


}
// 补贴项目 
// SubsidyProject
function selectSubsidyProject(){

    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query("select * from SubsidyProject")
            .then(d=>{
                reslove({
                    status:1,
                    message:"查询成功！",
                    SubsidyProject:d['recordset'].length?d['recordset'].map((item,index)=>{
                        item['key']=index
                        return {...item}
                    }):[]
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
// 添加补贴项目
function insertSubsidyProject(SubsidyName,Price,bm){
 
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`insert into SubsidyProject(SubsidyName,Price,bm) values('${SubsidyName}','${Price}','${bm}')`)
            .then(d=>{
                reslove({
                    status:1,
                    message:"恭喜你，添加成功！"
                })
            }).catch(e=>{
                console.log(e);
                reject({
                    status:0,
                    message:"抱歉，添加失败！" 
                })
            })
        })


    })
}

// 修改补贴项目
function updateSubsidyProject(Id,SubsidyName,Price,bm){
 
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`update SubsidyProject set SubsidyName='${SubsidyName}',Price='${Price}',bm='${bm}' where Id='${Id}'`)
            .then(d=>{
                reslove({
                    status:1,
                    message:"恭喜你，添加成功！"
                })
            }).catch(e=>{
                console.log(e);
                reject({
                    status:0,
                    message:"抱歉，添加失败！" 
                })
            })
        })


    })
}

// 请假类别
// HY_Department
function selectHY_Department(){

    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query("select * from HY_Department")
            .then(d=>{
                reslove({
                    status:1,
                    message:"查询成功！",
                    HY_Department:d['recordset'].length?d['recordset'].map((item,index)=>{
                        item['key']=index
                        return {...item}
                    }):[]
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

// 添加请假类别
function insertHY_Department(d_Name,bm){
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`insert into HY_Department(d_Name,bm) values('${d_Name}','${bm}')`)
            .then(d=>{
                reslove({
                    status:1,
                    message:"恭喜你，添加成功！"
                })
            }).catch(e=>{
                console.log(e);
                reject({
                    status:0,
                    message:"抱歉，添加失败！" 
                })
            })
        })


    })

}
// 整合所有内容 信息维护

async function selectAllNews(){
    try{
        let work=await selectWorkshop()
        let team=await selectTeam()
        
        let process=await selectProcess()
        let project=await selectProject()
        let subsidyProject=await selectSubsidyProject()
        let HY_Department=await selectHY_Department()
        return {
            status:1,
            message:"查询成功！",
            work:work['Work'],
            team:team['Team'],
           
            process:process['Process'],
            project:project['Project'],
            subsidyProject:subsidyProject['SubsidyProject'],
            HY_Department:HY_Department['HY_Department']
        }


    }catch{

        return {
            status:0,
            message:"查询失败！"
        }

    }



}

// 拼接sql语句删除对应字段
function DeleteContent(data,type,code){
   console.log(data,type,code);
  return new Promise((reslove,reject)=>{
    connect.then(r=>{
        r.query(`delete from ${data} where ${type}='${code}'`)
        .then(d=>{
           
            reslove({
                status:1,
                message:"删除失败！"
            }) 
        })
        .catch(e=>{
            console.log(e);
            reject({
                status:0, 
                message:"删除失败！"
            })
        })


    })
  })



}


module.exports={
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
    updateSubsidyProject
}