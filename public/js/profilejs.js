
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
let userProfileImage;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')
fetch(`/allDate/${id}`).then(function (response) {
  return response.json();
}).then(function (data) {
  sessionStorage.setItem("allData", JSON.stringify(data))
  console.log(data)
   allData = JSON.parse(sessionStorage.getItem("allData"))
console.log(allData[0].last_name)
  // let profileImage = document.getElementById("profile_image_id");
  // profileImage.setAttribute("src", 'http://' + allData[0].image)
  let firstName = document.getElementById("first_last_name_id");
  firstName.innerText =  allData[0].last_name +' '+ allData[0].first_name;
  // const lastName = document.getElementById("last_name_id");
  // lastName.innerText = 'Last name: '+ allData[0].last_name;
  document.getElementById("profile_picture_id").setAttribute("src","http://"+ allData[0].image)
  document.getElementById("postUserImage").setAttribute("src","http://"+ allData[0].image)


}).catch(function (err) {
  console.log(err);
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
divAddFriendButton.style.display = "none"
if(id != sessionStorage.getItem("userId")){
  // const button = document.createElement("button");
  // button.textContent = "Add Friend";
  // button.setAttribute("id","add_friend_id")
  // divAddFriendButton.appendChild(button)
  
  document.getElementById("form_upload_pic_id").style.display = 'none';

  socket.emit("checkTypeUser",sessionStorage.getItem("userId"),id)
  socket.on("userType",(result)=>{
    console.log(result)
    
    let buttonAddF = document.getElementById("div_add_friend_button")
    buttonAddF.style.display ="inline"
    if(result.result[0].valid === 'REQUEST SENT'){
      buttonAddF.innerHTML = `
      <i class="fa fa-user-plus" style="font-size:20px">
      Request sent`
      
    }else if(result.result[0].valid === 'ACTIVE'){
      document.getElementById("div_add_friend_button").innerHTML = `
      <i class="fa fa-user-plus" style="font-size:20px">
      Friends`

    }else if(result.result[0].valid === 'PANDING REQUEST'){
      document.getElementById("div_add_friend_button").innerHTML = `
      <i class="fa fa-user-plus" style="font-size:20px">
      Accept?`
      //Logika za prihvatanje i odbijanje zahtjeva za prijateljstvo
    }
    else{
      divAddFriendButton.addEventListener("click",()=>{
        socket.emit("addUser",sessionStorage.getItem("userId"),id);
        document.getElementById("div_add_friend_button").textContent = "Request sent"
    
      })
    }
  })
}

fetch(`/AllPosts/${id}/${sessionStorage.getItem("userId")}`).then(function (response) {
  return response.json();
}).then(function (data) {
  console.log(data)
  const style = `width:200px;height:200px;`
  const divP = document.getElementById("allMyPosts")
  for (let i = 0; i < data.length; i++) {

    let bigDiv = document.createElement("div");
    bigDiv.classList.add("post2");
    let userDiv = document.createElement("div");
    userDiv.classList.add("user-profil")
    let userImg = document.createElement("img");
    userImg.classList.add("user");
    userImg.setAttribute("alt","user")
    userImg.setAttribute("src",'http://'+data[i].profile_image)

    let span = document.createElement("span");
    span.classList.add("span");
    let hForUser = document.createElement("h4");
    hForUser.setAttribute("style","color: rgb(51, 49, 49);")
    // hForUser.innerText = 'Zoran Blagojevic '
    hForUser.innerText = data[i].first_name + ' ' + data[i].last_name
    let pPostU = document.createElement("p");
    pPostU.style.color = "#726d6d"
    pPostU.innerText = " "+' is upload the post'
    let Small = document.createElement("small");
    let iIcon = document.createElement("i");
    iIcon.classList.add("fa")
    iIcon.classList.add("fa-clock-o")
    let date = new Date(data[i].date_created)
    let cDate = new Date();
    let currentDate = cDate.getDate() + '/'+cDate.getMonth()+1 + '/'+cDate.getFullYear()
    let ytDate = cDate.getDate()-1 + '/'+cDate.getMonth()+1 + '/'+cDate.getFullYear()

    
    console.log(date.getDate()+'/'+date.getMonth()+1+'/'+date.getFullYear())

    if(currentDate == date.getDate()+'/'+date.getMonth()+1+'/'+date.getFullYear()){
    Small.textContent = "Today at " + date.getHours()+':'+date.getMinutes();

    }else if(ytDate == date.getDate()+'/'+date.getMonth()+1+'/'+date.getFullYear()){
    Small.textContent = "Yestarday at " + date.getHours()+':'+date.getMinutes();

    }else{
      
      Small.textContent = date.toLocaleString();
    }

    let divImgU = document.createElement("div")
    divImgU.classList.add("foto")
    let divImgPostU = document.createElement("img");
    divImgPostU.style.width = "550px";
    divImgPostU.style.height = "420px";
    divImgPostU.setAttribute("src", 'http://' + data[i].image);
    let postText = document.createElement("p");
    postText.innerText = data[i].description;
    
    divImgU.append(postText,divImgPostU)

    let divLikeCom = document.createElement("div");
    // // divLikeCom.classList.add("like-com");

    // let divBUtton = document.createElement("button");
    // // divBUtton.classList.add("like")
    // divBUtton.style.fontSize = "20px"

    // let iFD = document.createElement("i");
    // iFD.classList.add("fa");
    // iFD.classList.add("fa-thumbs-o-up");
    // let pIDiv = document.createElement("p");
    // pIDiv.innerText =`Like + ${data[i].p_like}` 
    // let button4 = document.createElement("button");
    // button4.classList.add("coment");
    // let buttI = document.createElement("i");
    // buttI.classList.add("fa");
    // buttI.classList.add("fa-comments-o");
    // buttI.style.fontSize = "20px"
    // let pNumberComment = document.createElement("p")
    // pNumberComment.innerText = "5"

    /////
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
    let divForButtons = document.createElement("div");
    divForButtons.append(likeButton,dislikeButton)
    ////pIDiv




    divLikeCom.append(divForButtons)//divBUtton,iFD,button4,buttI,pNumberComment
    span.append(hForUser,pPostU)
    userDiv.append(userImg,span,Small)
    bigDiv.append(userDiv,divImgU,divLikeCom) //
    divP.append(bigDiv)

    let img = document.createElement("img");
    img.setAttribute("src", 'http://' + data[i].image);
    img.setAttribute("style", style);
    //
    // profilna slika
    // const profImg = document.getElementById("profile_picture_id");
    // profImg.setAttribute("src",'http://' + data[i].image)
    // userProfileImage = 'http://' + data[i].image;
    // document.getElementById("postUserImage").setAttribute("src",userProfileImage)
    //
    // let pDiv = document.createElement("div");

    // let postText = document.createElement("p");
    // postText.innerText = data[i].description;
    // pDiv.appendChild(postText);
    // pDiv.appendChild(img)
    // let likeButton = document.createElement("button");
    // let dislikeButton = document.createElement("button");
    // likeButton.setAttribute("id",`${data[i].post_id}_like`)
    // dislikeButton.setAttribute("id",`${data[i].post_id}_dislike`)

    // likeButton.textContent = `Like ${data[i].p_like}`;
    // dislikeButton.textContent = `Dislike ${data[i].p_dislike}`
    // likeButton.addEventListener("click",()=>{
    //   socket.emit("likePost",data[i].post_id,sessionStorage.getItem("userId"))
    // })
    // dislikeButton.addEventListener("click",()=>{
    //   socket.emit("dislikePost",data[i].post_id,sessionStorage.getItem("userId"))
    // })
    //comment
    let divComment = document.createElement("div");
    divComment.setAttribute("id",`${data[i].post_id}_comments`)
    divComment.textContent = "Comments"
    
    // <div class="write-com">
    //             <img src="" alt="user" class="user">
    //             <textarea placeholder="Napisi komentar..." cols="70" rows="3" class="text-com"></textarea>
    //         </div>
   

let divWriteCom = document.createElement("div");
divWriteCom.className = "write-com"
let imgComm = document.createElement("img")
    imgComm.setAttribute("alt","user");
    imgComm.className = "user"
    imgComm.setAttribute("src","http://"+data[i].profile_image)
let textArea = document.createElement("textarea");
    textArea.setAttribute("placeholder","Write comment...");
    textArea.setAttribute("cols","70");
    textArea.setAttribute("rows","3");
    textArea.className = "text-com"


divWriteCom.append(imgComm,textArea)
    let buttonOpenComm = document.createElement("button");
    buttonOpenComm.setAttribute("id",`${data[i].post_id}_button_comments`)
    buttonOpenComm.textContent = "See all comments"
    // let inputComment = document.createElement("input");
    // inputComment.setAttribute("placeholder","Add comment...")
    // inputComment.style.display = 'block'
    let buttonComment = document.createElement("button");
    buttonComment.textContent = "Add comment"

    buttonComment.addEventListener("click",()=>{
      let value = textArea.value;
      socket.emit("addComent",data[i].post_id,sessionStorage.getItem("userId"),value,logedUserInfo[0].first_name,logedUserInfo[0].last_name)
      //////////////////////////
    })

    let divInnerComment = document.createElement("div");
    divInnerComment.setAttribute("id",`${data[i].post_id}_inner_comments`);
    divInnerComment.append(divWriteCom,buttonComment)
    divInnerComment.style.display = "none"
    divComment.append(buttonOpenComm,divInnerComment)

    
/////////////
    let divLD = document.createElement("div");
    divLD.append(likeButton,dislikeButton,divComment);
    // pDiv.append(divLD)
    
    divP.append(divLD)

    document.getElementById(`${data[i].post_id}_button_comments`).addEventListener("click",()=>{
      document.getElementById(`${data[i].post_id}_inner_comments`).style.display = "block";
      socket.emit("getAllComentsForPost",data[i].post_id);
    })
  }
}).catch(function (err) {
  console.log(err);
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