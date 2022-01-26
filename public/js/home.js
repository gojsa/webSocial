
socket.emit("getAllPostsFromFriends", userID)
socket.emit("getAllDislikedPost",sessionStorage.getItem("userId"));
socket.emit("getAllLikedPost",sessionStorage.getItem("userId"));