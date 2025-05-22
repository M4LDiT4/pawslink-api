`use strict`

const TokenModel = require("../../../models/index").RefreshToken;
const dateUtil = require("../../../utils/date");

module.exports = async (token, userId, session) => {
    const token = new TokenModel({
        userId: userId,
        refreshToke: token,
        expiresAt: dateUtil.addDays(15),
    })

    await token.save({session});
}