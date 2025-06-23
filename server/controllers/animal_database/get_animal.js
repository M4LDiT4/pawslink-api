const getAnimal = require('../../services/animal_database/get_animal');

module.exports = async (req, res, next) => {
   try {
      const queryOptions = {};

      // Check for path param :id
      if (req.params.id) {
         queryOptions._id = req.params.id;
      }

      // Get pagination/sorting from query string
      let { page, limit, sortBy, sortOrder } = req.query;

      // Validate sortOrder
      if (sortOrder && sortOrder !== 'asc' && sortOrder !== 'desc') {
         console.log(
            `sortOrder does not follow the convention. Expected 'asc' or 'desc', found '${sortOrder}'`
         );
         sortOrder = undefined;
      }

      const response = await getAnimal({
         page,
         limit,
         sortBy,
         sortOrder,
         queryOptions,
      });

      req.responseData = {
         statusCode: 200,
         body: response,
      };
      return next();
   } catch (err) {
      console.error('Error fetching animal data:', err);
      req.responseData = {
         statusCode: 400,
         body: {
            error: 'Error fetching animal data',
            details: err?.message || err,
         },
      };
      return next();
   }
};
