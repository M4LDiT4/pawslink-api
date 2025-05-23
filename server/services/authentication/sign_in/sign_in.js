'use-strict';

const UserModel = require('../../../models').UserModel;
const RefreshToken = require('../../../models').RefreshToken;
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const encryptionService = require('../../../utils/encryption');
const tokenGenerator = require('../../../utils/tokenGeneration');
const dateUtil = require('../../../utils/date');

module.exports = async ({ email, password }) => {
   const session = await mongoose.startSession();
   try {
      session.startTransaction();

      const existingUser = await UserModel.findOne({ email }).session(session);
      if (!existingUser) throw new Error(`User not found`);

      if (!encryptionService.compare(password, existingUser.password)) {
         throw new Error(`User credentials do not match`);
      }

      const payload = {
         userId: existingUser._id,
         email: existingUser.email,
      };

      const accessToken = tokenGenerator.generateAccessKey(payload, '15m');
      const refreshToken = tokenGenerator.generateRefreshKey(payload, '7d');

      const expiresAt = dateUtil.addDays(7);
      const newRefToken = new RefreshToken({
         userId: existingUser._id,
         refreshToken,
         expiresAt,
      });

      await newRefToken.save({ session });

      await session.commitTransaction();

      return { accessToken, refreshToken };
   } catch (e) {
      if(session.inTransaction){
         await session.abortTransaction();
      }
      throw new Error(e.message);
   } finally {
      session.endSession();
   }
};
