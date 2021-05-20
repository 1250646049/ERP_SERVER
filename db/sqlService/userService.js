const sqlDb=require("../sqlDb")
const {CODE,MESSAGE}=require("../../utils/statusCode")

/**
 * 获取所有业务员
 * table_name 业务员
 */

function getAllUser(){
    return new Promise((reslove,reject)=>{
        sqlDb.then(connect=>{
            connect.query("select * from dbo.业务员")
            .then(r=>{
                reslove({
                    status:CODE.succerr,
                    message:MESSAGE.select.success,
                    data:r['recordsets'][0],
                    total:r['recordsets'][0].length
                })
            })
            .catch(error=>{
                reject({
                    status:CODE.error,
                    message:MESSAGE.select.error,
                    data:[]
                })
            })
        })
    })
}

/**
 * 获取所有部门
 * table_name 部门表
 */
 function getAllDepart(){
    return new Promise((reslove,reject)=>{
        sqlDb.then(connect=>{
            connect.query("select * from dbo.Table_部门")
            .then(r=>{
                reslove({
                    status:CODE.succerr,
                    message:MESSAGE.select.success,
                    data:r['recordsets'][0],
                    total:r['recordsets'][0].length
                })
            })
            .catch(error=>{
                reject({
                    status:CODE.error,
                    message:MESSAGE.select.error,
                    data:[]
                })
            })
        })
    })
}

module.exports={
    getAllUser,
    getAllDepart
}