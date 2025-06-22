const getUserInfo = require("./get_user_info");

module.exports = async (user) => {  
   return await getUserInfo(user.userId, user.email); 
}