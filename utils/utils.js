const md5=require("md5")
const fs=require("fs")
const monent=require("moment")
const path=require("path")
// 加密密码
const {setMoban}=require("../db/myService/wuliuServer")

function addPassword(password){


    return md5(password)
}

// 获取当前日期时间
function getCurrentTimes(){
    return monent().format("YYYY-MM-DD HH:mm:ss")
}

function getDate(){

    return monent().format("YYYY-MM-DD");
}
// 物流上传保存

 async function uploadWuliu(file){
    const {originalname}=file
    const type=originalname.substring(originalname.lastIndexOf("."))
    
   try{

    fs.writeFileSync("public/moban/物流部物料到货预测表"+type,file.buffer,{encoding:"binary"})
    filePath=path.join(__dirname,"../public/moban/物流部物料到货预测表"+type)
    result= await setMoban(filePath)
    return result;
   }
   catch{
       return {
            status:0,
            message:"抱歉，上传失败！"
        }
   }
   

}
// sqltime 转化为 时间
function sqlTime2times(time){

    return monent(time).format("YYYY-MM-DD hh:ss:mm")
}

module.exports={
    addPassword,
    uploadWuliu,
    getCurrentTimes,
    sqlTime2times,
    getDate
}