`use strict`

/**
 * @module SignIn
 * @description endpoint of user sign in
 * @author Jonathan Calugas
 *
 * @param {Object} router -> Express router instance
 */

const signIn = require("../../controllers/sign_in_controller")

module.exports = (router) => {
   router.post('/sign-in', signIn.controller);
};
