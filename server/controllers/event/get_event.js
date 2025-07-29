const generateSearchQuery = require("../../utils/helpers/build_search_query");
const EventModel = require("../../models").EventModel;
const getEvent = require("./get_event");
module.exports = async(req, res, next) => {
   try{
      const {id} = req.params;
      const {search, searchBy} = req.query;

      //prevent conflicting use if`id` and `search`
      if(id && searchBy){
         throw new Error('`id` and `search` cannot be used in the same request');
      }

      const queryOptions = generateSearchQuery(EventModel, search, searchBy);

      //get pagination/sorting from query string
      let {page, limit, sortBy, sortOrder} = req.query;

      if(sortOrder && sortOrder !== 'asc' && sortOrder !== 'desc'){
         console.log(`sortOrder does not follow the convention. Expected \`asc\` or \`desc\`` );
         sortOrder = undefined; //reset the sort order to default
      }

      const response = await getEvent({
         page,
         limit,
         sortBy,
         sortOrder,
         queryOptions,
      });

      req.responseData = {
         statusCode: 200,
         body: response,
      }
      
      return next();
   }catch(err){
      console.log(`Error fetching animal data: ${err}`);
      req.responseData = {
         statusCode: 400,
         body: {
            error: `Error fetching animal data`,
            details: err?.message || err
         }
      }
   }
}