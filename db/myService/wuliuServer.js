const connect=require("../mysqlDb")



// 查询物流到货预测邮箱发送


function getEmail(person='cb'){
    return new Promise((reslove,reject)=>{

        connect.query("select * from w_emails where perpson=?",[person],(err,data)=>{
         
            if(!err){
                reslove({
                    status:1,
                    message:"恭喜你查询成功！",
                    data:{...data[0]}
                })
            }else {
                reject({
                    status:0,
                    message:"抱歉，查询失败！",
                    data:[]
                })
            }

        })
    })
}


// 添加内容 物流到货预计

function setEmail(content){
    const {username,password,sendEmail,shouEmail,subject}=content
        
    return new Promise((reslove,reject)=>{
        connect.query("update w_emails set username=?,password=?,sendEmail=?,shouEmail=?,subject=? where perpson='cb'",[username,password,sendEmail,shouEmail,subject],(err,data)=>{
          
            if(!err){
                reslove({
                    status:1,
                    message:"恭喜你，添加成功！"
                })
            }else {
                
                reject({
                    status:0,
                    message:"抱歉，添加失败"
                })
            }
        })
    })
}

// 更新上传模板设置
function setMoban(moban){
    
    return new Promise((reslove,reject)=>{
       
        connect.query("update  w_emails set moban=?,times=? where perpson='cb'",[moban,""],(err,data)=>{
            
            if(!err){
                reslove({
                    status:1,
                    message:"success"
                })
            }else {
                
                reject({
                    status:0,
                    message:"error"
                })
            }
        })


    })
}
module.exports={
    getEmail,
    setEmail,
    setMoban
}