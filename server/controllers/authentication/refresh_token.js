const refreshToken = require('../../services/authentication/refresh_token');

module.exports = async (req, res, next) => {
   try {
      if (!req.body || Object.keys(req.body).length === 0) {
         req.responseData = {
            statusCode: 403,
            body: {
               error: `Operation not Authorized`,
            },
         };
         return next();
      }
      const body = req.body;

      if ((!'refreshToken') in body) {
         req.responseData = {
            statusCode: 403,
            body: {
               error: `Operation not Authorized`,
            },
         };
         return next();
      }

      const response = await refreshToken({
         query: { refreshToken: body.refreshToken },
      });

      req.responseData = {
         statusCode: 200,
         body: response,
      };

      return next();
   } catch (err) {
      req.responseData = {
         statusCode: 404,
         body: {
            error: err.message || err,
         },
      };
      return next();
   }
};
