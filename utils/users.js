const users = [];
function userJoin(id, user_id) {
    const user = {id,  user_id};

    users.push(user);

    return user;
}
function userLeave(id){
    const index = users.findIndex(user => user.id === id);

    if(index !== -1){
        return users.splice(index,1)[0];
    }
}
function getUser(id){
    return users.filter(user => user.user_id === String(id));
}
function getOnlineUsers(){
     return users
    // console.log(users)
}
module.exports = {
    userJoin,
    userLeave,
    getUser,
    getOnlineUsers
    
}