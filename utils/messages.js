
function messages(message,username){
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
const returnMessage = {
    "time": time,
    "username":username,
    "message": message
}
return returnMessage;
}


module.exports = {messages};
