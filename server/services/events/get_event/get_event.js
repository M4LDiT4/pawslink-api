const EventModel = require("../../../models").EventModel;
/**
 * @module get_event
 * @author Jonathan Calugas
 * @param {Object} param0 - parameter object
 * @param {number} param0.page - current page defined by the request pagination. Defaults to 1
 * @param {number} param0.limit - maximum number of documents that can be returned for a single request
 * @param {Object} param0.sort - sort option for the resulting documents
 * @param {number} param0.sort.sortByField - sortByField is the field to sort, value is -1 or 1
 * @param {Object} param0.queryOptions - options for filtering the documents to be returned
 * @returns {Promise<{
 *    list: List<EventModel>
 *    hasPrev: boolean,
 *    hasNext: boolean
 * }>}
 */
module.exports = async({
   page, limit, sort, queryOptions
}) => {
   const skip = (page-1) * limit;
   const docCount = await EventModel.countDocuments(queryOptions);

   const response = await EventModel.find(queryOptions)
      .sort(sort)
      .skip(skip)
      .limit(limit);
      
   return {
      list: response,
      hasPrev: page> 1,
      hasNext: page * limit < docCount
   } 
}