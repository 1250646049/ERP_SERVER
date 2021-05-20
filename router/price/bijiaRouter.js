const express=require("express")
const router=express.Router()

// 导入数据库model

const {selectBijia,selectLikeBijia}=require("../../db/sqlService/bjService")
/**
 * 查询比价报表子表数据
 */

router.get("/price/bijia",async(req,resp)=>{
    const {page,number}=req.query
        let result=await selectBijia(page,number)
        resp.json(result)

})


/**
 * 模糊筛选比价
 */

router.get("/price/likeSearch",async(req,resp)=>{
    const {type,name}=req.query
   let result= await selectLikeBijia(type,name)
   resp.json(result)

})




module.exports=router