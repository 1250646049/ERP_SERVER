const express=require("express")
const router=express.Router()
const {getWanglai}=require("./wanglai_service")


// 远程调用服务

router.get("/getWanglai",async(req,resp)=>{
    const {type,time}=req.query
  
    try{
        let result=await getWanglai(type,time)
        resp.json(result)
    }catch(err){
        resp.json(err) 
    }


})







module.exports=router