`use strict`
const getAnimal = require('../../services/animal_database/get_animal');
const AnimalModel = require("../../models").AnimalModel;
const buildSortOptions = require("../../utils/query/sort_options_builder");
const buildFilterOptions = require("../../utils/query/query_builder");


/**
 * Middleware to process animal search requests.
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.params - URL route parameters.
 * @param {string} req.params.id - ID of the animal to search for.
 * @param {Object} req.query - URL query parameters.
 * @param {Array<
 *    {
 *       field: String,
 *       condition: String
 *       value: any
 *    }
 * >} req.query.filterConfigs list of filter configuration
 * @param {int} req.query.limit maximum number of documents to return
 * @param {int} req.query.page the current page number in pagination
 * @param {String} req.query.sortBy field of the model that will be used for sorting
 * @param {String} req.query.sortOrder the order of sorting, limited to 'asc' and 'desc'
 * @param {Object} res - Express response object.
 * @param {Function} next - Callback to pass control to the next middleware.
 * @returns {void} - Calls the next middleware without returning a value.
 */

module.exports = async (req, res, next) => {
   //post: return appropriate response (result or error)
   try {
      const { id } = req.params;
      const { filterConfigs } = req.query;

      //  Prevent conflicting use of `id` and `search`
      if (id && filterConfigs) {
         throw new Error(`'id' and 'filterConfigs' cannot be used in the same request`);
      }

      // Get pagination/sorting from query string
      let { page, limit, sortBy, sortOrder } = req.query;

      const sortOptions = buildSortOptions(AnimalModel, {sortBy, sortOrder});

      //note: filter configs must be a list with keys, field, condition and value
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
