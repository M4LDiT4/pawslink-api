const tokenGenerator = require ("../../utils/tokenGeneration")

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"
  
    if (!token) return res.sendStatus(401); 

    tokenGenerator.verifyAccessToken(token, (err, user) => {
        if(err) return res.sendStatus(403);

        req.user = user;

        return next();
    });
}