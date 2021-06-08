const connect=require("../mysqlDb")
const {getCurrentTimes} =require("../../utils/utils")



// 查询是否含有收款项

function altersYinshou(data){
    const {id,email,type,jiean,jilu,riqi,price,beizhu,status,shoujianren,jiedian,edu,quyu}=data
    return new Promise((reslove,reject)=>{
        connect.query("select * from w_yinshou where AutoId=?",[id],(err,data)=>{
            if(!err){
                if(data.length){

                    // 更新记录
                    connect.query("update w_yinshou set email=?,type=?,jiean=?,jilu=?,riqi=?,price=?,beizhu=?,status=?,shoujianren=?,jiedian=?,edu=?,quyu=? where id=?",
                    [email,type,jiean,jilu,riqi,price,beizhu,status,shoujianren,jiedian,edu,quyu,id],(err,data)=>{
                        if(!err){
                            reslove({
                                status:1,
                                message:"更新成功！"
                            })
                        }else {
                            reject({
                                status:0,
                                message:"抱歉，更新失败！"
                            })
                        }

                    }
                    )
                    
                }else {
                    connect.query("insert into w_yinshou(id,email,type,jiean,jilu,riqi,price,beizhu,status,shoujianren,jiedian,edu,quyu) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[
                        id,email,type,jiean,jilu,riqi,price,beizhu,status,shoujianren,jiedian,edu,quyu 
                    ],(err,data)=>{
                        if(!err){
                            reslove({
                                status:1,
                                message:"添加成功"
                            })
                        }else {
                            reject({
                                status:0,
                                message:"抱歉，添加失败！"
                            })
                        }
                    })

                }
            }else {
                reject({
                    status:0,
                    message:"抱歉，操作失败！"
                })
            }
        })

    })


}

// 添加一条收款项

function addYinshou(data){
    const {AutoId,email,type,jiean,jilu,riqi,price,beizhu,status,shoujianren,jiedian,edu,quyu,username,name}=data
        
    return new Promise((reslove,reject)=>{
        select2AutoId(AutoId)
        .then(d=>{
            const {data}=d
            if(JSON.stringify(data)==='{}'){
                // 为空 要添加number
                connect.query("insert into w_yinshou(email,type,jiean,jilu,riqi,price,beizhu,status,shoujianren,jiedian,edu,quyu,AutoId,number,uptime,name,username) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [email,type,jiean,jilu,riqi,price,beizhu,status,shoujianren,jiedian,edu,quyu,AutoId,1,getCurrentTimes(),name,username],(err,data)=>{
                    if(!err){
                        reslove({
                            status:1,
                            message:"添加应收款成功！"
                        })
                    }else {
                        reject({
                            status:0,
                            message:"抱歉，添加失败！"
                        })
                    }
                }
                )
            }else {
                // 不为空 获取number
                const {number}=data
                connect.query("insert into w_yinshou(email,type,jiean,jilu,riqi,price,beizhu,status,shoujianren,jiedian,edu,quyu,AutoId,number,uptime,name,username) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [email,type,jiean,jilu,riqi,price,beizhu,status,shoujianren,jiedian,edu,quyu,AutoId,number+1,getCurrentTimes(),name,username],(err,data)=>{
                    if(!err){
                        reslove({
                            status:1,
                            message:"添加应收款成功！"
                        })
                    }else {
                        reject({
                            status:0,
                            message:"抱歉，添加失败！"
                        })
                    }
                }
                )

            }

        })
        .catch(r=>{
            reject(r)
        })



    })




}

// 根据AutoId查询任意一条记录 判断次数

function select2AutoId(id){

    return new Promise((reslove,reject)=>{
        connect.query("select * from w_yinshou where AutoId=? order by number desc limit 1",[id],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"查询成功",
                    data:{...data[0]}
                })
            }else {
                reject({
                    status:0,
                    message:"查询失败！"
                })

            }


        })



    })

}

// 查询收款记录

function selectShoukuan2AutoId(id){
    return new Promise((reslove,reject)=>{
        connect.query("select * from w_yinshou where AutoId=? order by number asc",[id],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"查询成功！",
                    list:data.map((item,index)=>{
                        item['key']=index;
                        return {...item};
                    })
                })
            }else {
                reject({
                    status:0,
                    message:"查询失败！"
                })
            }
        })


    })


}

// 修改一条收款项 mysql
function alterYinshou(data){
    const {email,type,jiean,jilu,riqi,price,beizhu,status,shoujianren,jiedian,edu,quyu,id,name,username}=data
    return new Promise((reslove,reject)=>{
        connect.query("update w_yinshou set email=?,type=?,jiean=?,jilu=?,riqi=?,price=?,beizhu=?,status=?,shoujianren=?,jiedian=?,edu=?,quyu=?,name=?,username=? where id=?",
        [email,type,jiean,jilu,riqi,price,beizhu,status,shoujianren,jiedian,edu,quyu,id,name,username],(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"恭喜你，成功成功！"
                })
            }else {
                reject({
                    status:0,
                    message:"抱歉，修改失败！"
                })
            }


        }
        )



    })


}
module.exports={

    addYinshou,
    selectShoukuan2AutoId,
    alterYinshou
}