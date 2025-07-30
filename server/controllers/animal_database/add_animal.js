const validator = require('../../utils/validators/request_validators/add_animal');
const addAnimalHandler = require('../../services/animal_database/add_animal');
module.exports = async (req, res, next) => {
   try {
      if (!req.body || Object.keys(req.body).length === 0) {
         req.responseData = {
            statusCode: 400,
            body: {
               error: 'No request body provided',
            },
         };
         return next();
      }

      if (!req.user || req.user == null) {
         req.responseData = {
            statusCode: 401,
            body: {
               error: 'Invalid User Detected',
            },
         };
         return next();
      }

      console.log(`user is ${JSON.stringify(req.user)}`);
      const body = req.body;
      //parse to json the fields with list or json values
      body.coatColor = JSON.parse(body.coatColor);
      body.notes = JSON.parse(body.notes);
      body.traitsAndPersonality = JSON.parse(body.traitsAndPersonality);
      body.vaxHistory = JSON.parse(body.vaxHistory);
      body.medHistory = JSON.parse(body.medHistory);

      const { error, value } = validator(body);
      if (error) {
         req.responseData = {
            statusCode: 400,
            body: {
               error: error.details[0].message,
            },
         };
         return next();
      }

      const response = await addAnimalHandler({
         animalData: value,
         user: req.user,
         imgFile: req.file,
      });

      req.responseData = {
         statusCode: 200,
         body: response,
      };

      return next();
   } catch (err) {
      console.log(`Error in add animal ${err}`);
      req.responseData = {
         statusCode: 404,
         body: {
            error: err.message || err,
         },
      };
      return next();
   }
};
