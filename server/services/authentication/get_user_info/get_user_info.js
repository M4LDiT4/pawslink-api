const UserModel = require("../../../models").UserModel;
const ObjectId = require("mongoose").Types.ObjectId;
module.exports = async (userId, email) => {
   const user = await UserModel.find({
      _id: new ObjectId(userId),
      email: email
   });
   return user;
}