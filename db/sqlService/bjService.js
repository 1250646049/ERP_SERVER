const sqlDb=require("../sqlDb")
const {sqlTime2times}=require("../../utils/utils")



/**
 * 查询sql 比较子表
 */

async function selectBijia(page=1,number=10){
    try{
        let connect=  await sqlDb;
        let result=  await connect.query(`select top ${page*number} * from dbo.比质比价子表 order by sxrq desc`)
        let size=await connect.query("select count(*) from dbo.比质比价子表")
        return {
            status:1,
            message:"查询成功！",
            list:result['recordset'].map((item,index)=>{
                item['key']=index;
                item['sxrq']=sqlTime2times(item['sxrq'])
                item['sxrq2']=sqlTime2times(item['sxrq2'])
                return item
            }),
            size:size['recordset'][0]['']
        }
    }catch{
        return {
            status:0,
            message:"抱歉，查询字段失败！"
        }

    }

   
}

/**
 * 模糊匹配
 */

async function selectLikeBijia(type,name){
    // try{
        let connect=await sqlDb
        let result= await connect.query(`select * from dbo.比质比价子表 where ${type} like '%${name}%'  `)
        
        return {
           status:1,
           message:"查询成功！",
           list:result['recordset'].length>0?result['recordset'].map((item,index)=>{
               item['key']=index;
               item['sxrq']=sqlTime2times(item['sxrq'])
               item['sxrq2']=sqlTime2times(item['sxrq2'])
               return item
           }):[],
           size:result['rowsAffected'][0]
       }
       
    // }catch{
    //     return {
    //         status:0,
    //         message:'查询失败！'
    //     }
    // }
}


module.exports={
    selectBijia,
    selectLikeBijia
}
