`use strict`;
const signIn = require('../../services/authentication/sign_in');
module.exports = async (req, res, next) => {
   try {
      if (!req.body || Object.keys(req.body).length === 0) {
         req.responseData = {
            statusCode: 400,
            body: { error: 'No request body found' },
         };
         return next();
      }
      const body = req.body;
      if (!('email' in body || 'password' in body)) {
         req.responseData = {
            statusCode: 400,
            body: { error: `Missing required fields` },
         };
         return next();
      }

      const response = await signIn({
         query: {
            email: body.email,
            password: body.password,
         },
      });

      req.responseData = {
         statusCode: 200,
         body: response,
      };
      return next();
   } catch (err) {
      req.responseData = {
         statusCode: err.statusCode || 404,
         body: { error: err.message || err },
      };
      return next();
   }
};
