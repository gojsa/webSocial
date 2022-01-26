



  const loginButton = document.getElementById("login_button_id")
  loginButton.addEventListener("click",(event)=>{
      event.preventDefault()
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    fetch(`/login/${username}/${password}`).then(function (response) {
        return response.json();
      }).then(function (data) {
        sessionStorage.setItem("logedUser", JSON.stringify(data))
        
        sessionStorage.setItem("userId", data[0].user_id)

        window.location.replace("http://localhost:4444/home");
        // logedUserInfo = data
        console.log(data)
      }).catch(function () {
        console.log("Booo");
      });
  })