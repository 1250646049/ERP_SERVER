const axios=require("axios")
const {Wage}=require("../../utils/serverConfig")
const qs=require("qs")
const connect = require("../../db/mysqlDb")
// 用axios实例化的方式更新post请求
const instance=axios.create({

})
instance.interceptors.request.use(config=>{
    config['data']=qs.stringify(config['data'])

    return config;
}) 

// 远程调用资源查询

function selectAllNews(){
    return new Promise((reslove,reject)=>{
    axios.get(Wage+"/salary/selectAllNews")
    .then(r=>{
        reslove({
            status:1,
            message:"查询成功！",
            data:{...r.data}
        })
    }).catch(e=>{
        reject({
            status:0,
            message:"查询失败！"
        })
    })



    })




}
// 远程调用资源删除

// /salary/deleteContent
function deleteContent(data,type,code){
    return new Promise((reslove,reject)=>{
    axios.get(Wage+"/salary/deleteContent",{params:{data,type,code}})
    .then(r=>{
        reslove({
            status:1,
            message:"删除成功！",
     
        })
    }).catch(e=>{
        reject({
            status:0,
            message:"删除失败！"
        })
    })



    })




}
// 调用资源更新workShop

function updateWorkshop(WorkshopName,workCode){
   
  return new Promise((reslove,reject)=>{
    instance.post(Wage+"/salary/updateWorkshop",{WorkshopName,workCode})
    .then(r=>{
        
        reslove({
            ...r.data
        })

    })
    .catch(()=>{

        reject({
            status:0,
            message:"更新失败！"
        })
    })





  })



}

// 调用远程资源添加一条workShop

function insertWorkshop(WorkshopName,bm){

    return new Promise((reslove,reject)=>{
        instance.post(Wage+"/salary/addContent",{WorkshopName,bm})
        .then(r=>{
            reslove({
                ...r.data
            })
        })
        .catch(e=>{
            reject({
                status:0,
                message:"添加失败"
            })
        })



    })


}


// 调用远程资源添加一条Team
function insertTeam(WorkshopCode, TeamName, number, bm){

    return new Promise((reslove,reject)=>{
        instance.post(Wage+"/salary/addTeam",{
            WorkshopCode, TeamName, number, bm
         })
         .then(r=>{

            reslove({...r.data})
         })
         .catch(e=>{
             reject({
                 status:0,
                 message:"抱歉，添加item班组信息失败！"
             })
      
         })
    })


}
// 远程调用资源修改一条Team
function alterTeam(TeamCode,WorkshopCode, TeamName, number, bm){

    return new Promise((reslove,reject)=>{
        instance.post(Wage+"/salary/alterTeam",{
            TeamCode,WorkshopCode, TeamName, number, bm
        })
        .then(r=>{
            reslove({
                ...r.data
            })
        })
        .catch(e=>{
            reject({
                status:0,
                message:"修改失败！"
            })
        })
    })


}

// 远程调用资源插入一条数据

function insertPerson(PersonCode,PersonName,WorkshopCode,Teamcode){
    return new Promise((reslove,reject)=>{
        instance.post(Wage+"/salary/insertPerson",{PersonCode,PersonName,WorkshopCode,Teamcode})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })


    })


}

// 远程调用资源修改员工信息
function updatePerson(PersonCode,PersonName,WorkshopCode,Teamcode){
    return new Promise((reslove,reject)=>{
        instance.post(Wage+"/salary/updatePersonById",{PersonCode,PersonName,WorkshopCode,Teamcode})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{reject({...e.data})})
    })



}

// 远程调用查询所有员工信息
function selectPerson(){
  
   return new Promise((reslove,reject)=>{
    instance.get(Wage+"/salary/selectPerson")
    .then(r=>{
        
        reslove({...r.data})
    })
    .catch(e=>{
        console.log(e);
        reject({...e.data})
    })



   })
}

// 远程调用资源插入一条工序
function insertProcess(cj,Code,Name,UnitPrice,bm){
    return new Promise((reslove,reject)=>{
        instance.post(Wage+"/salary/insertProcess",{cj,Code,Name,UnitPrice,bm})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })


    })


}

// 远程调用资源更新一条工序

function updateProcess(cj,Code,Name,UnitPrice,bm){
    return new Promise((reslove,reject)=>{
        instance.post(Wage+"/salary/updateProcess",{cj,Code,Name,UnitPrice,bm})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })

    })
}
// 计时项目
// 添加
function insertProject(ParentCode,ProjectName,Money,bm){
    return new Promise((reslove,reject)=>{
        instance.post(Wage+"/salary/insertProject",{ParentCode,ProjectName,Money,bm})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })


    })


}
// 修改
function updateProject(ParentCode,ProjectCode,ProjectName,Money,bm){
    return new Promise((reslove,reject)=>{
        instance.post(Wage+"/salary/updateProject",{ParentCode,ProjectCode,ProjectName,Money,bm})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })

    })
}
// 补贴项目

