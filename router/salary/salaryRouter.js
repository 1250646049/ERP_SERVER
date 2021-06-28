const express = require("express")
const router = express.Router()
const {selectAllNews,deleteContent,updateWorkshop,insertWorkshop,insertTeam, alterTeam,insertPerson,updatePerson,selectPerson
,insertProcess,updateProcess
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
module.exports=router