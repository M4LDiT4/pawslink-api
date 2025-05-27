`use strict`;
const signUp = require('./sign_up');

module.exports = async ({ query }) => {
   const tokens = await signUp({
      username: query.username,
      email: query.email,
      password: query.password,
   });

   return {
      data: tokens,
      query,
   };
};
