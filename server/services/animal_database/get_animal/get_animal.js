const AnimalModel = require('../../../models').AnimalModel;
/**
 * @module get_animal
 * @author Jonathan Calugas
 * @description -mongoose operation to find the desired document given the query configuration, offset and limit
 * @param {Object} param0 - parameter object
 * @param {number} param0.page - client provided index of page to populate
 * @param {number} param0.limit - maximum number of documents to return from a single request
 * @param {Object} param0.sort - object that determines the sorting order and what field to be used as basis for sorting
 * @param {object} param0.queryOptions - filter configuration
 * @returns {Promise<{
 *    list: List<AnimalModel>,
 *    hasPrev: boolean,
 *    hasNext: boolean
 * }>}
 */
module.exports = async ({ page, limit, sort, queryOptions }) => {
   
   const skip = (page - 1) * limit;

   const docCount = await AnimalModel.countDocuments(queryOptions);

   const response = await AnimalModel.find(queryOptions)
      .sort(sort)
      .skip(skip) //number of documents to skip
      .limit(limit)
      .populate("vaccinationRecords")
      .populate("medicationRecords");
   return {
      list: response,
      hasPrev: page > 1,
      hasNext: page * limit < docCount,
   };
};
