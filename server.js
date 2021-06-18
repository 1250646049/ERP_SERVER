const express=require("express")
const path=require("path")
const session=require("express-session")
const app=express()
const Socket=require("socket.io")
// 引入路由
const UserLogin=require("./router/user/userLogin")
const WuliuRouter=require("./router/wuliu/wuliuRouter")
const CommonRouter=require("./router/common/commonRouter")
const PriceRouter=require("./router/price/bijiaRouter")
const WanglaiRouter=require("./router/wanglai/wanglai")
const ExamRouter=require("./router/fuzhu/examRouter")
const SalaryRouter=require("./router/salary/salaryRouter")
// 引入应收款路由
const YinshouRouter=require("./router/price/yinshouRouter")
const cors=require("cors")
// 解析 body
app.use(express.urlencoded({extended:true}))


// 设置静态文件目录
app.use(express.static(path.join(__dirname,"public")))
//  引入跨域
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
// 设置session    
app.use(session({
    secret: 'erpsystem',
    name: 'testapp', 
    cookie: {maxAge: 5*60*1000 }, 
    resave: false,
    saveUninitialized: true,
}))


app.listen(3008,(err)=>{
    if(!err){
        console.log("监听3008端口成功：http://localhost:3008")
        app.use(UserLogin)
        app.use(WuliuRouter) 
        app.use(CommonRouter) 
        app.use(PriceRouter)
        app.use(WanglaiRouter)
        app.use(YinshouRouter)
        app.use(ExamRouter)
        app.use(SalaryRouter)
    }
}) 



