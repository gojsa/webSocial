
let allData;
// let logedUserInfo = JSON.parse(sessionStorage.getItem("logedUser"));
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')
fetch(`/allDate/${id}`).then(function (response) {
  return response.json();
}).then(function (data) {
  sessionStorage.setItem("allData", JSON.stringify(data))
  console.log(data)
   allData = JSON.parse(sessionStorage.getItem("allData"))

  const profileImage = document.getElementById("profile_image_id");
  profileImage.setAttribute("src", 'http://' + allData[0].image)
  const firstName = document.getElementById("first_name_id");
  const lastName = document.getElementById("last_name_id");
  firstName.innerText = 'Name: '+ allData[0].first_name;
  lastName.innerText = 'Last name: '+ allData[0].last_name;


}).catch(function () {
  console.log("Booo");
});


const formImage = document.getElementById("form_upload_pic_id");
formImage.setAttribute("action", `/upload-profile-pic/${sessionStorage.getItem("userId")}`)
const formPostImg = document.getElementById("form_post_id");


let button = document.getElementById("btn_upload_post_id");
button.addEventListener("click", () => {
  let someText = document.getElementById("sometext").value
  formPostImg.setAttribute("action", `/uploadpostimg/${sessionStorage.getItem("userId")}/${someText}/`)

  formPostImg.submit()
})
const divAddFriendButton = document.getElementById("div_add_friend_button");
if(id != sessionStorage.getItem("userId")){
  const button = document.createElement("button");
  button.textContent = "Add Friend";
  button.setAttribute("id","add_friend_id")
  divAddFriendButton.appendChild(button)
  
  document.getElementById("form_upload_pic_id").style.display = 'none';

  socket.emit("checkTypeUser",sessionStorage.getItem("userId"),id)
  socket.on("userType",(result)=>{
    console.log(result)
    
    if(result.result[0].valid === 'REQUEST SENT'){
      document.getElementById("add_friend_id").textContent = "Request sent"
      
    }else if(result.result[0].valid === 'ACTIVE'){
      document.getElementById("add_friend_id").textContent = "Friends"

    }else if(result.result[0].valid === 'PANDING REQUEST'){
      document.getElementById("add_friend_id").textContent = "Accept?"
      //Logika za prihvatanje i odbijanje zahtjeva za prijateljstvo
    }
    else{
      button.addEventListener("click",()=>{
        socket.emit("addUser",sessionStorage.getItem("userId"),id);
        document.getElementById("add_friend_id").textContent = "Request sent"
    
      })
    }
  })
}

