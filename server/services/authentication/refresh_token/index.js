`use strict`;

const mongoose = require('mongoose');

const getRefreshToken = require('./get_refresh_token');
const deleteRefreshToken = require('./delete_token');
const tokenGenerator = require('../../../utils/tokenGeneration');
const saveToken = require('./save_token');

module.exports = async ({ query }) => {
   const session = await mongoose.startSession();
   try {
      session.startTransaction();
      const refreshToken = query.refreshToken;
      const instance = await getRefreshToken(refreshToken, session);
      if (!instance) {
         throw new Error(`Refresh Token not found`);
      }
      const payload = tokenGenerator.verifyRefreshToken(refreshToken);

      const deletedToken = await deleteRefreshToken(refreshToken, session);

      const user = {
         userId: payload.userId,
         email: payload.email,
      };

      const accessToken = tokenGenerator.generateAccessKey(user, '15m');
      const newRefToken = tokenGenerator.getRefreshToken(user, '7d');

      await saveToken(newRefToken, deletedToken.userId, session);

      await session.commitTransaction();
      return {
         data: {
            accessToken,
            refreshToken,
         },
         query: query,
      };
   } catch (err) {
      if(session.inTransaction){
         await session.abortTransaction();
      }
      throw new Error(err.message || err);
   } finally {
      session.endSession();
   }
};
