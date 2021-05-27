const connect = require("../sqlDb17")


/**
 * 查询客户资料
 * 根据用户编码查询客户资料
 * Customer
 * @returns 
 */

function selectKehu(bianma) {


    return new Promise((reslove, reject) => {
        connect.then(resp => {
            resp.query(`select  * from dbo.Customer where cCusCode='${bianma}'`)
                .then(r => reslove({
                    status: 1,
                    message: "查询客户成功！",
                    data: r['recordset'][0]
                }))
                .catch(e => reject({
                    status: 0,
                    message: "抱歉，查询失败！"
                }))
        })
    })
}

/**
 * 
 * @param {*} iYPeriod 
 * @returns 
 */

function selectVendor(bianma){
    
    return new Promise((reslove, reject) => {
        connect.then(resp => {
            resp.query(`select  * from dbo.Vendor where cVenCode='${bianma}'`)
                .then(r => reslove({
                    status: 1,
                    message: "查询客户成功！",
                    data: r['recordset'][0]
                }))
                .catch(e => reject({
                    status: 0,
                    message: "抱歉，查询失败！"
                }))
        })
    })
}

/**
 * 查询客户科目余额表
 * 预收 应收
 * @argument 年份 编码
 */
function selectKehuKemu(iYPeriod) {
    if(!iYPeriod) {
        let d=new Date()
        let month=d.getMonth()+1<10?'0'+(d.getMonth()+1):(d.getMonth()+1)
        iYPeriod=d.getFullYear()+""+month
    }

    return new Promise((reslove, reject) => {
        connect.then(resp => {
            resp.query(`select i_id, ccode,ccus_id,iperiod,me,cendd_c,cCusName,cCusCreditCompany,dCusCreateDatetime,dRecentDeliveryDate,mb,iyear from dbo.GL_accass ass left join dbo.Customer c on ass.ccus_id=c.cCusCode where ccode='213101' and iYPeriod='${iYPeriod}'`)
                .then(r => {
                
                     const content=r['recordset']
                      let  yinshou=  content.filter((item,index)=>{
                        item['key']=index;
                        return item['cendd_c']==='借'
                     })
                     let yushou=  content.filter((item,index)=>{
                        item['key']=index;
                        return item['cendd_c']==='贷'
                     })

                    reslove({
                        status: 1,
                        message: "查询成功",
                        yushou,
                        yinshou

                    })

                })
                .catch(e => reject({
                    status: 0,
                    message: "抱歉，查询失败！"
                }))
        })
    })




}


/**
 * 查询供应商科目余额表
 * 借 预付
 */
function selectGyshangYufu(iYPeriod){
    if(!iYPeriod) {
        let d=new Date()
        let month=d.getMonth()+1<10?'0'+(d.getMonth()+1):(d.getMonth()+1)
        iYPeriod=d.getFullYear()+""+month
    }
    return new Promise((reslove,reject)=>{
        connect.then(resp=>{
            resp.query(`select i_id,ccode,mb,cVenName,dModifyDate,me,cendd_c,iyear from  dbo.GL_accass ass left join dbo.Vendor c on ass.csup_id=c.cVenCode where ccode='115101' and iYPeriod='${iYPeriod}' and cendd_c='借'`)
            .then(r=>reslove({
                status:1,
                message:"预付数据查询成功",
                list:r['recordset'].length?r['recordset'].map((item,index)=>{
                    item['key']=index;
                    return {...item};
                }):[],
                size:r['rowsAffected'][0]

            }))
            .catch(e=>reject({
                status:0,
                message:"抱歉，查询失败！"
            }))

        })
        .catch(e=>{
            reject({
                status:0,
                message:"抱歉，查询失败！"
            })

        })


    })


}
/**
 * 查询供应商科目余额表
 * 贷 应付
 */
 function selectGyshangYingFu(iYPeriod){
    if(!iYPeriod) {
        let d=new Date()
        let month=d.getMonth()+1<10?'0'+(d.getMonth()+1):(d.getMonth()+1)
        iYPeriod=d.getFullYear()+""+month
    }
    return new Promise((reslove,reject)=>{
        connect.then(resp=>{
            resp.query(`select i_id,ccode,mb,cVenName,dModifyDate,me,cendd_c,iyear from  dbo.GL_accass ass left join dbo.Vendor c on ass.csup_id=c.cVenCode where ccode in (212101,115101) and iYPeriod='${iYPeriod}' and cendd_c='贷'`)
            .then(r=>reslove({
                status:1,
                message:"应付数据查询成功",
                list:r['recordset'].length?r['recordset'].map((item,index)=>{
                    item['key']=index;
                    return {...item};
                }):[],
                size:r['rowsAffected'][0]

            }))
            .catch(e=>reject({
                status:0,
                message:"抱歉，查询失败！"
            }))

        })
        .catch(e=>{
            reject({
                status:0,
                message:"抱歉，查询失败！"
            })

        })


    })


}


/**
 * 查询其他应收
 * 发生额及余额表
 */

function selectOther(iYPeriod){
    if(!iYPeriod) {
        let d=new Date()
        let month=d.getMonth()+1<10?'0'+(d.getMonth()+1):(d.getMonth()+1)
        iYPeriod=d.getFullYear()+""+month
    }
    return new Promise((reslove,reject)=>{
        connect.then(resp=>{
            resp.query(`select * from dbo.GL_accass ass left join dbo.Person p on ass.cperson_id=p.cPersonCode where ccode in (113302,113301,11330301) and iYPeriod=${iYPeriod}`)
            .then(r=>{
                reslove({
                    status:1,
                    message:"查询其他内容成功！",
                    list:r['recordset'].length?r['recordset'].map((item,index)=>{
                        item['key']=index;
                        item['qimo']=item['cendd_c']==='贷'?-item['mb']:item['mb']
                        return {...item}
                    }):[]
                })


            })
            .catch(e=>reject({
                status:0,
                message:"查询其他应收失败！"
            }))
        })
        .catch(e=>reject({
            status:0,
            message:"查询其他应收失败！"
        }))


    })


}

selectOther()
.then(r=>console.log(r))

module.exports={
    selectKehuKemu,
    selectGyshangYingFu, 
    selectGyshangYufu,
}