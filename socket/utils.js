const fs=require("fs")
const path=require("path")






// 更新系统通知


function updateSystem(data){
  
    fs.writeFileSync(path.join(__dirname,"system.json"),JSON.stringify(data))
}

module.exports={
    updateSystem
}