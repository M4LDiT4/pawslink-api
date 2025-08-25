const AnimalModel = require("../../../models").AnimalModel;

module.exports = async (lastUpdateDate) => {
   const query ={}

   if(lastUpdateDate){
      query.updatedAt = {$gt: new Date(lastUpdateDate)}
   }
   const count = await AnimalModel.countDocuments(query);

   return count;

}