/**
 * Created by rishika on 18/7/17.
 */


var socket = io();
    // var room=[];//{id: roomno: }
    // var r_status=[0,0]; //0 available
    //
    //
    //
    //
    // function connecttoclient(id1){
    //
    //     console.log(id1);
    //     socket.emit('interface',{name:myname ,id: socket.id ,towhom:id1});
    //
    //
    // };
    //
    // socket.on('new_chat',function(data){
    //
    //     console.log("hiiiiiiiiiiiiiiiiiiiiii");
    //     console.log("new chat request");
    //     alert("new chat request");
    //     var flag=0;
    //     for(var i=0;i<r_status.length;i++){
    //
    //         if(r_status[i]==0)
    //         {
    //             socket.join(i);
    //             r_status[i]=1;
    //             room[i]=data.id;
    //             set(data.id);
    //             flag=1;
    //             i=99;
    //         }
    //
    //     }
    //
    //     if(flag==1){
    //
    //         io.to(socketid).emit('ok_chat', {name:myname ,id: socket.id});
    //
    //
    //     }
    //
    //
    // });
    //
    // socket.on('ok_chat',function(data){
    //     console.log("yes for request");
    //     for(var i=0;i<r_status.length;i++){
    //
    //         if(r_status[i]==0)
    //         {
    //             socket.join(i);
    //             r_status[i]=1;
    //             room[i]=data.id;
    //             set(data.id);
    //         }
    //     }
    //
    //
    //
    // });
    //
    // function set(id){
    //
    //     var query='<div class="row">'+
    //         '<div class="offset-s1 col s4 msgbox">'+
    //         '<div class="row">'+
    //         '<div class="col s12 msgs" id="m' +id + '"></div>'+
    //         '</div>'+
    //         '<div class="row">'+
    //         '<div class="col s12 aa">'+
    //
    //         '<input type="text"id="i' +id + '">'+
    //         '<input type="submit" onClick="sendmsg(' + id + ')">'+
    //         '</div> </div> </div> </div>';
    //
    //
    //
    // };
    // function sendmsg(id){
    //
    //
    //     var msg=$('#i'+id).val();
    //     var query = '<div class="row">' +
    //         '<div class="offset-s5 col s7 mymsg">' + msg + '</div>' +
    //         ' </div>';
    //
    //     $('#m'+id).append(query);
    //     io.to(id).emit('new_chatC', {user:myname ,msg: msg , sender:socket.id});
    //
    //
    // }
    //  socket.on('new_chatC',function(data){
    //
    //      var query = '<div class="row">' +
    //          '<div class="col s7 frndmsg">' + data.user + "::" + data.msg + '</div>' +
    //          ' </div>';
    //
    //      $('.m'+data.sender).append(query);
    //
    //
    //  });
    var myname=prompt("Username");
    socket.emit('register',myname);
    socket.emit('clientList',function(data)
    {
                for(var i=0;i<data.length;i++)
                {

                    if(data[i].name!=myname){

                        var query ='<div class="row">'+
                            '<div class="col s12 client"><a href="#" onClick="connecttoclient(this.id)"  id=" ' + data[i].id + '">' +
                            '<i class="material-icons">person_pin</i>' + data[i].name +'</a></div>'+
                            ' </div>'  ;
                        $('.clientList').append(query);

                    }


                };
                if(data.length==0)
                {
                    alert('No clients');
                }


    });
    $('#btn').click(function(){

       var msg=$('#inp').val();
        $('#inp').text(" ");
       socket.emit('new_msg',{input:msg , user : myname});

    });
    socket.on('recv_msg',function(data){

        if(data.user===myname) {

            var query = '<div class="row">' +
                '<div class="offset-s5 col s7 mymsg">' + data.input + '</div>' +
                ' </div>';

            $('.msgbox').append(query);
        }
        else
        {
            var query = '<div class="row">' +
                '<div class="col s7 frndmsg">' + data.user + "::" + data.input + '</div>' +
                ' </div>';

            $('.msgbox').append(query);


        }

    });


    socket.on('new_client',function(data){


        var query ='<div class="row">'+
            '<div class="col s12 client"><a href="#" onClick="connecttoclient(this.id)"  id=" ' + data.id + '">' +
            '<i class="material-icons">person_pin</i>' + data.name +'</a></div>'+
            ' </div>'  ;
        $('.clientList').append(query);


    });
