const express = require("express")
const router = express.Router()
const {selectAllNews,deleteContent,updateWorkshop,insertWorkshop,insertTeam, alterTeam}=require("./salaryService")
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
module.exports=router