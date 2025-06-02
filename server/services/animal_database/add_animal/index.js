

const mongoose = require("mongoose");

const addAnimal = require("./add_animal");
const cloudinaryService = require("../../../services/cloudinary");
cloudinaryService.init();
const updateImgString = require('./insert_img_url');
module.exports = async ({
   animalData,
   imgFile
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