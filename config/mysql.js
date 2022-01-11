// const oracledb = require('oracledb');

// async function init(query,binds,options) {
//     try {

//       await oracledb.createPool({
//       //   user: 'GOJSA',
//       // password: 'gojsagojsa',
//       // connectString: 'localhost/XEPDB1'
//       user: 'epiz_30717401',
//       password: 'Staimakakoje123!',
//       connectString: 'sql102.epizy.com'

//       });
//       console.log('Connection pool started');

//       // Now the pool is running, it can be used

//        return (Promise.resolve(await dostuff(query,binds,options)));

//     } catch (err) {
//       console.error('init() error: ' + err.message);
//     } finally {

//       await closePoolAndExit();
//     }
//   }

//   async function dostuff(query,binds,options) {
//     let connection;

//     try {

//       connection = await oracledb.getConnection();

//       const result = await connection.execute(query, binds, options);
//       oracledb.autoCommit = true;

//     //   console.log(result);
//       return (Promise.resolve(result.rows))

//     } catch (err) {
//       console.error(err);
//     } finally {
//       if (connection) {
//         try {

//           await connection.close();
//         } catch (err) {
//           console.error(err);
//         }
//       }
//     }
//   }

//   async function closePoolAndExit() {
//     console.log('\nTerminating');
//     try {

//       await oracledb.getPool().close(10);
//       console.log('Pool closed');

//     } catch (err) {
//       console.error(err.message);

//     }
//   }


// module.exports.init = init



// let mysql = require('mysql');
// async function init(query) {
//   var pool = mysql.createPool({
//     connectionLimit: 100,
//     host: 'sql11.freemysqlhosting.net',
//     user: 'sql11462731',
//     password: '9T3SBnnxyH', //Snd2551998??!!
//     database: 'sql11462731',
//     port: 3306
//   })

//   return await (Promise.resolve(       
//   pool.getConnection(async function dbReturn(err, connection) {
//     if (err) {
//       console.log(err);
//     } else {
//       return await (Promise.resolve(connection.query(query, async function (err, rows) {

//         return await (Promise.resolve(rows));

//       }
//       )
//       ))
//     }





//   }
//   )
//   ))
//   //ovde
// }


// // return await(Promise.resolve(dbReturn()));




// init('SELECT * FROM USERS').then(async(result)=>{
// await console.log(result)
// })


// module.exports.init = { init };





let mysql = require('mysql');

var db_connection = mysql.createConnection({
  connectionLimit: 1000,
  host: 'sql11.freemysqlhosting.net',
  user: 'sql11462731',
  password: '9T3SBnnxyH', //Snd2551998??!!
  database: 'sql11462731',
  port: 3306
});

db_connection.connect((err) => {
  if (err) console.error(err);
  // console.log('MySQL Connection Established.');
  null;
});


module.exports.db_connection = db_connection;



