const express=require("express")
const router=express.Router()

const {getYingshoukuan,searchYingshoukuan}=require("./yinshouService")
const {addYinshou,selectShoukuan2AutoId,alterYinshou,deleteOrder,alterJiean,select2autoId}=require("../../db/myService/yinshouServer")

// 删除订单

router.get("/deleteOrder",async(req,resp)=>{
    const {id}=req.query;
    try{
        let result=await deleteOrder(id);
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"删除失败！"
        })
    }


})

// 修改结案状态

router.get("/alterJiean",async(req,resp)=>{
    const {jiean,id}=req.query;
    try{
        let result=await alterJiean(jiean,id);
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"删除失败！"
        })
    }


})
// 查询AutoId

router.get("/select2autoId",async(req,resp)=>{
    const {AutoId}=req.query
    try{
        let result=await select2autoId(AutoId)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"查收失败！"
        })
    }



})

// 远程调用查询应收款到期


router.get("/selectYsk",async(req,resp)=>{
    const {number,type,search}=req.query
    console.log(number);
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
// 远程调用搜索收款到期

router.get("/searchYsk",async(req,resp)=>{
    const {type,search}=req.query
   
    try{
        let result=await searchYingshoukuan(type,search)
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

// 修改一条记录

router.post("/alterYinshou",async(req,resp)=>{
    try{
        let result=await alterYinshou(req.body)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"抱歉，修改失败！" 
        })
    }



})

module.exports=router