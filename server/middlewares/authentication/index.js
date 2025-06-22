const tokenGenerator = require('../../utils/tokenGeneration');
const getUserInfo = require("../../services/authentication/get_user_info");
module.exports = async (req, res, next) => {
   const authHeader = req.headers['authorization'];
   console.log(`Authheaders: ${req.headers}`);
   const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

   if (!token) return res.sendStatus(401);

   tokenGenerator.verifyAccessToken(token, async (err, value) => {
      console.log(`error: ${err}, value: ${value}`)
      if (err) return res.sendStatus(401);

      const userInfo = await getUserInfo(value);
      if (!userInfo || userInfo.length === 0) return res.sendStatus(401);
      
      req.user = value;

      return next();
   });
};