// 添加
function insertSubsidyProject(SubsidyName,Price,bm){
    return new Promise((reslove,reject)=>{
        instance.post(Wage+"/salary/SubsidyProject",{SubsidyName,Price,bm})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })


    })


}
// 修改
function updateSubsidyProject(Id,SubsidyName,Price,bm){
    return new Promise((reslove,reject)=>{
        instance.post(Wage+"/salary/updateSubsidyProject",{Id,SubsidyName,Price,bm})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })

    })
}
// 请假类别
// 添加
function insertHY_Department(d_Name,bm){
    return new Promise((reslove,reject)=>{
        instance.post(Wage+"/salary/insertHY_Department",{d_Name,bm})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })


    })


}

// 查询总工序
function selectSalary_Main(number){
    return new Promise((reslove,reject)=>{
        instance.get(Wage+"/salary/selectSalary_Main",{params:{number}})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.error})
        })


    })


}
// 根据工序id查询工序
function selectSalary_code(kqcode){
  
    return new Promise((reslove,reject)=>{
        instance.get(Wage+"/salary/selectSalary_code",{params:{kqcode}})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject(e=>{e.data})
        })
    })

}

// 搜索所有工序
// 查询所有结果
function select_contents(){
    return new Promise((reslove,reject)=>{
            instance.get(Wage+"/selectSalary_code")
            .then(r=>{
               reslove({...r.data})

            })
            .catch(e=>{
                reject({...r.error})
            })


    })
}

// search内容
function search_content(yibu, erbu, type, content, startTime, endTime){
    
    return new Promise((reslove,reject)=>{
        instance.get(Wage+"/salary/select_contents",{params:{yibu, erbu, type, content, startTime, endTime}})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })


    })


}

// 查询考勤信息
function select_kaoqing(number,yibu,erbu,startTime,endTime,personCode){
    
    return new Promise((reslove,reject)=>{
        instance.get(Wage+"/salary/select_kaoqing",{params:{number,yibu,erbu,startTime,endTime,personCode}})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })



    })

}
// 查询请假信息
function select_qingjia(number,yibu,erbu,startTime,endTime,personCode){

    return new Promise((reslove,reject)=>{
        instance.get(Wage+"/salary/select_qingjia",{params:{number,yibu,erbu,startTime,endTime,personCode}})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })



    })

}
// 查询薪资汇总

function select_salary_total(yibu,erbu,startTime,endTime,personCode){
    
    return new Promise((reslove,reject)=>{
        instance.get(Wage+"/salary/selectSalayTotal",{params:{yibu,erbu,startTime,endTime,personCode}})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })




    })


}

// 远程查询部门薪资汇总
function select_depart_salary(WorkshopName,bm,startTime,endTime){
    return new Promise((reslove,reject)=>{
        instance.get(Wage+"/salary/selectWorkNumbers",{params:{WorkshopName,bm,startTime,endTime}})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })



    })



}

// 远程查询问题处理单
function select_problem(startTime,endTime){
    return new Promise((reslove,reject)=>{
        instance.get(Wage+"/salary/selectProblem",{params:{startTime,endTime}})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })


    })


}

// 远程查询财务考勤
function select_caiwu_kaoqing(yibu,erbu,startTime,endTime){
    return new Promise((reslove,reject)=>{
        instance.get(Wage+"/salary/selectCaiwu",{params:{yibu,erbu,startTime,endTime}})
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })



    })
}
// 远程查询所有订单信息
function selectAllOrders(){
    return new Promise((reslove,reject)=>{
        instance.get(Wage+"/salary/selectOrders")
        .then(r=>{
            reslove({...r.data})
        })
        .catch(e=>{
            reject({...e.data})
        })



    })
}
module.exports={
    selectAllNews,
    deleteContent,
    updateWorkshop,
    insertWorkshop,
    insertTeam,
    alterTeam,
    insertPerson,
    updatePerson,
    selectPerson,
    insertProcess,
    updateProcess,
    insertProject,
    insertSubsidyProject,
    insertHY_Department,
    updateSubsidyProject,
    updateProject,
    selectSalary_Main,
    selectSalary_code,
    select_contents,
    search_content,
    select_kaoqing,
    select_qingjia,
    select_salary_total,
    select_depart_salary,
    select_problem,
    select_caiwu_kaoqing,
    selectAllOrders
    
}