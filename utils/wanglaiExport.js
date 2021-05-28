const ejs=require("ejsexcel")
const fs=require("fs")
const path=require("path")


// 导出内容


function exportDatas(data){
    
    return new Promise((reslove,reject)=>{
        // 读excel模板文件
        let d= fs.readFileSync(path.join(__dirname,"../public/moban/wanglai.xlsx"))
        //    data['GYSyinfuTotal']=computeTotal(data['GYSYINFU'])
        // 设置求和公式
            data['sumGYSyinfu']=`SUM(E4:E${data['GYSYINFU'].length+3})`
            data['sumGYSyf']=`SUM(E4:E${data['GYSYF'].length+3})`
            data['sumyinshou']=`SUM(B4:B${data['yinshou'].length+3})`
            data['sumyushou']=`SUM(E4:E${data['yushou'].length+3})`
            data['sumother']=`SUM(E4:E${data['other'].length+3})`
            data['others']=computeOthers(data['other'])
            // 读取内容
          ejs.renderExcel(d,data)
          .then(resp=>{ 
            fs.writeFileSync(path.join(__dirname,`../public/content/乐迈往来表--${data['times']}.xlsx`),resp) 
             reslove({
                 status:1,
                 message:"恭喜你，导出成功！",
                 url:`/content/乐迈往来表--${data['times']}.xlsx`
             })
          })
          .catch(e=>{
              reject({
                  status:0,
                  message:"抱歉，导出往来数据操作失败！"
              })
          })



    })
}


function computeOthers(data){
   
  return data.map(item=>{
        if(item['ccode']=='113301'){
            item['content']=item['cDepName']
        }else if(item['ccode']=='11330301'){
            item['content']=item['cVenName']
        }else {
            item['content']=item['cPersonName']
        }

        return {...item}
   })


}

 
module.exports={
    exportDatas
}