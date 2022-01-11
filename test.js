const {db_connection} = require("../../config/mysql")

const loginAuth = (username,password) => new Promise((res, reject) => {
    const query = `SELECT * FROM users where username = '${username}' and password = '${password}'`;
    db_connection.query(query, (err, results) => {
      if (err) console.error(err);
      res(results);
   });
  });
 module.exports = { loginAuth };