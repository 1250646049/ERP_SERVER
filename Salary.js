const express = require("express")
const app = express()
// 导入操作数据库资源
const {selectAllNews,DeleteContent,updateWorkshop,addWorkshop, addTeam, alterTeam
,insertPerson,updatePersonById,selectPerson,insertProcess,alterProcess,insertHY_Department,insertProject,insertSubsidyProject,
updateProject,updateSubsidyProject,selectSalary_Main,select_contents,selectSalary_code
}=require("./db/sqlService/salaryService")


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

// 添加一条班组信息

app.post("/salary/addTeam",async(req,resp)=>{
    const {WorkshopCode, TeamName, number, bm}=req.body
    try{
        let result=await addTeam(WorkshopCode,TeamName,number,bm)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"抱歉，添加班组信息失败！"
        })
    }


})

// 修改指定的班组信息
app.post("/salary/alterTeam",async(req,resp)=>{
    const {TeamCode,WorkshopCode, TeamName, number, bm}=req.body

    try{
        let result=await alterTeam(TeamCode,WorkshopCode,TeamName,number,bm)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"修改失败！"
        })
    }

})

// 插入一条人员信息
app.post("/salary/insertPerson",async(req,resp)=>{
    const {PersonCode,PersonName,WorkshopCode,Teamcode}=req.body
  
    try{
        let result=await insertPerson(PersonCode,PersonName,WorkshopCode,Teamcode)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"插入失败！"
        })
    }
})
// 修改一条人员信息
app.post("/salary/updatePersonById",async(req,resp)=>{

    const {PersonCode,PersonName,WorkshopCode,Teamcode}=req.body
 
    try{
        let result=await updatePersonById(PersonCode,PersonName,WorkshopCode,Teamcode)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"抱歉，更新数据失败！"
        })
    }


})

// 查询所有员工信息
app.get("/salary/selectPerson",async(req,resp)=>{

    try{
        let result=await selectPerson()
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"查询失败！"
        })
    }

})

// 添加一条工序信息
app.post("/salary/insertProcess",async(req,resp)=>{
    const {cj,Code,Name,UnitPrice,bm}=req.body
    try{
        let result=await insertProcess(cj,Code,Name,UnitPrice,bm)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"修改工序失败！"
        })
    }
})

// 修改一条工序信息
app.post("/salary/updateProcess",async(req,resp)=>{
    const {cj,Code,Name,UnitPrice,bm}=req.body
   
    try{
        let result=await alterProcess(cj,Code,Name,UnitPrice,bm)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"修改工序失败！"
        })
    }



})

// 计时项目
// 添加
app.post("/salary/insertProject",async(req,resp)=>{
    const {ParentCode,ProjectName,Money,bm}=req.body

    try{
        let result=await insertProject(ParentCode,ProjectName,Money,bm)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"抱歉，修改失败！"
        })
    }


})

// 修改
app.post("/salary/updateProject",async(req,resp)=>{
    const {ParentCode,ProjectCode,ProjectName,Money,bm}=req.body

    try{
        let resul=await updateProject(ParentCode,ProjectCode,ProjectName,Money,bm)
        resp.json(resul)
    }catch{
        resp.json({
            status:0,
            message:"修改数据失败！"
        })
    }


})

// 补贴项目 
// 添加
app.post("/salary/SubsidyProject",async(req,resp)=>{
    const {SubsidyName,Price,bm}=req.body

    try{
        let result=await insertSubsidyProject(SubsidyName,Price,bm)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"抱歉，添加补贴项目失败！"
        })
    }


})

// 修改
app.post("/salary/updateSubsidyProject",async(req,resp)=>{
    const {Id,SubsidyName,Price,bm}=req.body
    try{
        let result=await updateSubsidyProject(Id,SubsidyName,Price,bm)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"抱歉，修改补贴项目失败！"
        })
    }


})

// 请假类别
// 添加

app.post("/salary/insertHY_Department",async(req,resp)=>{
    const {d_Name,bm}=req.body

    try{
        let reuslt=await insertHY_Department(d_Name,bm)
        resp.json(reuslt)
    }catch{
        resp.json({
            status:0,
            message:"抱歉，添加请假类别失败！"
        })
    }


})

// 查询工序
app.get("/salary/selectSalary_Main",async(req,resp)=>{
    const {number}=req.query
    try{
        let result=await selectSalary_Main(number)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"查询失败！"
        })
    }


})

// 查询code
app.get("/salary/selectSalary_code",async(req,resp)=>{
    const {kqcode}=req.query
   
    try{
        let result=await selectSalary_code(kqcode)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"查询失败！"
        })
    }


})

//筛选工序
app.get("/salary/select_contents",async(req,resp)=>{
    const {yibu, erbu, type, content, startTime, endTime}=req.query
    try{
        let result=await select_contents(yibu, erbu, type, content, startTime, endTime)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"查询失败！"
        })
    }


})
app.listen(3099, (err, data) => {
    if (!err) {
        console.log("http://localhost:3099服务启动成功！");
    }


})