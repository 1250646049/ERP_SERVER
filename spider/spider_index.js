const request=require("request")
const axios=require("axios")
const cheerio=require("cheerio")


/**
 * 获取用户地理位置
 */

class UserPosition{

    url="http://apimobile.meituan.com/locate/v2/sdk/loc?ci=mars-webloc&uuid=dadf2cf3aba74d2fa8e4.1621559307.1.0.0"
    headers={
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
        'Host': 'apimobile.meituan.com',
        'Origin': 'http://i.meituan.com',
        'Referer': 'http://i.meituan.com/',
        ci: 'mars-webloc',
        uuid: 'dadf2cf3aba74d2fa8e4.1621559307.1.0.0'
    }
    constructor(){

        this.init()

    }

    init(){
            request({
                uri:this.url,
                method:"POST",
                headers:this.headers,
                formD:{
                    reqid: 1,
                    request_address: true,
                    version: "2.1.0",
                    refer: "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Mobile Safari/537.36",
                    model: "h5",
                    nettype: "Mobile",
                    loc_duration: 157,
                    loc_status: 200,
                    address_language: "",
                    appname: "mars-webloc",
                    auth_key: "mQMvWzZ31G1woVJ9Wx17SBkOyhDoIZA3"
                }
            },(err,body,data)=>{

                if(!err){
                    console.log(data);
                }

            })

    }
}

new UserPosition()

