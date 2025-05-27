const validator = require("../../utils/validators/request_validators/add_animal");
module.exports = async (req, res, next) =>{
   try{
      if(!req.body || Object.keys(req.body).length === 0){
         req.responseData = { 
            statusCode: 400,
            body: {
               error: 'No request body provided'
            }
         }
         return next();
      }
      const body = req.body;
      const {error, value} = validator(body);
      if(error){
         req.responseData = {
            statusCode: 400,
            body: {
               error: error.details[0].message
            }
         }
         return next(); 
      }
   }catch (err){
      req.responseData = {
         statusCode: 404,
         body: {
            error: err.message || err
         }
      }
      return next();
   }
}