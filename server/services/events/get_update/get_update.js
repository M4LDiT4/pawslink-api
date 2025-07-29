const EventModel = require("../../../models").EventMode;
/**
 * @module get_update
 * @author Jonathan Calugas
 * @param {Date} timeStamp - date as reference for the documents to return 
 * @returns {Promise<
 *    data: List<EventModel>
 * >}
 */
module.exports = async(timeStamp) => {
   // pre: timestamp is a valid date
   // post: retreives the updates to the event collection after or during the given timestamp
   const result =  await EventMode.find(
      {
         createdAt: {$gte: timeStamp}
      }
   )
   return result;
}