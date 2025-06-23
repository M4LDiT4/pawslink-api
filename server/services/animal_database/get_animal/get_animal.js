const AnimalModel = require('../../../models').AnimalModel;

module.exports = async ({ page, limit, sort, queryOptions }) => {
   const skip = (page - 1) * limit;

   const docCount = await AnimalModel.countDocument(queryOptions);

   const response = await AnimalModel.find(queryOptions)
      .sort(sort)
      .skip(skip) //number of documents to skip
      .limit(limit);
   return {
      list: response,
      hasPrev: page > 1,
      hasNext: page * limit < docCount,
   };
};
