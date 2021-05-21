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
// 解析 body
app.use(express.urlencoded({extended:true}))
// 设置静态文件目录
app.use(express.static(path.join(__dirname,"public")))

// 设置session 
app.use(session({
    secret: 'erpsystem',
    name: 'testapp', 
    cookie: {maxAge: 5*60*1000 }, 
    resave: false,
    saveUninitialized: true,
}))


const SocketIo= app.listen(3008,(err)=>{
    if(!err){
        console.log("监听3008端口成功：http://localhost:3008")
        app.use(UserLogin)
        app.use(WuliuRouter) 
        app.use(CommonRouter) 
        app.use(PriceRouter)

    }
})


// Socket

module.exports=SocketIo
