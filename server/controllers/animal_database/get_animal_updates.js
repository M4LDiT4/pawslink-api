`use strict`
const getUpdatesHandler = require("../../services/animal_database/get_update");
module.exports = async (req, res, next) => {
   try{
      const updates = await getUpdatesHandler(req.params.lastUpdateTime);

      req.responseData = {
         statusCode: 200,
         body: {
            data: updates
         }
      }
      return next();
   }catch(err){
      console.log(`Error in GET_ANIMAL_UPDATES ${err}`);
      req.responseData = {
         statusCode: 400,
         body: {
            error: `Error fetching animal data ${err.message || err}`
         }
      }
      return next();
   }
}