const connect = require("../sqlDb003")
const Myconnect = require("../mysqlDb")




/**
 * 关联查询销售订单主表 销售订单子表
 * zhu.cSOCode,zhu.cPersonCode,zhu.cMaker,zhu.cVerifier,zhu.dDate,zhu.cChecker,zi.fnattaxpasum,zi.ftaxpasum,zi.iQuantity,zi.iTaxUnitPrice,zi.iSum,zi.iMoney,zi.cCusInvName,zhu.cCusName
 */

/**
 * 关联查询销售订单主表 销售订单子表
 * zhu.cSOCode,zhu.cPersonCode,zhu.cMaker,zhu.cVerifier,zhu.dDate,zhu.cChecker,zi.fnattaxpasum,zi.ftaxpasum,zi.iQuantity,zi.iTaxUnitPrice,zi.iSum,zi.iMoney,zi.cCusInvName,zhu.cCusName
 */

 function selectOrders() {
   
    return new Promise((reslove, reject) => {
        connect.then(async (resp) => { 
            // 查询总个数
             
            let count = await selectCount()
            resp.query(`select top ${number} zi.AutoID ,zi.SBVID,zi.cbdlcode,per.cPersonName,cu.cCusAbbName,zhu.cSOCode,zhu.cPersonCode,zhu.dDate,zhu.cChecker,zi.iQuantity,zi.iTaxUnitPrice,zi.iSum,zi.iMoney,zhu.cCusName,zhu.cCusCode
         from dbo.SaleBillVouch zhu
         right join dbo.SaleBillVouchs zi on zhu.SBVID=zi.SBVID
         left join dbo.Person per on zhu.cPersonCode=per.cPersonCode
         left join dbo.Customer cu on cu.cCusCode=zhu.cCusCode 

         order by dDate desc `) 
                .then(r => {
                    var data = r['recordset']
                    data.forEach((item,index)=>{
                        (function(item){
                            Myconnect.query("select * from w_yinshou where AutoId=? order by number asc",[item['AutoID']],(err,d)=>{
                                if(!err){ 
                                    
                                    item['mysql']=d.map((items,indexs)=>{
                                        items['key']=indexs;
                                        items['keys']=index
                                        return {...items};
                                    })
    
                                    item['key']=item['AutoID']
                                    if(data.length-1==index) {
                                       reslove({
                                           status:1,
                                           message:"查询成功！",
                                           list:data,
                                           size:data.length,
                                           total:count.data
                                       })
                                    }
                                }else {
                                    reject({
                                        status:0,
                                        message:"抱歉，查询失败！",
                                        list:[],
                                    })
                                }
                            })
                           }(item))
                    })


                })
                .catch(e => {
                    console.log(e);
                    reject({
                        status: 0,
                        message: "抱歉，查询失败！",
                        list: []
                    })
                })
        })
    })
}

// 2021-06-29更新查询
// 查询主索引客户
function selectcNewsOrders(){
   
    return new Promise((reslove,reject)=>{
        connect.then(r=>{
            r.query(`select  zi.AutoID ,zi.SBVID,zi.cbdlcode,per.cPersonName,cu.cCusAbbName,per.cPersonEmail,zhu.cSOCode,zhu.cPersonCode,zhu.dDate,zhu.cChecker,zi.iQuantity,zi.iTaxUnitPrice,zi.iSum,zi.iMoney,zhu.cCusName,zhu.cCusCode
            from dbo.SaleBillVouch zhu
            right join dbo.SaleBillVouchs zi on zhu.SBVID=zi.SBVID
            left join dbo.Person per on zhu.cPersonCode=per.cPersonCode
            left join dbo.Customer cu on cu.cCusCode=zhu.cCusCode 
            order by dDate desc ` ).then(d=>{
                    let data=d['recordset'].reduce((reduce,item,index)=>{
                        let cCusAbbName=item['cCusAbbName']
                        let AutoID=item['AutoID']
                        let cSOCode=item['cSOCode']
                        let cPersonCode=item['cPersonCode']
                        let cChecker=item['cChecker']
                        let iQuantity=item['iQuantity']?Number(item['iQuantity']):0
                        let iTaxUnitPrice=item['iTaxUnitPrice']
                        let iSum=item['iSum']?Number(item['iSum']):0
                        let iMoney=item['iMoney']
                        let cCusName=item['cCusName']
                        let cPersonName=item['cPersonName']
                        let key=item['AutoID']
                        let cPersonEmail=item['cPersonEmail']
                        if(reduce[cCusAbbName]){
                            let price=Number(reduce[cCusAbbName]['iSum'])
                            let sum=Number(reduce[cCusAbbName]['iQuantity'])
                            reduce[cCusName]={
                                cPersonEmail,AutoID,key,cPersonName,cCusAbbName,cSOCode,cPersonCode,cChecker,iQuantity:(sum+iQuantity).toFixed(4),iTaxUnitPrice,iSum:(price+iSum).toFixed(2),iMoney,cCusName
                            } 
                        }else {
                            reduce[cCusName]={
                                cPersonEmail,AutoID,cCusAbbName,cSOCode,cPersonCode,cChecker,iQuantity,iTaxUnitPrice,iSum,iMoney,cCusName,cPersonName,key
                            }
                        }
                        return reduce;
                    },{})
                    let keys=Object.keys(data)
                     keys.forEach((item,index)=>{
                        (function(item){
                           
                            Myconnect.query("select * from w_yinshou where cCusName=? and ku=1 order by number asc",[item['cCusName']],(err,d)=>{
                                if(!err){ 
                                      
                                    item['mysql']=d.map((items,indexs)=>{
                                        items['key']=indexs;
                                        items['keys']=index
                                       
                                        return {...items};
                                    })
                                   
                                    if(keys.length-1==index) { 
                                       reslove({
                                           status:1,
                                           message:"查询数据成功",
                                           list:Object.values(data),
                                           total:keys.length,
                                           data
                                       })
                                    }
                                }else {
                                  
                                    reject({
                                        status:0,
                                        message:"抱歉，查询失败！",
                                        list:[],
                                    })
                                }
                            })
                           }(data[item]))

                        
                     })
                    
                  
            }).catch(e=>
               {
                   console.log(e);
                reject({
                    status:0,
                    message:"分组查询客户失败！",
                    customer:[]
                })
            })
        })


    })
}



