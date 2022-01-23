const { db_connection } = require("../config/mysql")
const multer = require('multer');
const path = require('path');
const helpers = require('./login_reg/helpers');
function saveImagePost(req, res) {
    let imgName;
    const userId = req.params.id;
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/profile_images/');
        },

        // By default, multer removes file extensions so let's add them back
        filename: function (req, file, cb) {
            imgName = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
            cb(null, imgName);
        }
    });

    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        imageUpload(imgName, userId).then(()=>{
        postText(req.params.id,req.params.sometext)

        })
        // console.log(req.file.path)
        // Display uploaded image for user validation 
        // res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });

}
const imageUpload = (filePath, userId) => new Promise((res, reject) => {
    let newImgPath
    newImgPath = 'localhost:4444/uploads/profile_images/' + filePath;
    const query = `call sql11462731.insert_update_image_post('${newImgPath}', ${userId});`;
    db_connection.query(query, (err, results) => {
        if (err) console.error(err);
        res(results);
    });
});



const postText = (userId, text) => new Promise((res, reject) => {
    const query = `call sql11462731.insert_post_text(${userId}, '${text}');`;

    db_connection.query(query, (err, results) => {
        if (err) console.error(err);
        res(results);
    });
});

const getAllPosts = (userId) => new Promise((res,rejact)=>{
    const query = `select a.post_id,sql11462731.count_like_dislike(a.post_id, 'L')as p_like,sql11462731.count_like_dislike(a.post_id, 'D')as p_dislike, a.description,b.image,a.date_created from posts a inner join images b on a.image_id = b.image_id where a.user_id = ${userId} and b.type = 2 order by a.date_created desc`;

    db_connection.query(query, (err, results) => {
        if (err) console.error(err);
        res(results);
    });
})

const likeDislike = (postId,userId) => new Promise((res,rejact)=>{
   
       const query = `call sql11462731.insert_like_dislike(${postId}, ${userId}, 'L');`
    
    db_connection.query(query, (err, results) => {
        if (err) console.error(err);
        res(results);
    });
})
const dislike = (postId,userId) => new Promise((res,rejact)=>{
   
    const query = `call sql11462731.insert_like_dislike(${postId}, ${userId}, 'N');`
 
 db_connection.query(query, (err, results) => {
     if (err) console.error(err);
     res(results);
 });
})

const addFreind = (userId,friendId) => new Promise((res,rejact)=>{
    const query = `call sql11462731.add_friend(${userId}, ${friendId});`;
    db_connection.query(query, (err, results) => {
        if (err) console.error(err);
        res(results);
    });
})
const checkTypeUser = (userId,friendId)=> new Promise((res,rejact)=>{
    const query = ` select sql11462731.checkTypeUser(${userId}, ${friendId}) as valid`;
    db_connection.query(query, (err, results) => {
        if (err) console.error(err);
        res(results);
        // console.log(results)
    });
})
const getLikedPost = (userId) => new Promise ((res,rejact)=>{
    const query = `select post_id from posts_meta where user_id = ${userId} and p_like = 'Y'`;
    db_connection.query(query, (err, results) => {
        if (err) console.error(err);
        res(results);
        
    });
})
const getDislikedPost = (userId) => new Promise ((res,rejact)=>{
    const query = `select post_id from posts_meta where user_id = ${userId} and p_dislike = 'Y'`;
    db_connection.query(query, (err, results) => {
        if (err) console.error(err);
        res(results);
        
    });
})
module.exports = { saveImagePost,postText,getAllPosts,addFreind,checkTypeUser,likeDislike,getLikedPost,getDislikedPost,dislike };