fetch(`/AllPosts/${id}/${sessionStorage.getItem("userId")}`).then(function (response) {
  return response.json();
}).then(function (data) {
  console.log(data)
  const style = `width:200px;height:200px;`
  const div = document.getElementById("allMyPosts")
  for (let i = 0; i < data.length; i++) {
    let img = document.createElement("img");
    img.setAttribute("src", 'http://' + data[i].image);
    img.setAttribute("style", style);
    let pDiv = document.createElement("div");

    let postText = document.createElement("p");
    postText.innerText = data[i].description;
    pDiv.appendChild(postText);
    pDiv.appendChild(img)
    let likeButton = document.createElement("button");
    let dislikeButton = document.createElement("button");
    likeButton.setAttribute("id",`${data[i].post_id}_like`)
    dislikeButton.setAttribute("id",`${data[i].post_id}_dislike`)

    likeButton.textContent = `Like ${data[i].p_like}`;
    dislikeButton.textContent = `Dislike ${data[i].p_dislike}`
    likeButton.addEventListener("click",()=>{
      socket.emit("likePost",data[i].post_id,sessionStorage.getItem("userId"))
    })
    dislikeButton.addEventListener("click",()=>{
      socket.emit("dislikePost",data[i].post_id,sessionStorage.getItem("userId"))
    })
    //comment
    let divComment = document.createElement("div");
    divComment.setAttribute("id",`${data[i].post_id}_comments`)
    divComment.textContent = "Comments"
    
    let buttonOpenComm = document.createElement("button");
    buttonOpenComm.setAttribute("id",`${data[i].post_id}_button_comments`)
    buttonOpenComm.textContent = "See all comments"
    let inputComment = document.createElement("input");
    inputComment.setAttribute("placeholder","Add comment...")
    inputComment.style.display = 'block'
    let buttonComment = document.createElement("button");
    buttonComment.textContent = "Add comment"

    buttonComment.addEventListener("click",()=>{
      let value = inputComment.value;
      socket.emit("addComent",data[i].post_id,sessionStorage.getItem("userId"),value,logedUserInfo[0].first_name,logedUserInfo[0].last_name)
      //////////////////////////
    })

    let divInnerComment = document.createElement("div");
    divInnerComment.setAttribute("id",`${data[i].post_id}_inner_comments`);
    divInnerComment.append(inputComment,buttonComment)
    divInnerComment.style.display = "none"
    divComment.append(buttonOpenComm,divInnerComment)

    
///////////////
    let divLD = document.createElement("div");
    divLD.append(likeButton,dislikeButton,divComment);
    pDiv.append(divLD)
   
    div.append(pDiv)

    document.getElementById(`${data[i].post_id}_button_comments`).addEventListener("click",()=>{
      document.getElementById(`${data[i].post_id}_inner_comments`).style.display = "block";
      socket.emit("getAllComentsForPost",data[i].post_id);
    })
  }
}).catch(function () {
  console.log("Booo");
});
socket.on("showUpdatedLike",(result)=>{
  
  let button = document.getElementById(`${result.result[0][0].post_id}_like`);
  button.textContent = `Like ${result.result[0][0].p_like}`;
  button.style.backgroundColor = "lightblue"
})
socket.on("showUpdatedDislike",(result)=>{
  
  let button = document.getElementById(`${result.result[0][0].post_id}_dislike`);
  button.textContent = `Deslike ${result.result[0][0].p_dislike}`;
  button.style.backgroundColor = "lightblue"
})
socket.emit("getAllDislikedPost",sessionStorage.getItem("userId"));
socket.emit("getAllLikedPost",sessionStorage.getItem("userId"));
socket.on("allDislikedPost",(result)=>{
    
  for(let i = 0; i < result.result.length; i++){
      let buttonLike = document.getElementById(`${result.result[i].post_id}_dislike`)
     
      if(buttonLike){ 

        buttonLike.style.backgroundColor = 'lightblue';
      }
  }
})

socket.on("allLikedPost",(result)=>{
    
    for(let i = 0; i < result.result.length; i++){
        let buttonLike = document.getElementById(`${result.result[i].post_id}_like`)
        
        if(buttonLike){

          buttonLike.style.backgroundColor = 'lightblue';
        }
    }
})

// socket.on("showComment",(result)=>{
  
//   for(let i = 0; i < result.result.length; i++){
    
//     let p = document.createElement("p");
//     let pUser = document.createElement("p");
//     pUser.textContent = result.result[i].first_name + ' '+ result.result[i].last_name;
//     p.setAttribute("id",`${result.result[i].post_meta_id}_comment` )
//     p.textContent = result.result[i].comment
//     pUser.style.fontWeight = "bold"
//     document.getElementById(`${result.result[i].post_id}_inner_comments`).append(pUser,p)
//   }
// })

// socket.on("showInsertComment",(comment,postId,firstName,lastName)=>{
//   let p = document.createElement("p");
//   let pUser = document.createElement("p");
//   pUser.textContent = firstName + ' '+ lastName;
//   p.setAttribute("id",`${postId}_comment` )
//   p.textContent = comment
//   pUser.style.fontWeight = "bold"
//   document.getElementById(`${postId}_inner_comments`).append(pUser,p)
// })