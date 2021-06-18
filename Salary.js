const express = require("express")
const app = express()
// 导入操作数据库资源
const {selectAllNews,DeleteContent}=require("./db/sqlService/salaryService")


// 查询所有基础内容


app.get("/salary/selectAllNews",async(req,resp)=>{

    try{
        let result=await selectAllNews()
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"查询失败！"
        })
    }



})

// 拼接sql 删除内容

app.get("/salary/deleteContent",async(req,resp)=>{
    const {data,type,code}=req.query
    try{
        let result =await DeleteContent(data,type,code)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"抱歉，删除失败！"
        })
    }


})


app.listen(3099, (err, data) => {
    if (!err) {
        console.log("http://localhost:3099服务启动成功！");
    }


})