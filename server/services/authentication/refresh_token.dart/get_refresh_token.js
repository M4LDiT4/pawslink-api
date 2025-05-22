const TokenModel = require("../../../models/index").RefreshToken;

module.exports = async (refreshToken, session) => {
    const tokeInstance = await TokenModel.findOne({
        refreshToken : refreshToken
    }).session(session);
    return tokeInstance;
}