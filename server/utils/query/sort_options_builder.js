const fieldValidityChecker = require("../../utils/query/field_validity_checker");
module.exports = (Model, sortOptions) => {
   const {sortBy, sortOrder} = sortOptions;
   if(!sortBy || !sortOrder){
      console.warn("Cannot create sort options without sortBy or sortOrder")
      return;
   }

   if(sortOrder !== 'asc' && sortOrder !== 'desc' ){
      console.warn(`Expects 'asc' or 'desc', give: ${sortOrder}`);
      return;
   }

   if(!fieldValidityChecker(Model, sortBy)){
      console.warn(`Field ${sortBy} is not a valid field of model ${Model.modelName}`)
      return;
   }

   return {
      sortBy: sortOrder === 'asc'? 1: -1
   }
}