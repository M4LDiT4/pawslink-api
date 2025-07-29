const getAnimalList = require("./get_animal");
/**
 * @module get_animal
 * @author Jonathan Calugas
 * @description - retrieves Event documents that matches the provided search queries and in the defined sort order
 * @param {Object} param0 
 * @param {number} param0.page - the number of page to populate
 * @param {number} param0.limit - maximum number of documents to return per request
 * @param {String} param0.sortOrder - the order sorting for the returned Event documents
 * @param {String} param0.sortBy - reference field for sorting
 * @param {Object} param0.queryOptions - filter configuration to determine the event documents to retur  
 * @returns {Promise<{
 *    data: {
 *       list: List<AnimalModel>,
 *       hasPrev: boolean,
 *       hasNext: boolean
 *    }
 * }>}
 */
module.exports = async({
   page = 1,
   limit = 100,
   sortOrder = 'desc',
   sortBy = 'createdAt', //this refers to a field in the mongodb model
   queryOptions = {}
}) => {

   const sortDirection = sortOrder === 'asc'? 1 : -1;
   const sort = {}
   sort[sortBy] = sortDirection;
   const response = await getAnimalList({
      page: page,
      limit: limit,
      sort: sort,
      queryOptions: queryOptions
   });

   return {
      data: response
   };
}