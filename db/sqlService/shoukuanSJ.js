const sqlDb = require("../sqlDb")



// 整理查询所有的收款登记列表信息

function selectAllList() {
    return new Promise((reslove, reject) => {
        sqlDb.then(r => {
            r.query(`select money,Ccusname from 收款登记017主表`)
                .then(d => {
                    let data = d['recordset']
                    let result = data.reduce((reduce, item, index) => {
                        let money = item['money'] ? Number(item['money']) : 0
                        let Ccusname = item['Ccusname']
                        if (reduce[Ccusname]) {
                            let price = reduce[Ccusname]['money'] ? Number(reduce[Ccusname]['money']) : 0
                            reduce[Ccusname]['money'] = (money + price).toFixed(4)
                        } else {
                            reduce[Ccusname] = {
                                money,Ccusname
                            }
                        }


                        return reduce;
                    }, {})
                    reslove({
                        status:1,
                        message:"查询成功！",
                        list:result,
                        total:Object.values(result).length
                    })
                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "抱歉，查询失败！"
                    })
                })

        })



    })



}

// 整理查询所有的收款登记列表信息 003

function selectAllList003() {
    return new Promise((reslove, reject) => {
        sqlDb.then(r => {
            r.query(`select money,Ccusname from 收款登记主表`)
                .then(d => {
                    let data = d['recordset']
                    let result = data.reduce((reduce, item, index) => {
                        let money = item['money'] ? Number(item['money']) : 0
                        let Ccusname = item['Ccusname']
                        if (reduce[Ccusname]) {
                            let price = reduce[Ccusname]['money'] ? Number(reduce[Ccusname]['money']) : 0
                            reduce[Ccusname]['money'] = (money + price).toFixed(4)
                        } else {
                            reduce[Ccusname] = {
                                money,Ccusname
                            }
                        }


                        return reduce;
                    }, {})
                    reslove({
                        status:1,
                        message:"查询成功！",
                        list:result,
                        total:Object.values(result).length
                    })
                })
                .catch(e => {
                    reject({
                        status: 0,
                        message: "抱歉，查询失败！"
                    })
                })

        })



    })



}
module.exports={
    selectAllList,
    selectAllList003
}