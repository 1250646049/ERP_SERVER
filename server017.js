const express=require("express")
const app=express()


const {selectGyshangYingFu,selectKehuKemu,selectGyshangYufu}=require("./db/sqlService/wanglaiService")


// 查询 and 导出

app.get("/wanglai",async(req,resp)=>{
    const {type,time}=req.query
    if(type==='select'){
            try{
                let gysYF=await selectGyshangYufu(time)
                let gysyf=await selectGyshangYingFu(time)
                let data=await selectKehuKemu(time)
                console.log(gysYF,gysyf,data);
                resp.json({
                    status:1, 
                    message:"物流数据操作成功！",
                    GYSYF:gysYF['list'],
                    GYSYINFU: gysyf['list'],
                    yinshou:data['yinshou'],
                    yushou:data['yushou']

                })
            }catch {
                resp.json({
                    status:0,
                    message:"物流数据操作失败"
                })
            }
        
    }else {
        // 导出
    }



})


















app.listen(3017,(err,data)=>{
    if(!err){
        console.log("http://localhost:3017服务启动成功！");
    }


})
