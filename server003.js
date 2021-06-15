const express=require("express")
const app=express()

const {selectOrders,selectOrdersLike}=require("./db/sqlService/yinshoukuan003")





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












app.listen(3003,(err,data)=>{
    if(!err){
        console.log("http://localhost:3003服务启动成功！");
    }


})
