`use strict`
const getAnimal = require('../../services/animal_database/get_animal');
const AnimalModel = require("../../models").AnimalModel;
const buildSortOptions = require("../../utils/query/sort_options_builder");
const buildFilterOptions = require("../../utils/query/query_builder");


module.exports = async (req, res, next) => {
   //post: return appropriate response (result or error)
   try {
      console.log(req.query);
      const { id } = req.params;
      const { filterConfigs } = req.query;

      //  Prevent conflicting use of `id` and `search`
      if (id && filterConfigs) {
         throw new Error(`'id' and 'filterConfigs' cannot be used in the same request`);
      }

      // Get pagination/sorting from query string
      let { page, limit, sortBy, sortOrder } = req.query;

      //note: filter configs must be a list with keys, field, condition and value

      const sortOptions = buildSortOptions(AnimalModel, {sortBy, sortOrder});

      const filters = buildFilterOptions(AnimalModel, filterConfigs);

      const response = await getAnimal({
         page,
         limit,
         sortOptions,
         filters,
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
