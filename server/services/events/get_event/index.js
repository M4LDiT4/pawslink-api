
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
   
}