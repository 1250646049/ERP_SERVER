const axios=require("axios")
const {sql017}=require("../../utils/serverConfig")


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
module.exports={
    getYingshoukuan
}