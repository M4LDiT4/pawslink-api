

const mongoose = require("mongoose");
const addAnimal = require("./add_animal");
const cloudinaryService = require("../../../services/cloudinary");
cloudinaryService.init();
const updateImgString = require('./insert_img_url');
const insertActLog = require("../../activity_log");
const { date } = require("joi");
module.exports = async ({
   animalData,
   user,
   imgFile,
})=>{
   const session = await mongoose.startSession();
   try{
      console.log(animalData);
      session.startTransaction();
      let newAnimal = await addAnimal(session, animalData);

      if(imgFile && imgFile.buffer){
         const imgUrl = await cloudinaryService.uploadImageAndGetUrl(imgFile.buffer, newAnimal._id.toString(), 'animal_profiles');
         const updatedAnimal = await updateImgString(session, newAnimal._id, imgUrl);
         newAnimal = updatedAnimal
      }

      const actLogData = {
         userId: user.userId,
         action: "CREATE",
         collectionName: "Animal",
         documentId: newAnimal._id
      };

      await insertActLog(session, actLogData);

      await session.commitTransaction();
      
      return newAnimal;
   }catch (err){
      if(session.inTransaction){
         await session.abortTransaction();
      }
      throw(err);
   }finally{
      session.endSession();
   }
}