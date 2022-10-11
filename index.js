const express = require("express");
const http = require("http");
const {Server} = require("socket.io");


const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const history=[];

io.on("connection",(socket)=>{
    socket.emit("history",history);
    socket.broadcast.emit("newUser");
    socket.on("newMessage",(msg)=>{
       history.push(msg);
       io.emit("newMessage",msg);
    });

});

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/",express.static("public"));


const port = process.env.PORT || 9000;

httpServer.listen(port,()=>{
    console.log("started on http://localhost:9000")
});
