`use strict`;

const TokenModel = require('../../../models/index').RefreshToken;

module.exports = async (refreshToken, session) => {
   const token = await TokenModel.deleteOne({
      refreshToken: refreshToken,
   }).session(session);
   return token;
};
