const axios=require("axios")
const {Wage}=require("../../utils/serverConfig")
const qs=require("qs")

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
module.exports={
    selectAllNews,
    deleteContent,
    updateWorkshop,
    insertWorkshop,
    insertTeam,
    alterTeam
}