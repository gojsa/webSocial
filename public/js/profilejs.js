const formImage = document.getElementById("form_upload_pic_id");
formImage.setAttribute("action", `/upload-profile-pic/${sessionStorage.getItem("userId")}`)
let allData = JSON.parse(sessionStorage.getItem("allData"))

const profileImage = document.getElementById("profile_image_id");
profileImage.setAttribute("src",'http://'+allData[0].image)