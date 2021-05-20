
const sqlDb=require("../sqlDb")




// 物流到货预测查询
//2021-04-09


function selectWuliuDaohuo(currentTime){
    sqlDb.then(connect=>{
        connect.query(`select * from dbo.物料到货预测子表 where riqi='${time.trim()}'`)
        .then(r=>console.log(r['recordset'].length))
        .catch(r=>console.log(r))
    })
}
selectWuliuDaohuo()