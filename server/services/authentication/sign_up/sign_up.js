`use strict`

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserModel = require('../../../models').UserModel;
const RefreshToken = require("../../../models").RefreshToken;
const encryption = require("../../../utils/encryption");
const tokenGenerator = require("../../../utils/tokenGeneration");
const dateUtil = require("../../../utils/date");

module.exports = async({
    username,
    email,
    password,
}) => {
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        
        const hashedPassword = await encryption.hash(password);
        const user = new UserModel({
            username: username,
            email: email,
            password: hashedPassword,
        })

        const saveUser = await user.save({session});

        const payload = {
            userId: saveUser._id,
            email: saveUser.email,
        };

        const accessToken = tokenGenerator.generateAccessKey(payload, '15m');
        const refreshToken = tokenGenerator.generateRefreshKey(payload, '7d');

        const expiresAt = dateUtil.addDays(7);
        const newRefToken = new RefreshToken({
            userId: saveUser._id,
            refreshToken,
            expiresAt,
        });
        await newRefToken.save({session});

        await session.commitTransaction();

        return {accessToken, refreshToken}
    } catch (err) {
        await session.abortTransaction();
        throw new Error(err.message || err);
    }finally{
        session.endSession();
    }
}