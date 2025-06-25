const getAnimal = require('../../services/animal_database/get_animal');
const generateSearchQuery = require("../../utils/helpers/build_search_query");
const AnimalModel = require("../../models").AnimalModel;


module.exports = async (req, res, next) => {
   try {
      const { id } = req.params;
      const { search, searchBy } = req.query;

      //  Prevent conflicting use of `id` and `search`
      if (id && search) {
         throw new Error(`'id' and 'search' cannot be used in the same request`);
      }

      const queryOptions = generateSearchQuery(AnimalModel, search, searchBy);

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
