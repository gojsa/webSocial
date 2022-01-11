const crypto = require('crypto');
const {db_connection} = require("../../config/mysql")
const multer = require('multer');
const path = require('path');
const helpers = require('./helpers');
// app.use(express.static(__dirname + '/public'));

const userRegistration = (username, firstname, lastname, birthdate, gender, email, password)=>new Promise((res,rej) =>{
  
  const md5sum = crypto.createHash('md5');
  const ress = md5sum.update(String(password)).digest('hex');
  
  const queryCount = `select count(*) as 'b' from users where username = '${username}'`;
  db_connection.query(queryCount, (err, results) => {
    if (err) console.error(err);
      
    if (results[0].b > 0){
      console.log('ne moze')
      res('N')
    }else{
    //   const query = `
    // insert into users (
    //     username,
    //     first_name,
    //     last_name,
    //     birth_date,
    //     gender,
    //     email,
    //     password,
    //     date_created,
    //     date_updated
    //     )
    //     values(
    //     '${String(username)}',
    //     '${String(firstname)}',
    //     '${String(lastname)}',
    //      '${birthdate}',
    //     '${String(gender)}',
    //     '${String(email)}',
    //     '${ress}',
    //     CURDATE(),
    //     CURDATE()
    //     )
        
    // `;
    const query = `
    call sql11462731.user_registration('${username}', '${firstname}', '${lastname}', '${birthdate}', '${gender}', '${email}', '${ress}');

    `
    db_connection.query(query, (err, results) => {
      if (err) console.error(err);
      res(results);
      
   });
    }
 });
  
});

function saveImage(req,res){
  let imgName;
  const userId = req.params.id;
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/profile_images/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
      imgName=file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        cb(null,imgName);
    }
});

// 'profile_pic' is the name of our file input field in the HTML form
let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

upload(req, res, function(err) {
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
    
    imageUpload(imgName,userId)
    // console.log(req.file.path)
    // Display uploaded image for user validation 
    // res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
});

}
const imageUpload = (filePath,userId) => new Promise((res, reject) => {
  let newImgPath
   newImgPath = 'localhost:4444/uploads/profile_images/'+filePath;
  const query = `call sql11462731.insert_update_image('${newImgPath}', ${userId});`;
  db_connection.query(query, (err, results) => {
    if (err) console.error(err);
    res(results);
 });
});

module.exports = { userRegistration,saveImage };
// select LAST_INSERT_ID() localhost:4444/uploads/profile_images/publicuploadsprofile_imagesprofile_pic-1641678341739.jpg