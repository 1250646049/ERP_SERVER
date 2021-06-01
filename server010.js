const express = require("express")
const app = express()
const {
    selectOrders
} = require("./db/sqlService/yinshoukuan")




// 查询订单数量 应收账款超期自动提醒

app.get("/selectYinshou", async (req, resp) => {
    const {
        number
    } = req.query

    try {
        let result = await selectOrders(number)
        resp.json(result)
    } catch {
        resp.json({
            status: 0,
            message: "抱歉，查询失败！"
        })
    }



})





app.listen(3010, (err, data) => {
    if (!err) {
        console.log("http://localhost:3010服务启动成功！");
    }


})