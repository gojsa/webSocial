var socket = io.connect('http://127.0.0.1:4444', { transports: ['websocket', 'polling', 'flashsocket'] });
socket.emit("userJoin",sessionStorage.getItem("userId"))
// console.log(socket.id)
socket.on("FriendRequestSend",(friendId)=>{
    console.log(friendId)
    // document.getElementById("div_add_friend_button").textContent = "Request sent"
})
