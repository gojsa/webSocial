const { db_connection } = require("../config/mysql")


const gitListoFfriends = (userId) => new Promise((res, rejact) => {
    const query = ` 
    select a.user_id,b.first_name,b.last_name,c.image from user_group_members a join users b on a.user_id = b.user_id
join images c on a.user_id = c.user_id
 where group_id = 
(
select user_group_id from user_groups where user_id = ${userId}
) and a.status_id = 6 and c.valid = 'Y' and c.status_id = 1;

    `;
    db_connection.query(query, (err, results) => {
        if (err) console.error(err);
        res(results);

    });
})
const insertMessage = (message, senderId, reveiverId, read) => new Promise((res, rejact) => {
    const query = `call sql11462731.insert_messages(${senderId}, ${reveiverId},'${message}','${read}');`

    db_connection.query(query, (err, results) => {
        if (err) console.error(err);
        res(results);

    });
})
const updateMessage = (myId, senderId) => new Promise((res, rejact) => {
    const query = `update messages set p_read = 'Y' where receiver_id = ${myId} and sender_id = ${senderId}`;

    db_connection.query(query, (err, results) => {
        if (err) console.error(err);
        res(results);

    });
})

const findAllUser = (search) => new Promise((res, rejact) => {
    const query = `
    select * from users where first_name like '%${search}%' or last_name = '%${search}%'
    `
    db_connection.query(query, (err, results) => {
        if (err) console.error(err);
        res(results);

    });
})

module.exports = { gitListoFfriends, insertMessage, updateMessage,findAllUser };
