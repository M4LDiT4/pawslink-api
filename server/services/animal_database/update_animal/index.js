`use strict`
const mongoose = require("mongoose");
const updateAnimal = require("./update_animal");
const cloudinaryService = require("../../../services/cloudinary");
const updateImgString = require("../add_animal/insert_img_url");
const insertActLog = require("../../activity_log");

const AnimalModel = require("../../../models").AnimalModel;
module.exports = async ({animalData, id, user, imgFile}) => {
   const session = await mongoose.startSession();
   try{
      session.startTransaction();
      let updatedAnimal = await updateAnimal(session, id, animalData);
      if(imgFile && imgFile.buffer){
         const imgUrl = await cloudinaryService.uploadImageAndGetUrl(
            imgFile.buffer,
            id,
            'animal_profiles'
         );
         updatedAnimal = await updateImgString(session, id, imgUrl);
      }

      const actLogData = {
         userId: user.useId,
         action: 'UPDATE',
         collectionName: 'Animal',
         documentId: updateAnimal._id
      }

      await insertActLog(session, actLogData);

      await session.commitTransaction();
      
      const animalWithVirtuals = await AnimalModel.findById(updatedAnimal._id)
      .populate("vaccinationRecords")
      .populate("medicationRecords")
      .session(session);

      return animalWithVirtuals;
   }catch(err){
      console.log(`Failed in update animal service: ${err}`);
      if(session.inTransaction){
         await session.abortTransaction();
      }
      throw err;
   } finally{
      session.endSession();
   }
}