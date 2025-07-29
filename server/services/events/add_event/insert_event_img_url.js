const EventModel = require("../../../models").EventModel;
/**
 * @module insert_event_img_url
 * @description updates the imgUrl field of the EventModel with the url of the newly uploaded img
 * @param {*} session mongoose session where this write operation belongs to
 * @param {ObjectId} id id of the EventModel document
 * @param {String} imgUrl url of the event image
 * @returns {Promise<EventModel>} updated EventModel instance 
 */
module.exports = async (session, id, imgUrl) => {
   //pre: session is valid and is started
   //pre: document where id belongs to exists
   //pre: imgUrl points to actual url of the uploaded image
   //post: update EventModel instance identified by the id
   const newEvent = await EventModel.findByIdAndUpdate(
      id,
      {
         imgUrl: imgUrl,
      },
      {
         new: true,
         runValidators: true,
         session
      }
   )
   return newEvent;
}