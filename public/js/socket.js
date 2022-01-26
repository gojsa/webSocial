var socket = io.connect('http://127.0.0.1:4444', { transports: ['websocket', 'polling', 'flashsocket'] });
socket.emit("userJoin", sessionStorage.getItem("userId"))
// console.log(socket.id)
socket.on("FriendRequestSend", (friendId) => {
    console.log(friendId)
    // document.getElementById("div_add_friend_button").textContent = "Request sent"
})
let logedUserInfo = JSON.parse(sessionStorage.getItem("logedUser"));

let userID = logedUserInfo[0].user_id;

socket.on("showAllPostsFromFriends", (data) => {
    console.log(data);
    console.log(data.result[0].image)
    const style = `width:200px;height:200px;`
    const div = document.getElementById("allMyPosts")
    for (let i = 0; i < data.result.length; i++) {
        let img = document.createElement("img");
        img.setAttribute("src", 'http://' + data.result[i].image);
        img.setAttribute("style", style);
        let pDiv = document.createElement("div");
        let pNameLastName = document.createElement("p");
        pNameLastName.style.fontWeight = 'bold';
        pNameLastName.textContent = data.result[i].first_name + ' ' + data.result[i].last_name;
        let postText = document.createElement("p");
        postText.innerText = data.result[i].description;
        pDiv.append(pNameLastName, postText);
        pDiv.appendChild(img)
        let likeButton = document.createElement("button");
        let dislikeButton = document.createElement("button");
        likeButton.setAttribute("id", `${data.result[i].post_id}_like`)
        dislikeButton.setAttribute("id", `${data.result[i].post_id}_dislike`)

        likeButton.textContent = `Like ${data.result[i].p_like}`;
        dislikeButton.textContent = `Dislike ${data.result[i].p_dislike}`
        likeButton.addEventListener("click", () => {
            socket.emit("likePost", data.result[i].post_id, sessionStorage.getItem("userId"))
        })
        dislikeButton.addEventListener("click", () => {
            socket.emit("dislikePost", data.result[i].post_id, sessionStorage.getItem("userId"))
        })
        //comment
        let divComment = document.createElement("div");
        divComment.setAttribute("id", `${data.result[i].post_id}_comments`)
        divComment.textContent = "Comments"

        let buttonOpenComm = document.createElement("button");
        buttonOpenComm.setAttribute("id", `${data.result[i].post_id}_button_comments`)
        buttonOpenComm.textContent = "See all comments"
        let inputComment = document.createElement("input");
        inputComment.setAttribute("placeholder", "Add comment...")
        inputComment.style.display = 'block'
        let buttonComment = document.createElement("button");
        buttonComment.textContent = "Add comment"

        buttonComment.addEventListener("click", () => {
            let value = inputComment.value;
            socket.emit("addComent", data.result[i].post_id, sessionStorage.getItem("userId"), value, logedUserInfo[0].first_name, logedUserInfo[0].last_name)
            //////////////////////////
        })

        let divInnerComment = document.createElement("div");
        divInnerComment.setAttribute("id", `${data.result[i].post_id}_inner_comments`);
        divInnerComment.append(inputComment, buttonComment)
        divInnerComment.style.display = "none"
        divComment.append(buttonOpenComm, divInnerComment)


        ///////////////
        let divLD = document.createElement("div");
        divLD.append(likeButton, dislikeButton, divComment);
        pDiv.append(divLD)

        div.append(pDiv)

        document.getElementById(`${data.result[i].post_id}_button_comments`).addEventListener("click", () => {
            document.getElementById(`${data.result[i].post_id}_inner_comments`).style.display = "block";
            socket.emit("getAllComentsForPost", data.result[i].post_id);
        })
    }
})

