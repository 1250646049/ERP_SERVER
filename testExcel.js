const fs=require("fs")
const ejsExcel=require("ejsexcel")
const path=require("path")



let exBuf= fs.readFileSync("public/moban/moban.xlsx")


// title 
let data=[
    {
        title:`成本节约报表（2021年${new Date().getMonth()+1}月）\n Cost saving report (Oct, 2020)`,
        depart:"成本中心",
        first_date:"2021-1-1",
        time:"2021年6月18日",
        list:[{
            index:1,
            bianma:66858
        },
        {
            index:1,
            bianma:66858
        },
        {
            index:1,
            bianma:66858
        },
        {
            index:1,
            bianma:66858
        }]
    }
]
//渲染Excel表格
ejsExcel.renderExcel(exBuf,data)
.then(excelBuffer=>{
    fs.writeFileSync("15.xlsx",excelBuffer,{encoding:"binary"})
    console.log('ok');
})
.catch(e=>console.log(e))
