const requests = require("request")
const moment=require("moment")




// 请求付款申请表

function get_fukuan(page=1,createFrom,createTo) {
    
    if(!createFrom){
        let arr=[1,3,5,7,8,10,12]
        let date=new Date()
        let month=date.getMonth()<=10?("0"+date.getMonth()):date.getMonth()
        let day=arr.indexOf(Number(month))!==-1?31:date.getDate()
        createFrom=`${date.getFullYear()}-${month}-${day}`
    }
    if(!createTo){
        createTo=moment().format("YYYY-MM-DD")
    }
   
    return new Promise((reslove, reject) => {
        requests({
            method: "POST",
            // https://aflow.dingtalk.com/dingtalk/web/query/instdata/getInstancesByQuery.json
            url: "https://aflow.dingtalk.com/dingtalk/web/query/instdata/getInstancesByQuery.json",
            headers : {
                "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
                'x-client-corpid': 'dingbfc2b2631a14318ebc961a6cb783455b',
                'cookie': 'arms_uid=ca1c16e1-b1b6-4471-bc2b-ba6f93b469f7; cna=NcwrGCFDVR0CAdpJYZvmNtlP; UM_distinctid=179a77618da38d-0e17920f7396af8-293e1d4e-1fa400-179a77618db105; __guid=209760837.2793478665394398000.1622012213282.5593; dd_n=CN; dingtalk_corpid=dingbfc2b2631a14318ebc961a6cb783455b; cmouse=sb0487fb6-7cf4-4b7b-9778-04e335e6c497-1624947848298; dt_org=105003997; xlly_s=1; account=oauth_k1%3AJ3sSyaZQVvCDk3jSQnf%2B0mG%2FRF3cnt%2B53WSDcXht618yJUlq5woag8F63TS8MTFXA5eVUTpZ6HrcmfSTjah7F3zgVT9r7F8KfVw%2BIUWsLTU%3D; deviceid=1621168516f744a1867099fd58cd2e15; pub_uid=A6ra3FJNuNOAe4uadlbNVg%3D%3D; pub_org_id=ZYwzOyK6yHreWXAnZ9LXAg%3D%3D; dt_s=u-8413aeec-7a5aec33f6-b8ac7a5-35bd73-3b4e460d-d73149fc-60c8-4fd4-8f37-044e13da09e9; weiflow_token=Q609C5A943547D59A911040805D4466FD750FE7E60B20E81D6137CB30BF84657DBF4AF9DF8F90025D35F2CDD8539EB3CF63DB187897E3E13410B6AC5080D42A936FE3095E744FC322179A76A31E0D305BBDDEB4AD9A8365B36B9ED080A0F6F2F63786810B9B8BB6110DBEF716DFE362CD0850214A51BD0575B134C3F247936896D9390285610E930A0B40F361639AA45D97F47C7F5173D2832AAE5D7AB21B0BD9CDD1EB324C63006A4986AEC2DC9C6663E27BBF995B8E28F84FFDE232DE517A6E08F52345F2FBC2D92AC19AFF5E284F350751E0FFD860101578C7561A03AE1898396FE5D219FB86C7384FA2D6B326825C0C1C8C2BD517AC38D9DD4BB36081DF00D25D0CA427CAB781706E379C1AA32381; _csrf_token_=1625023069596; monitor_count=117; tfstk=c9TOBVs6fvDiCY5pahnncD2elSVAaykAd560kfSz2hKnlvmibsbJrUK5qc1jXxcd.; l=eBT20ibPjnu3Ex4vBO5alurza77OfnRXDsPzaNbMiIncC63PEyJ9XtKQDNqWBIxRR8XVMmYy4kkZIsetREZL8yDjys1fNyKgKEbMHU8h.; isg=BB4evxAM8pJMMiaACTGFiaP2b7Rg3-JZZ9duUsi3ZWOD647FO2lwaM7N4_dnU9px',

                '_csrf_token_': '1625023069596'
            },
            formData: {
                'page': page,
                'appkey': 'dingbfc2b2631a14318ebc961a6cb783455b',
                'limit': 10,
                'createFrom': '2020-05-31',
                'createTo': '2022-07-01',
                'finishFrom': '',
                'finishTo': '',
                'processCode': 'PROC-E60A0471-F7FA-49AD-A920-1B755555382D',
                'instanceStatus': '',
                'title': '',
                'businessId': '',
                'originatorUserId': ''

            },
   
        },(err,resp,body)=>{
            if(!err){
                reslove({
                    status:1,
                    message:"查询成功！",
                    data:JSON.parse(body)['data']
                })
            }


        })



    })




}
// 获取所有付款数据

async function getAllFukuanData(createFrom,createTo){
    let list=[]
    const {data}=await get_fukuan(1,createFrom,createTo)
    let page=data['page']
    let values=data['values']
    let hasMore=data['hasMore']
    list.push(...values)
    while(hasMore){
        page+=1;
        const {data}=await get_fukuan(page,createFrom,createTo)
        values=data['values']
        hasMore=data['hasMore']
        list.push(...values)

    }
    return {
        status:1,
        message:"查询成功！",
        list,
        total:list.length
    }

}



module.exports={
    getAllFukuanData
}
