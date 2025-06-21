const tokenGenerator = require('../../utils/tokenGeneration');
const getUserInfo = require("../../services/authentication/get_user_info");
module.exports = async (req, res, next) => {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

   if (!token) return res.sendStatus(401);

   tokenGenerator.verifyAccessToken(token, async (err, user) => {
      if (err) return res.sendStatus(403);

      const userInfo = await getUserInfo(user);
      if (!userInfo || userInfo.length === 0) return res.sendStatus(403);


      if(!userExists) return res.sendStatus(403)
      
      req.user = user;

      return next();
   });
};
