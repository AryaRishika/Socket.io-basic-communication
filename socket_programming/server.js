/**
 * Created by rishika on 18/7/17.
 */
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

var socket = require('socket.io');

var io = socket(server);

var clients=[];
app.use('/',express.static('public_static'));


io.on('connection',function(socket){

   console.log("A user connected");
    console.log(socket.id);

   socket.on('disconnect',function(){
      console.log("A user disconnected");

   });
   socket.on('new_msg',function(data){

      io.emit('recv_msg',data);
   });
    socket.on('register',function(data){

       clients.push({name:data , id: socket.id});
       socket.broadcast.emit('new_client',{name:data , id: socket.id});
    });

    socket.on('clientList',function(cb){

       cb(clients);
    });
     socket.on('interface',function(data){

         console.log(data.towhom);
         io.to(data.towhom).emit('new_chat', {name:data.name ,id: data.id});
     });



});
server.listen(3000,function(){

   console.log("server listening");
});