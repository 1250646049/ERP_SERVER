const {getAllDepart,getAllUser}=require("../sqlService/userService")
const {addDepart,addUser}=require("../myService/userService")




/**
 * 导入 sql - depart -mysql
 */

async function update2MysqlDepart(){

    try{
        let data=await getAllDepart()
        data['data'].forEach(async(item)=>{
            await addDepart(item)
        })
    }catch(error){
        
    }

    


}

/**
 * 导入 sql - user -mysql
 */
 async function update2MysqlUser(){

    try{
        let data=await getAllUser()
        console.log(data)
        data['data'].forEach(async(item)=>{
            await addUser({username:item['Name_ID'],password:'1234',sex:item['Sex_TX']==='男'?1:0,phone:item['MobilePhone_TX'],depart:item['Depart_TX'],name:item['Name_TX'],qxlbR:item['qxlbR']})
        })
    }catch(error){
        
    }

    


}
update2MysqlDepart()
.then(r=>console.log(r))
.catch(e=>console.log(e))