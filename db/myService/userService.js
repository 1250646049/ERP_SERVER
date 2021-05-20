const connect=require("../mysqlDb")
const {addPassword}=require("../../utils/utils")
const {addjwt}=require("../../utils/jwt")

/**
 * table_name 业务员
 * 添加一条用户数据
 */

function addUser({username,password,sex,phone,depart,name,qxlbR}){

    return new Promise((reslove,reject)=>{
        connect.query("insert into y_user(username,password,sex,phone,depart,can,name,auth,qxlbR) values(?,?,?,?,?,?,?,?,?)",[
            username,addPassword(password),sex,phone,depart,1,name,0,qxlbR
        ],(err)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"添加成功！"
                })
            }else {
               console.log(err);
                reject({
                    status:0,
                    message:"添加失败！"
                })
            }
        })
    })



}


/**
 * table_name 部门表
 * 添加一条部门数据
 */

 function addDepart({bumen,zongji,yiji,erji,code}){

    return new Promise((reslove,reject)=>{
        connect.query("insert into y_depart(bumen,zongji,yiji,erji,code) values(?,?,?,?,?)",[
            bumen,zongji,yiji,erji,code
        ],(err)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"添加成功！"
                })
            }else {
               
                reject({
                    status:0,
                    message:"添加失败！"
                })
            }
        })
    })



}

/**
 * 根据用户名匹配用户
 */
function selectUser(username,password){
    
    return new Promise((reslove,reject)=>{
        connect.query("select * from y_user where username=? and password=?",[username,addPassword(password)],(err,data)=>{
            if(!err){
                if(!data.length){ 
                    reslove({
                        status:0,
                        message:"抱歉，用户名或密码错误！"
                    })
                }else {
                    let user={...data[0]}
                 
                    delete user['password']
                    let token=addjwt(user)
                    user['token']=token
                    reslove({
                        status:1,
                        message:"恭喜你，登录成功！",
                        data:user
                    })
                }
            }else {
                reject({
                    status:0,
                    message:"抱歉，查询失败！"
                })
            }

        })
    })
}


/**
 * 用户操作手册下载
 */
function selectWord(){
    return new Promise((reslove,reject)=>{
        connect.query("select * from u_word",(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:'恭喜你，查询成功！',
                   list:data.length>0?data.map((item,index)=>{
                    item['key']=index;
                    return {...item}
                   }):[]
                })
                
            }else console.log(err)
        })
    })


} 

/**
 * 查询用户肖像图 部门
 */

function selectDepartOrder(){

    return new Promise((reslove,reject)=>{
        connect.query("select * from y_user where depart!='' group by depart",(err,data)=>{ 
            if(!err){
                reslove({
                    status:1,
                    message:"查询部门成功",
                    list:data.length?data.map((item,index)=>{
                        item['key']=index;
                    //    let lists=await selectUser2Order(item['depart'])
                       
                        return {...item};
                    }):[]
                })
            }else {
                console.log(err);
                reject({
                    status:0,
                    message:"抱歉，查询失败！"
                })
            }
        })
    })
}

/**
 * 查询用户图
 */

function selectUser2Order(depart){
    return new Promise(async(reslove,reject)=>{
        connect.query("select * from y_user where depart=?",[depart],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"恭喜你，查询成功！",
                    list:data.length?data.map((item,index)=>{
                        item['key']=index;
                        return {...item}
                    }):[]
                })
            }else {
                reject({
                    status:0,
                    message:"查询失败"
                })
            }
        })

    })

}

/**
 * 用户权限查询
 */
function selectShior(depart,type){

    return new Promise((reslove,reject)=>{

        connect.query("select * from y_autho_depart where depart=? and autho=? limit 1",[depart,type],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"查询成功！",
                    list:data.length?{...data[0]}:{}
                })
            }else {
                reject({
                    status:0,
                    message:"抱歉，查询失败！"
                })
            }


        })


    })



}
/**
 *获取所有的菜单 
 */
function getAllCaidan(){

    return new Promise((reslove,reject)=>{
        connect.query("select * from y_autho where sort=2",(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"查询成功！",
                    list:data.length?data.map((item,index)=>{
                        item['key']=item['biaoshi'];
                        item['title']=item['name']
                        return item;
                    }):[]
                })
            }else {
                reject({
                    status:0,
                    message:"抱歉，查询失败！"
                })
            }
        })


    })

}


/**
 * 用户权限回显
 */
function selectCaidan2User(depart){
    return new Promise((reslove,reject)=>{
        connect.query("select * from y_autho_depart where depart=?",[depart],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"恭喜你查询成功！",
                    list:data.length?data.map((item,index)=>{
                        item['key']=item['autho'];
                        item['title']=item['name']
                        return {...item};
                    }):[]
                })
            }else {
                console.log(err);
                reject({
                    status:0,
                    message:"抱歉，查询失败！"
                })
            }


        })


    })
}

/**
 *更新权限 
 */

function updateUserOuthor(depart,oathor){

    return new Promise((reslove,reject)=>{
        connect.query("select * from y_autho_depart where depart=? and autho=? limit 1",[depart,oathor],(err,data)=>{
            if(!err){
               if(!data.length){
                   connect.query("insert into y_autho_depart(depart,autho) values(?,?)",[depart,oathor],(err,data)=>{
                        if(!err){
                            reslove({
                                status:1,
                                message:"恭喜你，添加成功!"
                            })
                        }else {
                            reject({
                                status:0,
                                message:"添加失败！"
                            })
                        }
                   })
               }

            }else {
                console.log("error");
            }



        })



    })


}

/**
 * 删除所有的权限
 */

function deleteOuthor(depart){
    return new Promise((relove,reject)=>{
        connect.query("delete from y_autho_depart where depart=?",[depart],(err,data)=>{

            if(!err){
                relove({
                    status:1,
                    message:"恭喜你，删除成功！"
                })
            }else {
                reject({
                    status:0,
                    message:"抱歉，删除失败！"
                }) 
            }
        })


    })
}

/**
 * 添加一条用户
 */

function addUserDepart(data){
    const {username,sex,phone,depart,name,qxlbR}=data

    return new Promise((reslove,reject)=>{

        connect.query("insert into y_user(username,password,sex,phone,depart,can,name,auth,qxlbr) values(?,?,?,?,?,?,?,?,?)",[username,'81dc9bdb52d04dc20036dbd8313ed055',sex,phone,depart,1,name,0,qxlbR],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"恭喜你，添加成功！"
                })
            }else {
                console.log(err);
                reject({
                    status:0,
                    message:"抱歉，添加失败！"
                })
            }


        })


    })


}

module.exports={
    addDepart,
    addUser,
    selectUser,
    selectWord,
    selectDepartOrder,
    selectUser2Order,
    selectShior,
    getAllCaidan,
    selectCaidan2User,
    updateUserOuthor,
    deleteOuthor,
    addUserDepart
}