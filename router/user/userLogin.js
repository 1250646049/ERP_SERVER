const express = require("express")
const router = express.Router()
// 引入验证码插件
const captcha = require("svg-captcha")
const {
    CODE
} = require("../../utils/statusCode")
// 引入操作数据库模块
const {
    selectUser,
    selectWord,
    selectDepartOrder,
    selectAllOath,
    alterOath,
    selectUser2Order,
    selectShior,
    selectNoneOath,
    getAllCaidan,
    selectCaidan2User,
    updateUserOuthor,
    deleteOuthor,
    addUserDepart,
    addOnePath,
    addTixing,
    selectTixing,
    selectTodayBobao,
    addBobao
} = require("../../db/myService/userService")
const {
    devjwt
} = require("../../utils/jwt")
const path = require("path")

// 引入爬虫程序
const {UserPosition}=require("../../spider/spider_index")
// 生成验证码
router.get("/yzm", (req, resp) => {
    let data = captcha.create({
        width: 120,
        height: 40,
        ignoreChars: '0o1i',
        size: 4
    })
    let yzmCode = data['text']
    req.session.code = yzmCode
    delete data['text']
    resp.json({
        status: CODE.succerr,
        ...data
    })

})



// 业务员登录
router.post("/user/login", async (req, resp) => {
    const yzmCode = req.session.code
    const {
        yzm,
        password,
        username
    } = req.body

    if (!yzmCode || yzm.toLocaleLowerCase() !== yzmCode.toLocaleLowerCase()) {
        return resp.json({
            status: 0,
            message: "抱歉，验证码填写失败"
        })
    }
    // 判断用户名或密码是否正确
    try {
        let result = await selectUser(username, password)
        resp.json(result)
    } catch (error) {
        resp.json(error)
    }

})


// 自动登录
router.post("/user/auto", (req, resp) => {
    const {
        token
    } = req.body

    let data = devjwt(token)

    resp.json(data)


})

// 查询用户功能操作手册
router.get("/user/word", async (req, resp) => {

    try {
        let result = await selectWord()
        resp.json(result)
    } catch {
        resp.json({
            status: 0,
            message: "抱歉，查询失败！"
        })


    }

})


// 查询用户部门列表
router.get("/user/departs", async (req, resp) => {
    console.log(555)
    try {
        let result = await selectDepartOrder()
        resp.json(result)
    } catch {
        resp.json({
            status: 0,
            message: "抱歉，查询失败！"
        })
    }


})

// 查询用户管理部门
router.get("/depart/user", async (req, resp) => {
    const {
        name
    } = req.query

    try {
        let result = await selectUser2Order(name)
        resp.json(result)
    } catch {
        resp.json({
            status: 0,
            message: "抱歉，查询失败！"
        })
    }

})

// 用户权限控制

router.get("/user/oathor", async (req, resp) => {
    const {
        depart,
        author
    } = req.query
    try {
        let result = await selectShior(depart, author)
        resp.json(result)
    } catch {
        resp.json({
            status: 0,
            message: "查询失败！"
        })
    }

})

// 查询所有菜单

router.get("/depart/caidan", async (req, resp) => {
    try {
        let result = await getAllCaidan()
        resp.json(result)
    } catch {
        resp.json({
            status: 0,
            message: "抱歉，查询失败！"
        })
    }

})

// 查询部门所对应的权限列表

router.get("/user2oathor", async (req, resp) => {
    const {
        depart
    } = req.query

    try {
        let result = await selectCaidan2User(depart)
        resp.json(result)
    } catch {
        resp.json({
            status: 0,
            message: "抱歉，查询失败！"
        })
    }


})


// 更新用户权限

router.get("/updateOathor", async (req, resp) => {
    const {
        depart,
        oauthor
    } = req.query

    try {
        let result = await updateUserOuthor(depart, oauthor)
        resp.json(result)
    } catch {
        resp.json({
            status: 0,
            message: "更新失败！"
        })
    }



})

//删除部门对应的权限

router.get("/deleteOauthor", async (req, resp) => {
    const {
        depart
    } = req.query

    try {
        let result = await deleteOuthor(depart)
        resp.json(result)
    } catch {
        resp.json({
            status: 0,
            message: "抱歉，更新失败！"
        })
    }


})

// 测试下载内容

router.get("/down", async (req, resp) => {


    resp.download(path.join(__dirname, "../../15.xlsx"))



})
// 添加一条用户记录

router.post("/addUserDepart", async (req, resp) => {

    try {
        let result = await addUserDepart(req.body)
        resp.json(result)
    } catch {
        resp.json({
            status: 0,
            message: "抱歉，更新失败！"
        })
    }

})

// 查询不需要授权的地址
router.get("/selectNoneOauth", async (req, resp) => {

    try {
        let result = await selectNoneOath()
        resp.json(result)
    } catch {
        resp.json({
            status: 0,
            message: "查询失败"
        })
    }

})

// 查询所有权限列表

router.get("/selectAllOath", async (req, resp) => {

    try {
        let result = await selectAllOath()
        resp.json(result)
    } catch {
        resp.json({
            status: 0,
            message: "抱歉，查询失败！"
        })
    }

})


// 更新是否受控url

router.get("/alterOath", async (req, resp) => {
    const {id,contro}=req.query
    try {
        let result = await alterOath(id,contro)
        resp.json(result)
    } catch {
        resp.json({
            status: 0,
            message: "抱歉，更新失败！"
        })
    }

})
// 添加一条路由信息

router.post("/addOnePath",async(req,resp)=>{

    try{
        let result =await addOnePath(req.body)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"抱歉，添加失败！"
        })
    }

})
// 添加一条日程提醒

router.post("/addTixing",async(req,resp)=>{

    try{
        let result =await addTixing(req.body)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"抱歉，操作失败！"
        })
    }

})

// 查询提醒
router.get("/selectTixing",async(req,resp)=>{
    const {username}=req.query
    try{
      let result=  await selectTixing(username)
      resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"抱歉，查询失败！"
        })
    }


})

// 获取今日资讯

router.get("/getZixun",async(req,resp)=>{

   try{
    let result= await new UserPosition().init()
    resp.json(result)
   }catch{
       resp.json({
           status:0,
           message:"抱歉，操作失败！"
       })
   }

})

// 查询是否显示播报

router.get("/selectBobao",async(req,resp)=>{
    const {username}=req.query
    try{
        let result=await selectTodayBobao(username)
        resp.json(result)
    }catch{
        resp.json({
            status:0,
            message:"查询失败"
        })
    }



})

// 添加播报信息

router.post("/addBobao",async(req,resp)=>{
    const {username}=req.body
    try{
        let result=await addBobao(username)
        resp.json(result)
    }catch{
        resp.json({status:0,message:"抱歉，查询失败！"})
    }


})
module.exports = router