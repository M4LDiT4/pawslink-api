`use strict`;

/**
 *
 * @module LandingEndpoint
 * @description This module initializes the landing endpoint for the API.
 * @author Jonathan Calugas
 *
 * @param {object} router - Express router instance
 */

module.exports = (router) => {
   router.get(`/`, (req, res, next) => {
      req.responseData = {
         statusCode: 200,
         body: {
            message: `Welcome to the API!`,
            version: `1.0.0`,
         },
      };
      return next();
   });
};
