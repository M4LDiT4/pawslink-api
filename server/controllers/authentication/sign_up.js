`use strict`;

const requestValidator = require('../../utils/validators/request_validators/sign_up');
const signUp = require('../../services/authentication/sign_up');

module.exports = async (req, res, next) => {
   try {
      if (!req.body || Object.keys(req.body).length == 0) {
         req.responseData = {
            statusCode: 400,
            body: {
               error: 'Missing request body',
            },
         };
         return next();
      }
      const body = req.body;
      const { error, value } = requestValidator(body);
      if (error) {
         req.responseData = {
            statusCode: 400,
            body: { error: error.details[0].message },
         };
         return next();
      }

      const response = await signUp({
         query: value,
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
