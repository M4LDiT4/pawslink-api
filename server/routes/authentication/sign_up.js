`use strict`;
/**
 * @module SignUp
 * @description Endpoint for user sign up
 * @author Jonathan Calugas
 *
 * @param {Object} router -> Express router instance
 */

const controller = require('../../controllers/authentication').signUp;

module.exports = (router) => {
   router.post('/sign-up', controller);
};
