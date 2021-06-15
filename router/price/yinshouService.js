const axios=require("axios")
const {sql017,sql003}=require("../../utils/serverConfig")


// 远程调用获取资源

function getYingshoukuan(number){

    return new Promise((reslove,reject)=>{
        axios.get(sql017+"/selectYinshou",{params:{number}})
        .then(r=>reslove({
            ...r.data
        }))
        .catch(e=>reject({
            status:0,
            message:"抱歉，查询失败！"
        }))


    })


}




// 远程调用获取资源 搜索 017账套

function searchYingshoukuan(type,search){
 
    return new Promise((reslove,reject)=>{
        axios.get(sql017+"/searchYinshou",{params:{type,search}})
        .then(r=>reslove({
            ...r.data
        }))
        .catch(e=>reject({
            status:0,
            message:"抱歉，查询失败！"
        }))


    })


}

// 远程调用获取资源 搜索 003账套

function searchYingshoukuan003(type,search){
   
    return new Promise((reslove,reject)=>{
        axios.get(sql003+"/searchYinshou",{params:{type,search}})
        .then(r=>reslove({
            ...r.data 
        }))
        .catch(e=>reject({
            status:0,
            message:"抱歉，查询失败！"
        }))
 

    })


}

// 远程调用获取资源 搜索 查询账套
function getYingshoukuan003(number){

    return new Promise((reslove,reject)=>{
        axios.get(sql003+"/selectYinshou",{params:{number}})
        .then(r=>reslove({
            ...r.data
        }))
        .catch(e=>reject({
            status:0,
            message:"抱歉，查询失败！"
        }))


    })


}

module.exports={
    getYingshoukuan,
    searchYingshoukuan,
    searchYingshoukuan003,
    getYingshoukuan003
}