"use strict";

var redis = require("redis");

var redisConnect = redis.createClient(6379, "10.86.0.60", {
  password: "123456",
  db: 0
}); // function get_connect(){
//     return new Promise((reslove,reject)=>{
//         redisConnect.on("error",err=>{
//             if(err){
//                 console.log("连接redius出错");
//                 reject(null)
//             }else {
//                 reslove(redisConnect)
//             }
//         })
//     })
// }

module.exports = {
  redisConnect: redisConnect
};