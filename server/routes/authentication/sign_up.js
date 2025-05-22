`use strict`
/**
 * @module SignUp
 * @description Endpoint for user sign up
 * @author Jonathan Calugas
 *
 * @param {Object} router -> Express router instance
 */

const signUpController = require("../../controllers/sign_up_controller");

module.exports = (router) => {
   router.post('/sign-up', signUpController.controller);
};
