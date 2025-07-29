const getEventUpdates = require("../../services/events/get_update");
module.exports = async (req, res, next) => {
   try{
      const {timeStamp} = req.query;

      //query the updates via timestamp
      //if there is no provided timestamp, return error to the client
      if(!timeStamp){
         req.responseData = {
            statusCode: 400,
            body: {
               error: 'Get Event Update request failed due to failure to provide timestamp'
            }
         }
         return next();
      }

      const response = await await getEventUpdates({timeStamp: timeStamp});

      req.responseData = {
         statusCode: 200, 
         body: response
      }
      return next();
   }catch(err){
      console.log(`Failed to get the updates for events: ${err}`);
      req.responseData = {
         statusCode: 400,
         body: {
            error: err?.message || err
         }
      }
      return next();
   }
}