const request = require("request")
const axios = require("axios")
const cheerio = require("cheerio")
const {getDate}=require("../utils/utils")

/**
 * 获取用户地理位置
 */

class UserPosition {

    url = "https://mars.meituan.com/locate/v3/sdk/loc"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",

    }
    constructor() {

  

    }
    async init() {
        try{
            let result= await this.initPosition()
           
            let weather= await this.initWether(result['address'])
            let news= await this.initNews()
            
            return {
                status:1,
                message:"操作成功！",
                address:result['address'],
                weather:weather['weather'],
                news:news['news'],
                time:getDate()
            }
             
        }catch{

            return {
                status:0,
                message:"操作失败！"
            }
        }
      

    }


    initPosition() {
        return new Promise((reslove, reject) => {
            axios.post(this.url, {
                    coord_type: "GCJ02",
                    need_address: true,
                    need_openCity: 1,
                })
                .then(r => reslove({
                    status: 1,
                    message: "获取成功",
                    address: r.data['data']['address']
                }))
                .catch(e => reject(e))
        })
    }

    initWether({province,city,district}){
        
        return new Promise((reslove,reject)=>{
            request({
                method:"GET",
                url:`https://wis.qq.com/weather/common?source=pc&weather_type=observe`,
                headers:this.headers,
                formData:{
                    province,
                    city,
                    county:district
                }
            },(err,resp,body)=>{

                if(!err){
                    reslove({
                        status:1,
                        message:"查询成功！",
                        weather:JSON.parse(body)['data']['observe']
                    })
                }else {
                   reject({
                       status:0,
                       message:"抱歉，操作失败！"
                   })
                }

            })


        })


    }

    initNews(){
        return new Promise((reslove,reject)=>{
            request({
                method:"GET",
                headers:this.headers,
                url:"https://top.baidu.com/board?tab=realtime&sa=search_31065"
            },(err,resp,body)=>{
                if(!err){
                    const $=cheerio.load(body)

                    const list=$(".container-bg_lQ801>div:last-child>div")
                    let d=[]
                    $(list).each((index,item)=>{
                        const content=$(item).find(".content_1YWBm>a").text().split(" ")[1]
                        d.push(content)
                    })

                    if(d.length===list.length){
                        reslove({
                            status:1,
                            message:"查询新闻成功",
                            news:d
                        })
                    }
                }else {
                    reject({
                        status:0,
                        message:"抱歉，操作失败！"
                    })
                }

            })



        })

    }
}

module.exports={
    UserPosition
}