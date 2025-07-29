const getEventList = require("./get_event");

module.exports = async ({
   page = 1,
   limit = 100,
   sortOrder = 'desc',
   sortBy = 'createdAt',
   queryOptions = {}
}) => {
   const sortDirection = sortOrder === 'asc'? 1 : -1;
   const sort = {}
   sort[sortBy] = sortDirection;
   
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