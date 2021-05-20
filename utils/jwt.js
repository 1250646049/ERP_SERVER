const jwt= require("jsonwebtoken")




// 加密token
function addjwt(data,content){
    if(content){
        return jwt.sign(data,"lhyveryshuai",{expiresIn:"7d"})
    }
 
   return jwt.sign(data, 'lhy', {expiresIn:"7d"})

}
// 解密token
function devjwt(datas){
    var data=""
   try{
    data={
        data:{...jwt.verify(datas,"lhy")}
    }
   }catch{
        data={
            error:1,
            message:"token过期"
        }


   }
    return data.error?data:{...data.data}
}
// 判断啊token是否过期

// 判断请求头是否有token

function TokenLogin(headers){

    return new Promise((resove,reject)=>{
        let Authetication= headers["authetication"]
        if(Authetication){
         Authetication= Authetication.indexOf("Bearer")!=-1?Authetication.slice(7):Authetication
         let result=devjwt(Authetication)
         let data=null;
         if(!result.error){
             data={
                status:1,
                user:{...result},
                
            }
            data["user"].token=Authetication
         }else data=result 

         resove(data)
        }else {
                reject({error:1,message:"抱歉，您无权限访问！"})
        }


    })

}

// 解密token
function devUserjwt(datas){
    var data=""
   try{
    data={
        data:{...jwt.verify(datas,"lhyveryshuai")}
    }
   }catch{
        data={
            error:1,
            message:"token过期"
        }
   }
    return data.error?data:{...data.data}
}
module.exports={
    addjwt,
    devjwt,
    TokenLogin,
    devUserjwt
}