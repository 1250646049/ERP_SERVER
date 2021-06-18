const axios=require("axios")
const {Wage}=require("../../utils/serverConfig")




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
module.exports={
    selectAllNews,
    deleteContent
}