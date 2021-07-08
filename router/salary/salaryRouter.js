
const express = require("express")

const router = express.Router()
const {selectAllNews,deleteContent,updateWorkshop,insertWorkshop,insertTeam, alterTeam,insertPerson,updatePerson,selectPerson
,insertProcess,updateProcess,insertProject,insertSubsidyProject,insertHY_Department,updateProject,updateSubsidyProject,
selectSalary_Main,selectSalary_code,select_contents,search_content,select_kaoqing,select_qingjia,select_salary_total
}=require("./salaryService")
// 查询所有


router.get("/selectAllNews",async(req,resp)=>{
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

// 拼接sql删除内容

router.get("/deleteContent",async(req,resp)=>{
    let {data,type,code}=req.query
    try{
        let result=await deleteContent(data,type,code)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"抱歉，删除失败！"
        })
    }


})

// 更新workshop

router.post("/updateWorkshop",async(req,resp)=>{
    const {WorkshopName,WorkshopCode}=req.body 
 
try{
    let result=await updateWorkshop(WorkshopName,WorkshopCode)
    resp.json(result)

}catch{
    resp.json({
        status:0, 
        message:"更新失败！"
    })
}



})
// 添加一条Workshop

router.post("/insertWorkshop",async(req,resp)=>{
    const {WorkshopName,bm}=req.body

    try{
        let result=await insertWorkshop(WorkshopName,bm)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"添加WorkShop数据失败！"
        })
    }



})

// 添加一条Team班组
router.post("/insertTeam",async(req,resp)=>{
    const {WorkshopCode, TeamName, number, bm}=req.body
    try{
        let result=await insertTeam(WorkshopCode, TeamName, number, bm)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"添加数据失败！"
        })
    }


})

// 修改一条班组
router.post("/alterTeam",async(req,resp)=>{
    const {TeamCode,WorkshopCode,TeamName,number,bm}=req.body
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

// 插入一条员工信息
router.post("/insertPerson",async(req,resp)=>{
    const {PersonCode,PersonName,WorkshopCode,Teamcode}=req.body
   
    try{ 
        let result=await insertPerson(PersonCode,PersonName,WorkshopCode,Teamcode)
        resp.json(result)
    }catch{
        resp.json({ 
            status:0,
            message:"抱歉，插入失败"
        })
    }


})
// 更新一条台湾员工
router.post("/updatePerson",async(req,resp)=>{
    const {PersonCode,PersonName,WorkshopCode,Teamcode}=req.body

    try{
        let result=await updatePerson(PersonCode,PersonName,WorkshopCode,Teamcode)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"修改失败！"
        })
    }



})
// 查询所有员工

router.get("/selectPerson",async(req,resp)=>{
    try{
        let result=await selectPerson()
        resp.json(result)
    }catch{
        resp.json({ 
            status:0,
            message:"抱歉，查询失败！"
        })
    }
})

// 插入一条工序
router.post("/insertProcess",async(req,resp)=>{
    const {cj,Code,Name,UnitPrice,bm}=req.body

    try{
        let result=await insertProcess(cj,Code,Name,UnitPrice,bm)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"插入工序失败！"
        })
    }


})
// 修改一条工序
router.post("/updateProcess",async(req,resp)=>{
    const {cj,Code,Name,UnitPrice,bm}=req.body 

    try{
        let result=await updateProcess(cj,Code,Name,UnitPrice,bm)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"修改工序失败！"
        })
    }


})
// --------------------------
// 计时项目
// 添加
router.post("/insertProject",async(req,resp)=>{
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
router.post("/updateProject",async(req,resp)=>{
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
router.post("/SubsidyProject",async(req,resp)=>{
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
router.post("/updateSubsidyProject",async(req,resp)=>{
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

router.post("/insertHY_Department",async(req,resp)=>{
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

// 查询所有工序

router.get("/selectSalary_Main",async(req,resp)=>{
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

// 根据keycode查询工序

router.get("/selectSalary_code",async(req,resp)=>{
    const {keycode}=req.query
   
    try{
        let result=await selectSalary_code(keycode)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"查询失败！"
        })
    }


})

// 条件赛选
router.get("/search_content",async(req,resp)=>{
    const {yibu, erbu, type, content, startTime, endTime}=req.query
    try{
        let result=await search_content(yibu, erbu, type, content, startTime, endTime)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"查询失败！"
        })
    }
})

// 查询考勤信息
router.get("/select_kaoqing",async(req,resp)=>{
    
    const {number,yibu,erbu,startTime,endTime,content}=req.query
    try{
        let result=await select_kaoqing(number,yibu,erbu,startTime,endTime,content)
        resp.json(result)
    }catch{  
        resp.json({
            status:0,
            message:"查询失败！"
        })
    }


})
// 查询请假信息

router.get("/select_qingjia",async(req,resp)=>{
    const {number,yibu,erbu,startTime,endTime,content}=req.query
    

    try{
        let result=await select_qingjia(number,yibu,erbu,startTime,endTime,content)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"查询失败！"
        })
    }

})

// 查询薪资汇总

router.get("/select_salary_total",async(req,resp)=>{
      const {yibu,erbu,startTime,endTime,personCode}=req.query

      try{
          let result=await select_salary_total(yibu,erbu,startTime,endTime,personCode)
          resp.json(result)
      }catch{
            resp.json({
                status:0,
                message:"查询失败！"
            })
      }



})


module.exports=router