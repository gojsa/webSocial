
// let logedUserInfo;
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString)
// const id = urlParams.get('id')
// sessionStorage.setItem("userId", id);
// let href = document.getElementById("my_profile");
// href.setAttribute("href", `/profile?id=${id}`)
// //if (sessionStorage.getItem("allData") === 'null'){ 
// fetch(`/allDate/${sessionStorage.getItem("userId")}`).then(function (response) {
//   return response.json();
// }).then(function (data) {
//   sessionStorage.setItem("logedUser", JSON.stringify(data))
//   logedUserInfo = data
//   console.log(data)
// }).catch(function () {
//   console.log("Booo");
// });
//}


let href = document.getElementById("my_profile");
href.setAttribute("href", `/profile?id=${logedUserInfo[0].user_id}`)


