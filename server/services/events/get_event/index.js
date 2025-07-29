const getEventList = require("./get_event");
/**
 * @module get_event
 * @author Jonathan Calugas
 * @param {Object} param0 - parameter object
 * @param {number} param0.page - current page defined by the request pagination. Defaults to 1
 * @param {number} param0.limit - maximum number of documents that can be returned for a single request
 * @param {String} param0.sortOrder - order of sortin, limited to `asc` and `desc`
 * @param {String} param0.sortBy - field basis for sorting
 * @param {Object} param0.queryOptions - options for filtering the documents to be returned
 * @returns {Promise<{
 *    data: {
 *       list: List<EventModel>
 *       hasPrev: boolean,
 *       hasNext: boolean
 *    }
 * }>}
 */
module.exports = async ({
   page = 1,
   limit = 100,
   sortOrder = 'desc',
   sortBy = 'createdAt',
   queryOptions = {}
}) => {
   const sortDirection = sortOrder === 'asc'? 1 : -1;
   const sort = {}
   sort[sortBy] = sortDirection; //create an object for sorting 
   
   const response = await getEventList({
      page: page,
      limit: limit,
      sort: sort,
      queryOptions: queryOptions
   })

   return {
      data: response
   }
}