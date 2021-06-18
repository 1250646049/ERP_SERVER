const express = require("express")
const router = express.Router()
const {selectAllNews,deleteContent}=require("./salaryService")
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

module.exports=router