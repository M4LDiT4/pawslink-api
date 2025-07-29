const validator = require("../../utils/validators/request_validators/add_event");
const addEventHandler = require("../../services/events/add_event");
module.exports = async (req, res, next) => {
   try{
      if(!req.body || Object.keys(req.body).length === 0){
         req.responseData = {
            statusCode: 400, 
            body: {
               error: 'No request body provided',
            }
         }
         return next();
      }

      if(!req.user || req.user === null){
         req.responseData = {
            statusCode: 401,
            body: {
               error: 'Invalid User Detected'
            }
         }
         return next();
      }

      console.log(`user is ${JSON.stringify(req.user)}`);
      const body = req.body;

      const {error, value} = validator(body);

      if(error){
         req.responseData = {
            statusCode: 400,
            body: {
               error: error.details[0].message, //you can return a whole list of this
            }
         }
         return next();
      }

      const response = await addEventHandler({
         eventData: value,
         user: req.user,
         imgFile: req.file
      });

      req.responseData = {
         statusCode: 200,
         body: response,
      }

      return next();
   }catch(err){
      req.responseData = {
         statusCode: 404,
         body: {
            error: err.message || err
         }
      }

      return next();
   }
}