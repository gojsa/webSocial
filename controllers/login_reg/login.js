const {db_connection} = require("../../config/mysql")
const crypto = require('crypto');
const loginAuth = (username,password) => new Promise((res, reject) => {
    const md5sum = crypto.createHash('md5');
    const ress = md5sum.update(password).digest('hex');
   //  console.log(ress)
    const query = `SELECT * FROM users where username = '${username}' and password = '${ress}'`;
    db_connection.query(query, (err, results) => {
      if (err) console.error(err);
      res(results);
   });
  });
  const getAllDate = (id) => new Promise((res, reject) => {
   const query = `SELECT i.image,u.username,u.first_name,u.last_name,u.gender,u.birth_date FROM users u JOIN images i 
   ON u.user_id = i.user_id WHERE i.valid = 'Y' and  u.user_id = ${id} and status_id = 1
   `;
   db_connection.query(query, (err, results) => {
     if (err) console.error(err);
     res(results);
  });
 });
 module.exports = { loginAuth,getAllDate };
 //   db_connection.release(err => { if (err) console.error(err) });
    
    //   db_connection.end(err => { if (err) console.error(err) });