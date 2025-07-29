const mongoose = require("mongoose");
const addEvent = require("./add_event");
const insertImgUrl = require("./insert_event_img_url");
const cloudinaryService = require("../../../services/cloudinary");
const insertActLog = require("../../activity_log")
/**
 * @module add_event
 * @author Jonathan Calugas
 * @description Adds an event document to MongoDB.
 * 
 * @param {Object} param0 - The parameters object.
 * @param {Object} param0.eventData - Meta data of the event document to be saved.
 * @param {string} param0.eventData.title - Title of the event.
 * @param {Date} param0.eventData.date - Date of the event.
 * @param {number} param0.eventData.time - Time of the event (e.g., timestamp or hour).
 * @param {string} param0.eventData.description - Description of the event.
 * 
 * @param {Object} param0.user - User information derived from the provided authorization token.
 * @param {string} param0.user.userId - ID of the user adding the event.
 * 
 * @param {Object} param0.imgFile - Metadata of the uploaded image.
 * @param {Buffer} param0.imgFile.buffer - Raw binary data of the event image.
 * 
 * @returns {Promise<EventModel>} The created event document.
 */
module.exports = async({eventData, user, imgFile}) => {
   const session = await mongoose.startSession();
   try{
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

         newEvent = updatedEvent;
      }
      console.log(JSON.stringify(user));
      const actLogData = {
         userId: user.UserId,
         action: 'CREATE',
         collectionName: 'Event',
         documentId: newEvent._id
      }

      await insertActLog(session, actLogData);

      await session.commitTransaction();

      return newEvent;
   }catch(err){
      if(session.inTransaction){
         await session.abortTransaction();
      }
      throw err;
   } finally{
      session.endSession();
   }
}