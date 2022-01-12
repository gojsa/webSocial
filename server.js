console.log(123)
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
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
const { loginAuth,getAllDate } = require('./controllers/login_reg/login');
const { userRegistration, saveImage } = require('./controllers/login_reg/registration');
const { redirect } = require("express/lib/response");
app.get("/", (req, res) => {
    console.log("Pocetna")
    res.render('login_reg/index', { result: '' });
})
app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    loginAuth(username, password)
        .then(users => {
            if (users.length === 1) {
               
                req.session.loggedin = true;
                res.status(301).redirect(`/home?id=${users[0].user_id}`)

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
app.get("/allDate/:id",(req,res)=>{
    const id = req.params.id;
    console.log(id)
    getAllDate(id).then((result)=>{
        res.json(result)
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
    res.redirect("/profile")

});
app.post("/uploadpost/:id",(req,res)=>{
    console.log(req.body.sometext)
    // console.log(req.params.sometext)

})
app.post("/uploadpostimg/:id",(req,res)=>{
    console.log(req.params.id)
})
// const { init } = require('./config/mysql');
// const { render } = require("express/lib/response");

const port = 4444;

server.listen(port, () => console.log("server pokrenut"))