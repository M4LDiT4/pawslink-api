const checkUpdatesHandler = require("../../services/animal_database/check-updates");

module.exports = async (req, res, next) => {
   try{
      const updateCount = await checkUpdatesHandler(req.params.lastUpdateTime);

      req.responseData = {
         statusCode: 200,
         body: {
            data: updateCount
         }
      }

      return next();
   }catch(err){
      console.log(`Error occured in check updates controller: ${err}`);
      req.responseData = {
         statusCode: 400,
         body: {
            error: 'Unexpected error occured while checking for updates'
         }
      }
   }
}