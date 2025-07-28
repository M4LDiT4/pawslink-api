const EventModel = require("../../../models").EventModel;

module.exports = async (session, IdleDeadline, id, imgUrl) => {
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