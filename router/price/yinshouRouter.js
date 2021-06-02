const express=require("express")
const router=express.Router()

const {getYingshoukuan}=require("./yinshouService")
const {alterYinshou,addYinshou,selectShoukuan2AutoId}=require("../../db/myService/yinshouServer")
// 远程调用查询应收款到期


router.get("/selectYsk",async(req,resp)=>{
    const {number}=req.query
    try{
        let result=await getYingshoukuan(number)
        resp.json(result)
    }catch{
        resp.json({
            status:0, 
            message:"抱歉，查询失败！"
        })
    }



})

// 更改收款到期Mysql表

router.post("/alterYinshou",async(req,resp)=>{
    try{
      let result= await alterYinshou(req.body)
      resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"抱歉，操作失败！"
        })
    }


})

// 添加收款到期记录

router.post("/addYinshou",async(req,resp)=>{
    try{
       let result= await addYinshou(req.body)
       resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"抱歉,添加失败！"
        })
    }


})

// 根据 Autoid查询数据

router.get("/selectShoukuan2AutoId",async(req,resp)=>{
    const {AutoId}=req.query
    try{
        let result=await selectShoukuan2AutoId(AutoId)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"查询失败！"
        })
    }


})

module.exports=router