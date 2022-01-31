
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const bodyParser = require("body-parser");
const session = require('express-session');
app.use(
    session({
        secret: 'secret'
    })
);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
const { loginAuth, getAllDate } = require('./controllers/login_reg/login');
const { userRegistration, saveImage } = require('./controllers/login_reg/registration');
const { saveImagePost, postText, getAllPosts, addFreind, checkTypeUser, likeDislike, getLikedPost, getDislikedPost, dislike, insertComment, getAllComents, getPostsFromFriends } = require('./controllers/profile');
const { userJoin, userLeave, getUser,getOnlineUsers } = require('./utils/users');
const { messages } = require('./utils/messages');
const { gitListoFfriends,insertMessage, updateMessage,findAllUser } = require('./controllers/chat');


// const { redirect } = require("express/lib/response");

io.on('connection', socket => {
    socket.on("userJoin", (userId) => {

        userJoin(socket.id, userId)

        socket.emit("telAllthahtYouOnline",userId,getOnlineUsers())
    })

    socket.on("AllFriendsArray",(userId,friendId)=>{
        gitListoFfriends(userId).then((result)=>{
            let user = getUser(userId)
            // console.log(result)
            // for(let i = 0; i <result.length; i++){

            //     const user =  getUser(result[i].user_id)
            //     console.log(user)
            //     if(user.length > 0){

            //         io.to(user[0].id).emit('listOfAllFriendsArray', { result },friendId)
            //     }
                    
            // }
            io.to(user[0].id).emit('listOfAllFriendsArray', { result },friendId)

        })
    })
    socket.on("youAreOnline",(userId)=>{
        io.emit("showYouOnline",userId)
    })

    socket.on("search",(findUser)=>{
        findAllUser(findUser).then((result)=>{
            socket.emit("showUsers",{result})
        })
    })
    socket.on("updateMessage",(myId,senderId)=>{
        updateMessage(myId,senderId)
    })
    socket.on("sendMessage",(userId,friendId,message,username)=>{
        const user =  getUser(friendId)
        if(user.length > 0){
            io.to(user[0].id).emit("showMessage",messages(message,username))
            insertMessage(message, userId, friendId, 'Y')

        }else{
            insertMessage(message, userId, friendId, 'N')

        }
    })
    socket.on("listOfAllFriendsChat",(userId)=>{
        gitListoFfriends(userId).then((result)=>{
            let user = getUser(userId)

            io.to(user[0].id).emit('showListOfFriends', { result })
            
        })
    })
    socket.on("getAllPostsFromFriends", (userId) => {
        getPostsFromFriends(userId).then((result) => {
            socket.emit("showAllPostsFromFriends", { result });
        })
    })
    socket.on("addComent", (postId, userId, comment, firstName, LastName) => {
        insertComment(postId, userId, comment);
        io.emit("showInsertComment", comment, postId, firstName, LastName)

    })
    socket.on("getAllComentsForPost", (postId) => {
        getAllComents(postId).then((result) => {
            socket.emit("showComment", { result })
        });
    })
    socket.on("getAllLikedPost", (userId) => {
        getLikedPost(userId).then((result => {
            let user = getUser(userId)
            io.to(user[0].id).emit('allLikedPost', { result })

        }));
    })
    socket.on("getAllDislikedPost", (userId) => {
        getDislikedPost(userId).then((result => {
            let user = getUser(userId)
            io.to(user[0].id).emit('allDislikedPost', { result })

        }));
    })
    socket.on("likePost", (postId, userId) => {
        likeDislike(postId, userId).then((result) => {

            socket.emit("showUpdatedLike", { result })

        })
    })
    socket.on("dislikePost", (postId, userId) => {
        dislike(postId, userId).then((result) => {

            socket.emit("showUpdatedDislike", { result })

        })
    })

    socket.on("addUser", (userId, friendId) => {
        let user = getUser(friendId)
        addFreind(userId, friendId);

        if (user.length > 0) {
            io.to(user[0].id).emit('FriendRequestSend', friendId)

        }


    })

    socket.on("checkTypeUser", (userId, friendId) => {
        checkTypeUser(userId, friendId).then((result) => {
            // console.log(result)
            let user = getUser(userId)
            io.to(user[0].id).emit('userType', { result })

        })
    })

    socket.on('disconnect', () => {
        console.log('disconnect')
        userLeave(socket.id);


    });
})


app.get("/", (req, res) => {
    // console.log("Pocetna")
    res.render('login_reg/index', { result: '' });
})
app.get("/login/:username/:password", async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    loginAuth(username, password)
        .then(users => {
            if (users.length === 1) {
                req.session.loggedin = true;
                res.json(users)

                // res.status(301).redirect(`/home?id=${users[0].user_id}`)

            }
            else {
                res.render('login_reg/index');
            }

        })
        .catch(err => console.error(err));
})
app.post("/registration", (req, res) => {
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const birthdate = req.body.birthdate;
    const gender = req.body.gender;
    const email = req.body.email;
    const password = req.body.password;


    userRegistration(username, firstname, lastname, birthdate, gender, email, password).then((result) => {
        if (result === 'N') {
            res.send('Nece da moze')
        } else {
            // saveImage(req,res)

            res.redirect("/login")

        }
    }).catch(err => console.error(err));

})
app.get("/allDate/:id", (req, res) => {
    const id = req.params.id;
    // console.log(id)
    getAllDate(id).then((result) => {
        res.json(result)
    })
})
app.get("/AllPosts/:id/:logedId", (req, res) => {
    getAllPosts(req.params.id, req.params.logedId).then((result) => {
       
        res.json(result);
    })
})
app.get("/login", (req, res) => {
    res.render("login_reg/index")
})
app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    });
});
app.get("/profile", (req, res) => {
    if (req.session.loggedin) {
        res.render("profile.ejs")
    } else {
        res.redirect("/login")
    }
})
app.get("/home", (req, res) => {
    if (req.session.loggedin) {
        res.render("home.ejs")
    } else {
        res.redirect("/login")
    }
})
app.get("/userregistration", (req, res) => {
    res.render("login_reg/registration")
})

app.post('/upload-profile-pic/:id', (req, res) => {

    saveImage(req, res)
    res.redirect(`/profile?id=${req.params.id}`)


});

app.post("/uploadpostimg/:id/:sometext", (req, res) => {
    saveImagePost(req, res)
    res.redirect(`/profile?id=${req.params.id}`)

    // postText(req.params.id,req.params.sometext)


})
//zokaaaaaaaaaaaaaaaa

// const { init } = require('./config/mysql');
// const { render } = require("express/lib/response");

const port = 4444;

server.listen(port, () => console.log("server pokrenut"))