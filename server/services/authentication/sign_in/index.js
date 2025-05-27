`use strict`;

/**
 * @module SignIn
 * @description a module for the sign in logic
 * @returns {Object} response -> returns an asyncResposne with the given query
 */
const signIn = require('./sign_in');

module.exports = async ({ query }) => {
   const tokens = await signIn({
      email: query.email,
      password: query.password,
   });
   return {
      data: tokens,
      query,
   };
};
