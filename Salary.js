const express = require("express")
const app = express()
// 导入操作数据库资源
const {selectAllNews,DeleteContent,updateWorkshop,addWorkshop}=require("./db/sqlService/salaryService")


// 设置允许解析body
// 解析 body
app.use(express.urlencoded({extended:true})) 

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

// 更新车间信息
app.post("/salary/updateWorkshop",async(req,resp)=>{
    const {WorkshopName,workCode}=req.body
    
    try{
        let result=await updateWorkshop(WorkshopName,workCode)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"更新失败！"
        })
    }



})

// 添加一条车间信息

app.post("/salary/addContent",async(req,resp)=>{
     const {WorkshopName,bm}=req.body
    try{
        let result=await addWorkshop(WorkshopName,bm)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"添加失败"
        })
    }



})


app.listen(3099, (err, data) => {
    if (!err) {
        console.log("http://localhost:3099服务启动成功！");
    }


})