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
  let allData = JSON.parse(sessionStorage.getItem("allData"))

  const profileImage = document.getElementById("profile_image_id");
  profileImage.setAttribute("src", 'http://' + allData[0].image)
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
  
  socket.emit("checkTypeUser",sessionStorage.getItem("userId"),id)
  socket.on("userType",(result)=>{
    console.log(result.result[0].valid)
    
    if(result.result[0].valid === 'N'){
      document.getElementById("add_friend_id").textContent = "Request sent"
      
    }else if(result.result[0].valid === 'Y'){
      document.getElementById("add_friend_id").textContent = "Friends"

    }
    else{
      button.addEventListener("click",()=>{
        socket.emit("addUser",sessionStorage.getItem("userId"),id);
        document.getElementById("add_friend_id").textContent = "Request sent"
    
      })
    }
  })
}

fetch(`/AllPosts/${id}`).then(function (response) {
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
    likeButton.textContent = `Like ${data[i].post_like}`;
    dislikeButton.textContent = `Dislike ${data[i].post_dislike}`
    let divLD = document.createElement("div");
    divLD.append(likeButton,dislikeButton);
    pDiv.append(divLD)
    // postText.appendChild(img)
    div.append(pDiv)
  }
}).catch(function () {
  console.log("Booo");
});