// 统计
/**
 * 查询总数
 */
function selectCount() {
    return new Promise((reslove, reject) => {
        connect.then(resp => {

            resp.query(`select count(*)
             from dbo.SaleBillVouch zhu
             right join dbo.SaleBillVouchs zi on zhu.SBVID=zi.SBVID
             left join dbo.Customer cu on cu.cCusCode=zhu.cCusCode 
            `)
                .then(r => {

                    reslove({
                        status: 1,
                        data: r['recordset'][0]['']
                    })

                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "抱歉，查询失败！",
                        list: []
                    })
                })
        })
    })
}

/**
 * 模糊查询
 */

 function selectOrdersLike(type,search) {
    if(type==='cbdlcode'){
        type='zi.cbdlcode'
    }else if(type==='cPersonName') {
        type='per.cPersonName'
    }else {
        type="cu.cCusName"
    }
   
    return new Promise((reslove, reject) => {
        connect.then(async (resp) => { 
            // 查询总个数

            resp.query(`select  zi.AutoID ,zi.SBVID,zi.cbdlcode,per.cPersonName,cu.cCusAbbName,zhu.cSOCode,zhu.cPersonCode,zhu.dDate,zhu.cChecker,zi.iQuantity,zi.iTaxUnitPrice,zi.iSum,zi.iMoney,zhu.cCusName,zhu.cCusCode
         from dbo.SaleBillVouch zhu
         right join dbo.SaleBillVouchs zi on zhu.SBVID=zi.SBVID
         left join dbo.Person per on zhu.cPersonCode=per.cPersonCode
         left join dbo.Customer cu on cu.cCusCode=zhu.cCusCode where ${type}='${search}' 
         order by dDate desc`) 
                .then(r => {
                    var data = r['recordset']  
                   if(!data.length){

                    return reslove({
                        status:1,
                        message:"查询成功！", 
                        list:[]
                    })
                   }
                    // reslove({
                    //     status: 1,
                    //     message: "查询成功！",
                    //     list: data.map((item,index)=>{
                    //         item['key']=index;    
                    //         return {...item};
                    //     }),
                    //     size: data.length, 
                    //     total: count.data
                    // }) 
                    data.forEach((item,index)=>{
                       (function(item){
                        Myconnect.query("select * from w_yinshou where AutoId=? order by number asc",[item['AutoID']],(err,d)=>{
                            if(!err){ 
                                flag=true
                                item['mysql']=d.map((items,indexs)=>{
                                    items['key']=indexs;
                                    items['keys']=index
                                    return {...items};
                                })
                                item['key']=item['AutoID']
                                if(data.length-1==index) {
                                   reslove({
                                       status:1,
                                       message:"查询成功！",
                                       list:data,
                                       size:data.length,
                                    
                                   })
                                }
                            }else {
                                reject({
                                    status:0,
                                    message:"抱歉，查询失败！",
                                    list:[],
                                })
                            }
                        })
                       }(item))
                    })


                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "抱歉，查询失败！",
                        list: []
                    })
                })
        })
    })
}


module.exports = {
    selectOrders,
    selectOrdersLike,
    selectcNewsOrders
}