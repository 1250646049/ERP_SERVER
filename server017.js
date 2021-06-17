const express=require("express")
const app=express()
const cors=require("cors")

const {selectGyshangYingFu,selectKehuKemu,selectGyshangYufu,selectOther}=require("./db/sqlService/wanglaiService")
const {selectOrders,selectOrdersLike}=require("./db/sqlService/yinshoukuan")

// 引入导出工具类
const {exportDatas}=require("./utils/wanglaiExport")

// 引入跨域
// app.all("*", function(req, res, next) {
//     if (!req.get("Origin")) return next();
//      // use "*" here to accept any origin
//      res.set("Access-Control-Allow-Origin",req.headers.origin);  
//      res.set("Access-Control-Allow-Methods", "GET");
//      res.set("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//      res.header('Access-Control-Allow-Credentials', 'true');
//      // res.set('Access-Control-Allow-Max-Age', 3600);
//      if ("OPTIONS" === req.method) return res.sendStatus(200);
//      next();
// });
 
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




// 查询订单数量 应收账款超期自动提醒

app.get("/selectYinshou", async (req, resp) => {
    const {
        number,type,search
    } = req.query

    try {
        let result = await selectOrders(number,type,search)
        resp.json(result)
    } catch {
        resp.json({
            status: 0,
            message: "抱歉，查询失败！"
        })
    }



})




app.get("/searchYinshou", async (req, resp) => {
    const {
        type,search
    } = req.query
   
    try {
        let result = await selectOrdersLike(type,search)
        resp.json(result)
    } catch {
        resp.json({
            status: 0,
            message: "抱歉，查询失败！"
        }) 
    }



})












app.listen(3017,(err,data)=>{
    if(!err){
        console.log("http://localhost:3017服务启动成功！");
    }


})
