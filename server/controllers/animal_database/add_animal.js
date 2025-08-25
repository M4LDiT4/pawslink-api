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
      const body = req.body;
      
      body.coatColor = JSON.parse(body.coatColor);
      body.notes = JSON.parse(body.notes);
      if (body.traitsAndPersonality) {
      body.traitsAndPersonality = JSON.parse(body.traitsAndPersonality);
      }

      if (body.vaccinationRecords) {
      body.vaccinationRecords = JSON.parse(body.vaccinationRecords);
      }

      if (body.medicationRecords) {
      body.medicationRecords = JSON.parse(body.medicationRecords);
      }


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
         statusCode: 400,
         body: {
            error: err.message || err,
         },
      };
      return next();
   }
};
