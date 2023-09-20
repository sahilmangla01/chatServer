const express = require('express')
const socket = require('socket.io')
const app = express();
const port = 4000

const server = app.listen(port , ()=> console.log(`Server is live on ${port}`))
const io = socket(server, {
    cors:{
        origin : "*"
    }
})

io.on("connection", socketClient=>{
    console.log(`User Connected : ${socketClient.id}`);
    socketClient.on("JOINROOM", clientRoom=>{
        console.log(`User Id ${socketClient.id} joined room ${clientRoom}`);
        socketClient.join(clientRoom)
    })
    socketClient.on("SENDMESSAGE",data=>{
        console.log(data);
        io.to(data.room).emit("RECEIVED", data)
    })
  
})
