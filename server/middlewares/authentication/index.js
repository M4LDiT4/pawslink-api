const tokenGenerator = require('../../utils/tokenGeneration');
const getUserInfo = require('../../services/authentication/get_user_info');

module.exports = async (req, res, next) => {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

   if (!token) {
      return res.status(401).json({ error: 'No token provided' });
   }

   tokenGenerator.verifyAccessToken(token, async (err, value) => {
      if (err) {
         console.log(`Token error:`, err);
         return res.status(401).json({ error: 'Invalid or expired token' });
      }

      const userInfo = await getUserInfo(value);
      if (!userInfo || userInfo.length === 0) {
         return res.status(401).json({ error: 'User not found' });
      }

      req.user = value;
      return next();
   });
};
