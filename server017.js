const express=require("express")
const app=express()


const {selectGyshangYingFu,selectKehuKemu,selectGyshangYufu,selectOther}=require("./db/sqlService/wanglaiService")
// 引入导出工具类
const {exportDatas}=require("./utils/wanglaiExport")

// 查询 and 导出

app.get("/wanglai",async(req,resp)=>{
    const {type,time}=req.query
    if(type==='select'){
            try{
                let gysYF=await selectGyshangYufu(time)
                let gysyf=await selectGyshangYingFu(time)
                let data=await selectKehuKemu(time)
                let other=await selectOther(time)
                resp.json({
                    status:1, 
                    message:"物流数据操作成功！",
                    GYSYF:gysYF['list'],
                    GYSYINFU: gysyf['list'],
                    yinshou:data['yinshou'],
                    yushou:data['yushou'],
                    other:other['list']
                })
            }catch {
                resp.json({
                    status:0,
                    message:"物流数据操作失败"
                })
            }
        
    }else {
        // 导出
       try{
        let gysYF=await selectGyshangYufu(time)
        let gysyf=await selectGyshangYingFu(time)
        let data=await selectKehuKemu(time)
        let other=await selectOther(time)
        let exportData={
            times:time,
            deparent:"上海乐迈地板有限公司",
            GYSYF:gysYF['list'],
            GYSYINFU: gysyf['list'],
            yinshou:data['yinshou'],
            yushou:data['yushou'],
            other:other['list']
        }
      let result= await exportDatas(exportData)
        resp.json(result)
       }catch{
           resp.json({
               status:0,
               message:"导出失败！"
           })
       }
    }



})


















app.listen(3017,(err,data)=>{
    if(!err){
        console.log("http://localhost:3017服务启动成功！");
    }


})
