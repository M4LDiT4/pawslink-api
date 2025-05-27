`use strict`;

const TokenModel = require('../../../models/index').RefreshToken;

module.exports = async (refreshToken, session) => {
   const token = await TokenModel.findOneAndDelete({
      refreshToken: refreshToken,
   }).session(session);
   return token;
};
