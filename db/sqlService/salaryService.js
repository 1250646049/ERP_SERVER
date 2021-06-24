
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
            r.query(`select * from Person p 
            left join Workshop w on p.WorkshopCode=w.WorkshopCode 
            left join Team t on t.TeamCode=p.TeamCode`)
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
// 查询计时项目

// Project
function selectProject(){

    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query("select * from Project")
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

// 整合所有内容 信息维护

async function selectAllNews(){
    try{
        let work=await selectWorkshop()
        let team=await selectTeam()
        let person=await selectPerson()
        let process=await selectProcess()
        let project=await selectProject()
        let subsidyProject=await selectSubsidyProject()
        let HY_Department=await selectHY_Department()
        return {
            status:1,
            message:"查询成功！",
            work:work['Work'],
            team:team['Team'],
            person:person['Person'],
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
    alterTeam
}