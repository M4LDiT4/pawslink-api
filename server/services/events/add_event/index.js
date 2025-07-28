const mongoose = require("mongoose");
const addEvent = require("./add_event");
const insertImgUrl = require("./insert_event_img_url");
const cloudinaryService = require("../../../services/cloudinary");
const insertActLog = require("../../activity_log")
module.exports = async({eventData, user, imgFile}) => {
   const session = await mongoose.startSession();
   try{
      console.log(`Event data is: ${eventData}`);
      session.startTransaction();
      let newEvent = await addEvent(session, eventData);

      if(imgFile && imgFile.buffer){
         const imgUrl = await cloudinaryService.uploadImageAndGetUrl(
            imgFile.buffer,
            newEvent._id.toString(),
            'event_images'
         );

         const updatedEvent = await insertImgUrl(
            session,
            newEvent._id,
            imgUrl
         );
      }

      const actLogData = {
         userId: user.userId,
         action: 'CREATE',
         collectionName: 'Event',
         documentId: newEvent._id
      }

      await insertActLog(actLogData);

      await session.commitTransaction();

      return newEvent;
   }catch(err){
      if(session.inTransaction){
         await session.abortTransaction();
      }
      throw err;
   } finally{
      session.endSession
   }
}