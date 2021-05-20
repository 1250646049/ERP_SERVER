const express = require("express")
const router = express.Router()

const {setEmail,getEmail}=require("../../db/myService/wuliuServer")



// get 
 router.get("/wuliu/getEmail",async(req,resp)=>{ 
        try{
            let result=await getEmail()
           
            resp.json(result)
        }catch(err){
            resp.json(err)
        }
 })
// set 
router.post("/wuliu/setEmail",async(req,resp)=>{
   try{
    let result= await setEmail(req.body)
    
    resp.json(result)
   }
   catch(err){
    resp.json({
        status:0,
        message:"抱歉，更新失败！"
    })
   }

})






module.exports=router