socket.on("showUpdatedLike", (result) => {

    let button = document.getElementById(`${result.result[0][0].post_id}_like`);
    button.textContent = `Like ${result.result[0][0].p_like}`;
    button.style.backgroundColor = "lightblue"
})
socket.on("showUpdatedDislike", (result) => {

    let button = document.getElementById(`${result.result[0][0].post_id}_dislike`);
    button.textContent = `Deslike ${result.result[0][0].p_dislike}`;
    button.style.backgroundColor = "lightblue"
})
socket.emit("getAllDislikedPost", sessionStorage.getItem("userId"));
socket.emit("getAllLikedPost", sessionStorage.getItem("userId"));
socket.on("allDislikedPost", (result) => {

    for (let i = 0; i < result.result.length; i++) {
        let buttonLike = document.getElementById(`${result.result[i].post_id}_dislike`)

        if (buttonLike) {

            buttonLike.style.backgroundColor = 'lightblue';
        }
    }
})

socket.on("allLikedPost", (result) => {

    for (let i = 0; i < result.result.length; i++) {
        let buttonLike = document.getElementById(`${result.result[i].post_id}_like`)

        if (buttonLike) {

            buttonLike.style.backgroundColor = 'lightblue';
        }
    }
})

socket.on("showComment", (result) => {

    for (let i = 0; i < result.result.length; i++) {

        let p = document.createElement("p");
        let pUser = document.createElement("p");
        pUser.textContent = result.result[i].first_name + ' ' + result.result[i].last_name;
        p.setAttribute("id", `${result.result[i].post_meta_id}_comment`)
        p.textContent = result.result[i].comment
        pUser.style.fontWeight = "bold"
        document.getElementById(`${result.result[i].post_id}_inner_comments`).append(pUser, p)
    }
})

socket.on("showInsertComment", (comment, postId, firstName, lastName) => {
    let p = document.createElement("p");
    let pUser = document.createElement("p");
    pUser.textContent = firstName + ' ' + lastName;
    p.setAttribute("id", `${postId}_comment`)
    p.textContent = comment
    pUser.style.fontWeight = "bold"
    document.getElementById(`${postId}_inner_comments`).append(pUser, p)
})

const buttonOpenChat = document.getElementById("openChat");
buttonOpenChat.addEventListener("click", () => {
    let primaryDiv = document.getElementById("openchatBoxId")
    if (document.getElementById("listFriendsBox")) {
        document.getElementById("listFriendsBox").remove()
        buttonOpenChat.setAttribute("style",'bottom:5px;top:auto;')
    } else {
        const css = `
    background-color: #e6e4e4;
    width:200px;
    height:800px;
    position:fixed;
    top:200px;
    right:0;
    display:block;
    box-shadow: -1px 7px 7px black;
    `
        const css2 = `
    top: 177px;
    bottom: auto;
    `
        buttonOpenChat.setAttribute("style", css2)
        let div = document.createElement("div");
        div.setAttribute("id", "listFriendsBox")
        div.setAttribute("style", css);
        primaryDiv.append(div)

        socket.emit("listOfAllFriendsChat",userID)
        
    }
})
socket.on("showListOfFriends",(result)=>{
    console.log(result)
    let div = document.getElementById("listFriendsBox");
    for(let i = 0; i < result.result.length;i++){
        console.log(result.result[i].first_name)
        let li = document.createElement("p");
        let img = document.createElement("img")
        let p = document.createElement("p");
        p.style.cursor = "pointer"
        img.setAttribute("src",`http://${result.result[i].image}`)
        img.style.width = '25px'
        img.style.verticalAlign = "middle";
        li.setAttribute("id",`${result.result[i].user_id}`)
        li.style.display= "inline";
        li.style.marginLeft = "5px"
        li.textContent = result.result[i].first_name + ' ' + result.result[i].last_name
        // let html = `
        // <p><img src='http://${result.result[i].image}' width='20px' height='20px'>
        // ${result.result[i].first_name}  ${result.result[i].last_name}
        // </p>
        // `
        p.append(img,li)
        div.append(p);
        
    }
})