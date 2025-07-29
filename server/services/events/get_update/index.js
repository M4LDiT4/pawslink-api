const getUpdate = require("./get_update");
/**
 * @module get_update
 * @author Jonathan Calugas
 * @param {Object} param0 - parameter object
 * @param {Date} param0.timeStamp -date reference for filtering the event document
 * @returns {Promise<{
 *    data: List<EventModel>
 * }>} 
 */
module.exports = async ({
   timeStamp
}) => {
   const response = await getUpdate(timeStamp);
   return {
      data: response
   }
}