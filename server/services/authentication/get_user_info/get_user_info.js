const UserModel = require("../../../models").UserModel;
const types = require("mongoose").ObjectId;
module.exports = async (userId, email) => {
   const user = await UserModel.find({
      _id: new types.ObjectId(userId),
      email: email
   });
   return user;
}