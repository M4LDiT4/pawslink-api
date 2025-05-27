`use strict`;

const TokenModel = require('../../../models/index').RefreshToken;
const dateUtil = require('../../../utils/date');

module.exports = async (token, userId, session) => {
   const newToken = new TokenModel({
      userId: userId,
      refreshToken: token,
      expiresAt: dateUtil.addDays(15),
   });

   await newToken.save({ session });
};
