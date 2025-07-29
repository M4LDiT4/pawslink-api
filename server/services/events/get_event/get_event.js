const EventModel = require("../../../models").EventModel;

module.exports = async({
   page, limit, sort, queryOptions
}) => {
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