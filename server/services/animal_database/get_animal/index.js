const getAnimalList = require("./get_animal");
//implement pagination
//implement sort
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