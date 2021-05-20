const express=require("express")
const router=express.Router()

// 上传组件
const multer=require("multer")
const upload=multer({limits:1})

const {uploadWuliu}=require("../../utils/utils")



// 上传物流到货模板

router.post("/wuliu/upload",upload.single("file"),async(req,resp)=>{
        let result= await uploadWuliu(req.file)
        console.log(result)
        resp.json(result)
})










module.exports=router



