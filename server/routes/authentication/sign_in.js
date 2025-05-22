`use strict`

/**
 * @module SignIn
 * @description endpoint of user sign in
 * @author Jonathan Calugas
 *
 * @param {Object} router -> Express router instance
 */

const controller = require("../../controllers/authentication").signIn;

module.exports = (router) => {
   router.post('/sign-in', controller);
};
