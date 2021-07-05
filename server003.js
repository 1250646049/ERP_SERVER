const express=require("express")
const app=express()
const cors=require("cors")
const {selectOrders,selectOrdersLike,selectcNewsOrders}=require("./db/sqlService/yinshoukuan003")



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

// 查询订单数量 应收账款超期自动提醒

app.get("/selectYinshou", async (req, resp) => {
 
  
    try {
        let result = await selectcNewsOrders()
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












app.listen(3003,(err,data)=>{
    if(!err){
        console.log("http://localhost:3003服务启动成功！");
    }


})
