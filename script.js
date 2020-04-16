let socket = io();
socket.on('connected', () => {
    console.log("Connected " + socket.id)
})

$(function(){
    let msgbox=$("#msgbox");
    let msglist=$("#msglist");
    let sendbtn=$("#sendmsg");
    let logindiv=$("#login-div");
    let loginbtn=$("#loginbtn");
    let loginbox=$("#loginbox");
    let chatdiv=$("#chat-div");
    let user="";
    
    loginbtn.click(function(){
        user=loginbox.val();
        logindiv.hide();
        chatdiv.show();
        socket.emit('login', {
            user: user
        })
    })
    sendbtn.click(function(){
        let mes=msgbox.val();
        socket.emit("send_msg",{message:mes,user:user});
    })
    socket.on("recv_msg",function(data){
        msglist.append($("<li>"+ data.user+" "+data.message+ "</li>"))
    })

})