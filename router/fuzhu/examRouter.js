const express=require("express")
const router=express.Router()

const {selectExam,selectCount}=require("../../db/myService/examService")


// 模糊匹配查询结果


router.get("/selectExamLike",async(req,resp)=>{
    const {type,content}=req.query


    try{
        let result=await selectExam(type,content)
        resp.json(result)

    }catch{
        resp.json({
            status:0,
            message:"查询失败！"
        })

    }



})


router.get("/selectCount",async(req,resp)=>{

    try{
        let result= await selectCount()
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"查询失败！"
        })
    }



})




module.exports=router