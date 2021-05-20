const mysql=require("mysql")

const connect= mysql.createConnection({
    user:"root",
    password:"root",
    database:"erp",
    port:3306,
    host:"10.86.0.60"
})

connect.connect((err)=>{
    if(!err){
        console.log("数据库连接成功！")
    }else {
        console.log(err)
    }
})
module.exports=connect