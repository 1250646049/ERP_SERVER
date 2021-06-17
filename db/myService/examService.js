const connect=require("../mysqlDb")



// 模糊查询试题库

function selectExam(type,content){

return new Promise(async(reslove,reject)=>{
  
    connect.query(`select * from f_exam where ${type} like ?`,[`%${content}%`],(err,data)=>{
        if(!err){
            reslove({
                status:1,
                message:"查询成功",
                list:data.length?data.map((item,index)=>{
                    item['key']=item['id']
                    return {...item}
                }):[],
               
            })
        }else {
            reject({
                status:0,
                message:"抱歉，查询失败！",
                list:[]
            })
        }


    })



})



}


function selectCount(){
    return new Promise((reslove,reject)=>{
        connect.query("select count(*) from f_exam",(err,data)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"查询成功",
                    count:{...data[0]}['count(*)']
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

module.exports={

    selectExam,
    selectCount
}