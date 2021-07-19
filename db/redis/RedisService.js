const {redisConnect}=require("./redisDb")



// 获取person列表

function get_person(){
    return new Promise((reslove,reject)=>{
        redisConnect.get("person",(err,data)=>{
            if(!err){
                let list=JSON.parse(data)
                reslove({
                    status:1,
                    message:"查询成功！",
                    list:list.map((item,index)=>{
                        item['index']=index
                        return item;

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


module.exports={
    get_person
}