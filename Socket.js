const SocketIo=require("./server")
const Socket=require("socket.io")
var io=Socket(SocketIo)

// 设置在线用户池
var User={

}
var messageList=[]
// 在线人数
var person=0
// socket连接
io.on("connection",function(socket){
 
//    设置在线用户
    
    socket.on("disconnect",function(){
        console.log("dis",socket.name);
        delete User[socket.name]

        io.emit("userList",User) 
        person--;
    })
// 用户登录成功通信
    socket.on("login",(data)=>{
       
        const {username,name,depart,phone,sex}=data
        socket.name=username
        User[username]={
            name,depart,phone,sex
        }
       
        person++; 
        // 发布在线用户
        io.emit("userList",User)
        // 发送公告消息
        io.emit("message",messageList)
    })
    // 发布消息
    socket.on("publish",(data)=>{
      
        messageList.push(data)
        io.emit("message",messageList)
    })

})
